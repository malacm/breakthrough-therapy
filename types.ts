export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  price?: string;
  calendlyUrl?: string; // Optional Calendly event type URL for this service
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  location: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// --- Booking & Integration Types ---

export interface Booking {
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

export interface GoogleDocResult {
  docId: string;
  docUrl: string;
  docTitle: string;
  docType: 'consent' | 'arbitration' | 'intake';
}

export interface BookingDocs {
  consent: GoogleDocResult;
  arbitration: GoogleDocResult;
  intake: GoogleDocResult;
}

export interface CalendlyWebhookPayload {
  event: string; // e.g. "invitee.created"
  payload: {
    event_type: {
      uuid: string;
      name: string;
      slug: string;
    };
    event: {
      uuid: string;
      start_time: string;
      end_time: string;
      name: string;
      location?: {
        type: string;
        location?: string;
      };
    };
    invitee: {
      uuid: string;
      email: string;
      name: string;
      timezone: string;
      created_at: string;
      uri: string;
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
    }>;
    tracking?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    };
  };
}
