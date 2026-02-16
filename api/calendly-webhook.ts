import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { google } from 'googleapis';
import * as Brevo from '@getbrevo/brevo';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  timezone: string;
  calendlyEventUri: string;
  calendlyInviteeUri: string;
  createdAt: string;
}

interface GoogleDocResult {
  docId: string;
  docUrl: string;
  docTitle: string;
  docType: 'consent' | 'arbitration' | 'intake';
}

interface BookingDocs {
  consent: GoogleDocResult;
  arbitration: GoogleDocResult;
  intake: GoogleDocResult;
}

// Calendly v2 webhook payload — the invitee data is flat in `payload`
// and `payload.event` is a URI string (not an object).
interface CalendlyWebhookPayload {
  event: string; // e.g. "invitee.created"
  created_at: string;
  created_by: string;
  payload: {
    cancel_url: string;
    created_at: string;
    email: string;
    event: string; // URI like "https://api.calendly.com/scheduled_events/UUID"
    name: string;
    new_invitee?: string | null;
    old_invitee?: string | null;
    questions_and_answers?: Array<{ question: string; answer: string }>;
    reschedule_url: string;
    rescheduled: boolean;
    status: string;
    timezone: string;
    tracking?: { utm_source?: string; utm_medium?: string; utm_campaign?: string };
    updated_at: string;
    uri: string; // invitee URI
  };
}

// ─── Config ──────────────────────────────────────────────────────────────────

const WEBHOOK_SIGNING_KEY = process.env.CALENDLY_WEBHOOK_SIGNING_KEY || '';

const TEMPLATE_IDS = {
  consent: process.env.GOOGLE_TEMPLATE_CONSENT_DOC_ID || '',
  arbitration: process.env.GOOGLE_TEMPLATE_ARBITRATION_DOC_ID || '',
  intake: process.env.GOOGLE_TEMPLATE_INTAKE_DOC_ID || '',
};

const OWNER_EMAIL = process.env.YOUR_GOOGLE_EMAIL || '';
const TEMPLATE_FOLDER_ID = process.env.GOOGLE_TEMPLATE_FOLDER_ID || '';

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL || '';
const FROM_NAME = process.env.BREVO_FROM_NAME || 'Breakthrough Holistic Therapy';

// ─── Google Drive helpers ────────────────────────────────────────────────────

function getDriveClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  });
  return google.drive({ version: 'v3', auth: oauth2Client });
}

async function copyTemplateDoc(
  templateId: string,
  docType: string,
  clientName: string,
  eventDate: string,
): Promise<{ fileId: string; webViewLink: string }> {
  const drive = getDriveClient();
  const copyRequest: any = { name: `${docType} — ${clientName} — ${eventDate}` };
  if (TEMPLATE_FOLDER_ID) copyRequest.parents = [TEMPLATE_FOLDER_ID];

  const response = await drive.files.copy({
    fileId: templateId,
    requestBody: copyRequest,
    fields: 'id, webViewLink',
  });

  return {
    fileId: response.data.id || '',
    webViewLink: response.data.webViewLink || '',
  };
}

async function setDocPermissions(fileId: string, clientEmail: string): Promise<void> {
  const drive = getDriveClient();

  await drive.permissions.create({
    fileId,
    requestBody: { role: 'writer', type: 'user', emailAddress: clientEmail },
    sendNotificationEmail: false,
  });

  if (OWNER_EMAIL) {
    await drive.permissions.create({
      fileId,
      requestBody: { role: 'writer', type: 'user', emailAddress: OWNER_EMAIL },
      sendNotificationEmail: false,
    });
  }

  await drive.files.update({
    fileId,
    requestBody: { writersCanShare: false, copyRequiresWriterPermission: true },
  });
}

async function createBookingDocs(
  clientName: string,
  clientEmail: string,
  eventDate: string,
): Promise<BookingDocs> {
  const docTypes: Array<{ key: keyof typeof TEMPLATE_IDS; label: string; type: GoogleDocResult['docType'] }> = [
    { key: 'consent', label: 'Informed Consent', type: 'consent' },
    { key: 'arbitration', label: 'Agreement to Arbitration', type: 'arbitration' },
    { key: 'intake', label: 'Medical History Intake', type: 'intake' },
  ];

  const results: Record<string, GoogleDocResult> = {};

  for (const doc of docTypes) {
    const templateId = TEMPLATE_IDS[doc.key];
    if (!templateId) {
      throw new Error(
        `Missing template document ID for "${doc.label}". Set GOOGLE_TEMPLATE_${doc.key.toUpperCase()}_DOC_ID in environment variables.`,
      );
    }

    const { fileId, webViewLink } = await copyTemplateDoc(templateId, doc.label, clientName, eventDate);
    await setDocPermissions(fileId, clientEmail);

    results[doc.type] = {
      docId: fileId,
      docUrl: webViewLink,
      docTitle: `${doc.label} — ${clientName} — ${eventDate}`,
      docType: doc.type,
    };
  }

  return results as unknown as BookingDocs;
}

// ─── Brevo email helpers ─────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function formatTime(dateStr: string, timezone: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: timezone, timeZoneName: 'short',
  });
}

function buildEmailHtml(booking: Booking, docs: BookingDocs): string {
  const formattedDate = formatDate(booking.eventDate);
  const formattedTime = formatTime(booking.eventDate, booking.timezone);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#faf9f6; font-family:'Georgia','Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f6; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:#4a3728; padding:32px 40px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:normal; letter-spacing:1px;">
                Breakthrough Holistic Therapy
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#4a3728; margin:0 0 8px 0; font-size:22px;">Booking Confirmed</h2>
              <p style="color:#6b5c4d; font-size:16px; line-height:1.6; margin:0 0 24px 0;">
                Thank you for booking with us, ${booking.clientName}. Below are the details of your upcoming appointment.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb; border-radius:8px; padding:24px; margin-bottom:32px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="color:#4a3728; font-size:14px; margin:0 0 12px 0; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">Appointment Details</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr><td style="color:#6b5c4d; font-size:15px; padding:4px 16px 4px 0; font-weight:bold;">Service:</td><td style="color:#4a3728; font-size:15px; padding:4px 0;">${booking.eventType}</td></tr>
                      <tr><td style="color:#6b5c4d; font-size:15px; padding:4px 16px 4px 0; font-weight:bold;">Date:</td><td style="color:#4a3728; font-size:15px; padding:4px 0;">${formattedDate}</td></tr>
                      <tr><td style="color:#6b5c4d; font-size:15px; padding:4px 16px 4px 0; font-weight:bold;">Time:</td><td style="color:#4a3728; font-size:15px; padding:4px 0;">${formattedTime}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
              <h3 style="color:#4a3728; margin:0 0 8px 0; font-size:18px;">Required Documents</h3>
              <p style="color:#6b5c4d; font-size:15px; line-height:1.6; margin:0 0 20px 0;">
                Please review and sign the following documents before your appointment. These documents are private and shared only between you and your practitioner.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr><td style="background-color:#f5f0eb; border-radius:8px; padding:16px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0"><tr>
                    <td><p style="color:#4a3728; font-size:15px; font-weight:bold; margin:0 0 4px 0;">1. Informed Consent</p><p style="color:#6b5c4d; font-size:13px; margin:0;">Review and consent to treatment</p></td>
                    <td width="140" align="right" valign="middle"><a href="${docs.consent.docUrl}" style="display:inline-block; background-color:#4a3728; color:#ffffff; text-decoration:none; padding:10px 20px; border-radius:6px; font-size:14px;">Open Document</a></td>
                  </tr></table>
                </td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr><td style="background-color:#f5f0eb; border-radius:8px; padding:16px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0"><tr>
                    <td><p style="color:#4a3728; font-size:15px; font-weight:bold; margin:0 0 4px 0;">2. Agreement to Arbitration</p><p style="color:#6b5c4d; font-size:13px; margin:0;">Review and agree to arbitration terms</p></td>
                    <td width="140" align="right" valign="middle"><a href="${docs.arbitration.docUrl}" style="display:inline-block; background-color:#4a3728; color:#ffffff; text-decoration:none; padding:10px 20px; border-radius:6px; font-size:14px;">Open Document</a></td>
                  </tr></table>
                </td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr><td style="background-color:#f5f0eb; border-radius:8px; padding:16px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0"><tr>
                    <td><p style="color:#4a3728; font-size:15px; font-weight:bold; margin:0 0 4px 0;">3. Medical History Intake</p><p style="color:#6b5c4d; font-size:13px; margin:0;">Provide your health history and details</p></td>
                    <td width="140" align="right" valign="middle"><a href="${docs.intake.docUrl}" style="display:inline-block; background-color:#4a3728; color:#ffffff; text-decoration:none; padding:10px 20px; border-radius:6px; font-size:14px;">Open Document</a></td>
                  </tr></table>
                </td></tr>
              </table>
              <hr style="border:none; border-top:1px solid #e8e0d8; margin:0 0 24px 0;" />
              <p style="color:#6b5c4d; font-size:14px; line-height:1.6; margin:0;">
                If you have any questions, feel free to reply to this email. We look forward to seeing you!
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f5f0eb; padding:24px 40px; text-align:center;">
              <p style="color:#8b7d6e; font-size:13px; margin:0;">Breakthrough Holistic Therapy<br />Traditional Chinese Medicine</p>
              <p style="color:#a89b8c; font-size:12px; margin:8px 0 0 0;">This email contains confidential health information. If you received this in error, please delete it immediately.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function buildEmailText(booking: Booking, docs: BookingDocs): string {
  const formattedDate = formatDate(booking.eventDate);
  const formattedTime = formatTime(booking.eventDate, booking.timezone);

  return `
BREAKTHROUGH HOLISTIC THERAPY
Booking Confirmed

Thank you for booking with us, ${booking.clientName}.

APPOINTMENT DETAILS
-------------------
Service: ${booking.eventType}
Date: ${formattedDate}
Time: ${formattedTime}

REQUIRED DOCUMENTS
------------------
Please review and sign the following documents before your appointment.
These documents are private and shared only between you and your practitioner.

1. Informed Consent
   ${docs.consent.docUrl}

2. Agreement to Arbitration
   ${docs.arbitration.docUrl}

3. Medical History Intake
   ${docs.intake.docUrl}

If you have any questions, feel free to reply to this email.
We look forward to seeing you!

---
Breakthrough Holistic Therapy
Traditional Chinese Medicine

This email contains confidential health information.
If you received this in error, please delete it immediately.
  `.trim();
}

async function sendBookingConfirmationEmail(booking: Booking, docs: BookingDocs): Promise<void> {
  if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY is not configured');
  if (!FROM_EMAIL) throw new Error('BREVO_FROM_EMAIL is not configured');

  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.subject = `Booking Confirmed — ${booking.eventType} on ${formatDate(booking.eventDate)}`;
  sendSmtpEmail.htmlContent = buildEmailHtml(booking, docs);
  sendSmtpEmail.textContent = buildEmailText(booking, docs);
  sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
  sendSmtpEmail.to = [{ email: booking.clientEmail, name: booking.clientName }];
  sendSmtpEmail.replyTo = { email: FROM_EMAIL, name: FROM_NAME };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
}

// ─── Webhook signature verification ─────────────────────────────────────────

function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SIGNING_KEY) {
    console.warn('CALENDLY_WEBHOOK_SIGNING_KEY not set — skipping signature verification');
    return true;
  }
  const hmac = crypto.createHmac('sha256', WEBHOOK_SIGNING_KEY);
  hmac.update(payload, 'utf8');
  const expectedSignature = hmac.digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

const CALENDLY_TOKEN = process.env.PERSONAL_ACCESS_TOKEN || '';

/**
 * Fetches the scheduled event details from the Calendly API so we can get
 * the event name (service type) and start/end times.
 */
async function fetchCalendlyEvent(eventUri: string): Promise<{
  name: string;
  start_time: string;
  end_time: string;
  event_type_name: string;
}> {
  // eventUri looks like "https://api.calendly.com/scheduled_events/UUID"
  const res = await fetch(eventUri, {
    headers: { Authorization: `Bearer ${CALENDLY_TOKEN}` },
  });
  if (!res.ok) {
    console.error('Failed to fetch Calendly event:', res.status, await res.text());
    return { name: 'Appointment', start_time: new Date().toISOString(), end_time: new Date().toISOString(), event_type_name: 'Appointment' };
  }
  const data = await res.json();
  const resource = data.resource;

  // Fetch the event type name
  let eventTypeName = resource.name || 'Appointment';
  if (resource.event_type) {
    try {
      const etRes = await fetch(resource.event_type, {
        headers: { Authorization: `Bearer ${CALENDLY_TOKEN}` },
      });
      if (etRes.ok) {
        const etData = await etRes.json();
        eventTypeName = etData.resource?.name || eventTypeName;
      }
    } catch (e) {
      console.warn('Could not fetch event type name, using fallback');
    }
  }

  return {
    name: resource.name || 'Appointment',
    start_time: resource.start_time || new Date().toISOString(),
    end_time: resource.end_time || new Date().toISOString(),
    event_type_name: eventTypeName,
  };
}

async function extractBookingData(webhookPayload: CalendlyWebhookPayload): Promise<Booking> {
  const { payload } = webhookPayload;

  // payload.event is a URI string — fetch the event details
  const eventDetails = await fetchCalendlyEvent(payload.event);

  return {
    id: payload.uri.split('/').pop() || 'unknown',
    clientName: payload.name,
    clientEmail: payload.email,
    eventType: eventDetails.event_type_name,
    eventDate: eventDetails.start_time,
    eventTime: eventDetails.start_time,
    timezone: payload.timezone,
    calendlyEventUri: payload.event,
    calendlyInviteeUri: payload.uri,
    createdAt: payload.created_at,
  };
}

// ─── Main handler ────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = JSON.stringify(req.body);
    const signature = (req.headers['calendly-webhook-signature'] as string) || '';
    if (WEBHOOK_SIGNING_KEY && !verifyWebhookSignature(rawBody, signature)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const webhookPayload = req.body;
    console.log('Received webhook event:', webhookPayload.event);
    console.log('Payload keys:', Object.keys(webhookPayload.payload || {}));
    console.log('Invitee name:', webhookPayload.payload?.name);
    console.log('Invitee email:', webhookPayload.payload?.email);
    console.log('Event URI:', webhookPayload.payload?.event);

    if (webhookPayload.event !== 'invitee.created') {
      console.log(`Ignoring event type: ${webhookPayload.event}`);
      return res.status(200).json({ message: 'Event ignored', event: webhookPayload.event });
    }

    const booking = await extractBookingData(webhookPayload as CalendlyWebhookPayload);
    console.log(`Processing booking for ${booking.clientName} (${booking.clientEmail})`);

    const eventDateFormatted = new Date(booking.eventDate).toLocaleDateString('en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit',
    });

    console.log('Creating Google Docs...');
    const docs = await createBookingDocs(booking.clientName, booking.clientEmail, eventDateFormatted);
    console.log('Google Docs created successfully:', {
      consent: docs.consent.docId,
      arbitration: docs.arbitration.docId,
      intake: docs.intake.docId,
    });

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
