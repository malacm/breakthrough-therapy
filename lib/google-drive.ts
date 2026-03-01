import { google } from 'googleapis';
import type { GoogleDocResult, BookingDocs } from '../types';

const TEMPLATE_IDS = {
  consent: process.env.GOOGLE_TEMPLATE_CONSENT_DOC_ID || '',
  arbitration: process.env.GOOGLE_TEMPLATE_ARBITRATION_DOC_ID || '',
  intake: process.env.GOOGLE_TEMPLATE_INTAKE_DOC_ID || '',
};

const OWNER_EMAIL = process.env.YOUR_GOOGLE_EMAIL || '';
const TEMPLATE_FOLDER_ID = process.env.GOOGLE_TEMPLATE_FOLDER_ID || '';

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

async function createClientFolder(clientName: string): Promise<string> {
  const drive = getDriveClient();
  const response = await drive.files.create({
    requestBody: {
      name: `${clientName} — Not Signed`,
      mimeType: 'application/vnd.google-apps.folder',
      parents: TEMPLATE_FOLDER_ID ? [TEMPLATE_FOLDER_ID] : undefined,
    },
    fields: 'id',
  });
  return response.data.id || '';
}

async function copyTemplateDoc(
  templateId: string,
  docType: string,
  clientName: string,
  eventDate: string,
  targetFolderId: string,
): Promise<{ fileId: string; webViewLink: string }> {
  const drive = getDriveClient();

  const copyRequest: any = {
    name: `${docType} — ${clientName} — ${eventDate}`,
  };

  if (targetFolderId) {
    copyRequest.parents = [targetFolderId];
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

async function setOwnerPermissions(fileId: string): Promise<void> {
  const drive = getDriveClient();

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

async function setClientAndOwnerPermissions(fileId: string, clientEmail: string): Promise<void> {
  const drive = getDriveClient();

  await drive.permissions.create({
    fileId,
    requestBody: { role: 'writer', type: 'user', emailAddress: clientEmail },
    sendNotificationEmail: false,
  });

  await setOwnerPermissions(fileId);
}

/**
 * Creates a per-client folder and all three booking documents inside it.
 * Only the Medical History Intake is shared with the client; the Consent
 * and Arbitration docs are owner-only until manual eSignature setup.
 */
export async function createBookingDocs(
  clientName: string,
  clientEmail: string,
  eventDate: string,
): Promise<BookingDocs> {
  const folderId = await createClientFolder(clientName);

  const docTypes: Array<{
    key: keyof typeof TEMPLATE_IDS;
    label: string;
    type: GoogleDocResult['docType'];
    clientAccess: boolean;
  }> = [
    { key: 'consent', label: 'Informed Consent', type: 'consent', clientAccess: false },
    { key: 'arbitration', label: 'Agreement to Arbitration', type: 'arbitration', clientAccess: false },
    { key: 'intake', label: 'Medical History Intake', type: 'intake', clientAccess: true },
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

    const { fileId, webViewLink } = await copyTemplateDoc(
      templateId,
      doc.label,
      clientName,
      eventDate,
      folderId,
    );

    if (doc.clientAccess) {
      await setClientAndOwnerPermissions(fileId, clientEmail);
    } else {
      await setOwnerPermissions(fileId);
    }

    results[doc.type] = {
      docId: fileId,
      docUrl: webViewLink,
      docTitle: `${doc.label} — ${clientName} — ${eventDate}`,
      docType: doc.type,
    };
  }

  return results as unknown as BookingDocs;
}

