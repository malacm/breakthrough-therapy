import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import type { Booking, CalendlyWebhookPayload } from '../types';
import { createBookingDocs } from '../lib/google-drive';
import { sendBookingConfirmationEmail } from '../lib/brevo';

const WEBHOOK_SIGNING_KEY = process.env.CALENDLY_WEBHOOK_SIGNING_KEY || '';

/**
 * Verifies the Calendly webhook signature to ensure the request is authentic.
 * Calendly signs webhooks using HMAC SHA-256.
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
): boolean {
  if (!WEBHOOK_SIGNING_KEY) {
    // If no signing key is configured, skip verification (development only)
    console.warn('CALENDLY_WEBHOOK_SIGNING_KEY not set — skipping signature verification');
    return true;
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SIGNING_KEY);
  hmac.update(payload, 'utf8');
  const expectedSignature = hmac.digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
}

/**
 * Extracts a Booking object from the Calendly webhook payload.
 */
function extractBookingData(webhookPayload: CalendlyWebhookPayload): Booking {
  const { event, invitee, event_type } = webhookPayload.payload;

  return {
    id: event.uuid,
    clientName: invitee.name,
    clientEmail: invitee.email,
    eventType: event_type.name,
    eventDate: event.start_time,
    eventTime: event.start_time,
    timezone: invitee.timezone,
    calendlyEventUri: event.uuid,
    calendlyInviteeUri: invitee.uri,
    createdAt: invitee.created_at,
  };
}

/**
 * Vercel Serverless Function — Calendly Webhook Handler
 *
 * This endpoint is called by Calendly when a new booking is created.
 * It performs the following:
 *   1. Validates the webhook signature
 *   2. Extracts booking details
 *   3. Creates three Google Docs (Consent, Arbitration, Intake) via Drive API
 *   4. Sets HIPAA-compliant permissions on each document
 *   5. Sends confirmation email to the client via Brevo
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the raw body for signature verification
    const rawBody = JSON.stringify(req.body);

    // Verify webhook signature
    const signature = (req.headers['calendly-webhook-signature'] as string) || '';
    if (WEBHOOK_SIGNING_KEY && !verifyWebhookSignature(rawBody, signature)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const webhookPayload: CalendlyWebhookPayload = req.body;

    // Only process invitee.created events (new bookings)
    if (webhookPayload.event !== 'invitee.created') {
      console.log(`Ignoring event type: ${webhookPayload.event}`);
      return res.status(200).json({ message: 'Event ignored', event: webhookPayload.event });
    }

    // Extract booking data
    const booking = extractBookingData(webhookPayload);
    console.log(`Processing booking for ${booking.clientName} (${booking.clientEmail})`);

    // Format the date for document titles
    const eventDateFormatted = new Date(booking.eventDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // Create three Google Docs with HIPAA-compliant permissions
    console.log('Creating Google Docs...');
    const docs = await createBookingDocs(
      booking.clientName,
      booking.clientEmail,
      eventDateFormatted,
    );
    console.log('Google Docs created successfully:', {
      consent: docs.consent.docId,
      arbitration: docs.arbitration.docId,
      intake: docs.intake.docId,
    });

    // Send confirmation email with document links
    console.log('Sending confirmation email...');
    await sendBookingConfirmationEmail(booking, docs);
    console.log('Confirmation email sent successfully');

    return res.status(200).json({
      message: 'Booking processed successfully',
      bookingId: booking.id,
      documents: {
        consent: docs.consent.docUrl,
        arbitration: docs.arbitration.docUrl,
        intake: docs.intake.docUrl,
      },
    });
  } catch (error: any) {
    console.error('Error processing Calendly webhook:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred while processing the booking',
    });
  }
}
