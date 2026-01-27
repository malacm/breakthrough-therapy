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
