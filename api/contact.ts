import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Brevo from '@getbrevo/brevo';

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL || '';
const FROM_NAME = process.env.BREVO_FROM_NAME || 'BreakThrough Therapy';
const TO_EMAIL = process.env.YOUR_GOOGLE_EMAIL || FROM_EMAIL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!BREVO_API_KEY || !FROM_EMAIL) {
    console.error('Missing Brevo configuration');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = `New Contact Form Message from ${name}`;
    sendSmtpEmail.htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0; padding:0; background-color:#faf9f6; font-family:'Georgia','Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f6; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:#4a3728; padding:24px 40px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:normal; letter-spacing:1px;">
                New Contact Form Message
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="color:#6b5c4d; font-size:14px; margin:0 0 4px 0; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">From</p>
              <p style="color:#4a3728; font-size:16px; margin:0 0 24px 0;">${name} &lt;${email}&gt;</p>
              <p style="color:#6b5c4d; font-size:14px; margin:0 0 4px 0; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">Message</p>
              <p style="color:#4a3728; font-size:16px; line-height:1.6; margin:0; white-space:pre-wrap;">${message}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
    sendSmtpEmail.textContent = `New Contact Form Message\n\nFrom: ${name} <${email}>\n\nMessage:\n${message}`;
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
    sendSmtpEmail.to = [{ email: TO_EMAIL, name: FROM_NAME }];
    sendSmtpEmail.replyTo = { email, name };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
