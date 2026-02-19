import { google } from 'googleapis';
import type { GoogleDocResult, BookingDocs } from '../types';

// Template Google Doc IDs — these are the master documents in your Drive
// that get copied per-booking. Set these in your environment variables.
const TEMPLATE_IDS = {
  consent: process.env.GOOGLE_TEMPLATE_CONSENT_DOC_ID || '',
  arbitration: process.env.GOOGLE_TEMPLATE_ARBITRATION_DOC_ID || '',
  intake: process.env.GOOGLE_TEMPLATE_INTAKE_DOC_ID || '',
};

const OWNER_EMAIL = process.env.YOUR_GOOGLE_EMAIL || '';
const TEMPLATE_FOLDER_ID = process.env.GOOGLE_TEMPLATE_FOLDER_ID || '';

/**
 * Creates an authenticated Google Drive client using OAuth 2.0 credentials
 * with a refresh token. This avoids the need for a service account key.
 */
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

/**
 * Copies a template Google Doc and renames it for the specific booking.
 */
async function copyTemplateDoc(
  templateId: string,
  docType: string,
  clientName: string,
  eventDate: string,
): Promise<{ fileId: string; webViewLink: string }> {
  const drive = getDriveClient();

  const copyTitle = `${docType} — ${clientName} — ${eventDate}`;

  const copyRequest: any = {
    name: copyTitle,
  };

  // If a destination folder is configured, place the copy there
  if (TEMPLATE_FOLDER_ID) {
    copyRequest.parents = [TEMPLATE_FOLDER_ID];
  }

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

/**
 * Sets permissions on a document so that only the owner (you) and the client
 * can view and edit it. This maintains HIPAA compliance.
 *
 * Steps:
 * 1. Share with the client as "writer"
 * 2. Ensure sharing is restricted
 */
async function setDocPermissions(
  fileId: string,
  clientEmail: string,
): Promise<void> {
  const drive = getDriveClient();

  // Share with the client as writer
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'writer',
      type: 'user',
      emailAddress: clientEmail,
    },
    sendNotificationEmail: false,
  });

  // Share with the practice owner (if different from the OAuth user)
  if (OWNER_EMAIL) {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'writer',
        type: 'user',
        emailAddress: OWNER_EMAIL,
      },
      sendNotificationEmail: false,
    });
  }

  // Restrict the file so that editors cannot change permissions or share
  await drive.files.update({
    fileId,
    requestBody: {
      writersCanShare: false,
      copyRequiresWriterPermission: true,
    },
  });
}

/**
 * Creates all three booking documents for a client by copying the templates,
 * renaming them, and setting permissions.
 *
 * Returns the document details (IDs, URLs, titles) for use in the email.
 */
export async function createBookingDocs(
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
        `Missing template document ID for "${doc.label}". ` +
        `Set GOOGLE_TEMPLATE_${doc.key.toUpperCase()}_DOC_ID in environment variables.`,
      );
    }

    // Copy the template
    const { fileId, webViewLink } = await copyTemplateDoc(
      templateId,
      doc.label,
      clientName,
      eventDate,
    );

    // Set HIPAA-compliant permissions
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





