import * as Brevo from '@getbrevo/brevo';
import type { Booking, BookingDocs } from '../types';

// Initialize Brevo transactional email API
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL || '';
const FROM_NAME = process.env.BREVO_FROM_NAME || 'Breakthrough Holistic Therapy';

/**
 * Formats a date string into a human-readable format.
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a time string into a human-readable format.
 */
function formatTime(dateStr: string, timezone: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
    timeZoneName: 'short',
  });
}

/**
 * Builds the HTML email body for the booking confirmation.
 */
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
          
          <!-- Header -->
          <tr>
            <td style="background-color:#4a3728; padding:32px 40px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:normal; letter-spacing:1px;">
                Breakthrough Holistic Therapy
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#4a3728; margin:0 0 8px 0; font-size:22px;">
                Booking Confirmed
              </h2>
              <p style="color:#6b5c4d; font-size:16px; line-height:1.6; margin:0 0 24px 0;">
                Thank you for booking with us, ${booking.clientName}. Below are the details of your upcoming appointment.
              </p>

              <!-- Appointment Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb; border-radius:8px; padding:24px; margin-bottom:32px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="color:#4a3728; font-size:14px; margin:0 0 12px 0; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">
                      Appointment Details
                    </p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#6b5c4d; font-size:15px; padding:4px 16px 4px 0; font-weight:bold;">Service:</td>
                        <td style="color:#4a3728; font-size:15px; padding:4px 0;">${booking.eventType}</td>
                      </tr>
                      <tr>
                        <td style="color:#6b5c4d; font-size:15px; padding:4px 16px 4px 0; font-weight:bold;">Date:</td>
                        <td style="color:#4a3728; font-size:15px; padding:4px 0;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="color:#6b5c4d; font-size:15px; padding:4px 16px 4px 0; font-weight:bold;">Time:</td>
                        <td style="color:#4a3728; font-size:15px; padding:4px 0;">${formattedTime}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Documents Section -->
              <h3 style="color:#4a3728; margin:0 0 8px 0; font-size:18px;">
                Required Documents
              </h3>
              <p style="color:#6b5c4d; font-size:15px; line-height:1.6; margin:0 0 20px 0;">
                Please review and sign the following documents before your appointment. These documents are private and shared only between you and your practitioner.
              </p>

              <!-- Doc 1: Consent -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td style="background-color:#f5f0eb; border-radius:8px; padding:16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="color:#4a3728; font-size:15px; font-weight:bold; margin:0 0 4px 0;">
                            1. Informed Consent
                          </p>
                          <p style="color:#6b5c4d; font-size:13px; margin:0;">
                            Review and consent to treatment
                          </p>
                        </td>
                        <td width="140" align="right" valign="middle">
                          <a href="${docs.consent.docUrl}" style="display:inline-block; background-color:#4a3728; color:#ffffff; text-decoration:none; padding:10px 20px; border-radius:6px; font-size:14px;">
                            Open Document
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Doc 2: Arbitration -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td style="background-color:#f5f0eb; border-radius:8px; padding:16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="color:#4a3728; font-size:15px; font-weight:bold; margin:0 0 4px 0;">
                            2. Agreement to Arbitration
                          </p>
                          <p style="color:#6b5c4d; font-size:13px; margin:0;">
                            Review and agree to arbitration terms
                          </p>
                        </td>
                        <td width="140" align="right" valign="middle">
                          <a href="${docs.arbitration.docUrl}" style="display:inline-block; background-color:#4a3728; color:#ffffff; text-decoration:none; padding:10px 20px; border-radius:6px; font-size:14px;">
                            Open Document
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Doc 3: Intake -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#f5f0eb; border-radius:8px; padding:16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="color:#4a3728; font-size:15px; font-weight:bold; margin:0 0 4px 0;">
                            3. Medical History Intake
                          </p>
                          <p style="color:#6b5c4d; font-size:13px; margin:0;">
                            Provide your health history and details
                          </p>
                        </td>
                        <td width="140" align="right" valign="middle">
                          <a href="${docs.intake.docUrl}" style="display:inline-block; background-color:#4a3728; color:#ffffff; text-decoration:none; padding:10px 20px; border-radius:6px; font-size:14px;">
                            Open Document
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <hr style="border:none; border-top:1px solid #e8e0d8; margin:0 0 24px 0;" />

              <p style="color:#6b5c4d; font-size:14px; line-height:1.6; margin:0;">
                If you have any questions, feel free to reply to this email. We look forward to seeing you!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f0eb; padding:24px 40px; text-align:center;">
              <p style="color:#8b7d6e; font-size:13px; margin:0;">
                Breakthrough Holistic Therapy<br />
                Traditional Chinese Medicine
              </p>
              <p style="color:#a89b8c; font-size:12px; margin:8px 0 0 0;">
                This email contains confidential health information. If you received this in error, please delete it immediately.
              </p>
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

/**
 * Builds a plain-text version of the email for clients with text-only email.
 */
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

/**
 * Sends the booking confirmation email to the client with links to
 * their three personalized Google Docs via Brevo (free tier: 300 emails/day).
 */
export async function sendBookingConfirmationEmail(
  booking: Booking,
  docs: BookingDocs,
): Promise<void> {
  if (!BREVO_API_KEY) {
    throw new Error('BREVO_API_KEY is not configured');
  }

  if (!FROM_EMAIL) {
    throw new Error('BREVO_FROM_EMAIL is not configured');
  }

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



