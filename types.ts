export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  officePrice?: number;
  mobilePrice?: number;
  telehealthPrice?: number;
  bookableOnline: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  location: string;
}
