import { NavItem, Service, Testimonial } from './types';
import {
  HeartIcon,
  HandRaisedIcon,
  SparklesIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

import React from 'react';

// Activity/pulse icon (not available in Heroicons)
const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);

// Icon map for dynamic lookup by service icon string
export const SERVICE_ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Heart: HeartIcon,
  Activity: ActivityIcon,
  Hand: HandRaisedIcon,
  Sparkles: SparklesIcon,
  Phone: PhoneIcon,
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'First Visit',
    description: 'This is the recommended first step to beginning your journey with BreakThrough. We\'ll spend 40-60 minutes doing a full patient intake and medical history to establish your health goals, current needs and any sensitivities or medication interactions that could interfere with providing you optimal care. We\'ll spend the remaining 40-60 minutes on a treatment that is carefully crafted for your needs on that day.',
    icon: 'Heart',
    price: '100 minutes — $150',
    calendlyUrl: 'https://calendly.com/breakthroughtherapyacu/first-visit-100-minutes-150'
  },
  {
    id: '2',
    title: 'Follow-Up Acupuncture',
    description: 'For patients who have already had their First Visit appointment — 10-15 minutes will be spent checking in and reassessing your needs, the remaining 45-50 minutes will be spent receiving acupuncture.',
    icon: 'Activity',
    price: '60 minutes — $160',
    calendlyUrl: 'https://calendly.com/breakthroughtherapyacu/follow-up-acupuncture-60-minutes-160'
  },
  {
    id: '3',
    title: 'Chinese Medical Massage',
    description: '60 minutes of hands-on bodywork using hands, knuckles, forearms, elbows, and tools (gua sha, cups, IASTM, moxa).',
    icon: 'Hand',
    price: '60 minutes — $250',
    calendlyUrl: 'https://calendly.com/breakthroughtherapyacu/chinese-medical-massage-60-minutes-250'
  },
  {
    id: '4',
    title: 'Chinese Medical Massage',
    description: '90 minutes of hands-on bodywork using hands, knuckles, forearms, elbows, and tools (gua sha, cups, IASTM, moxa).',
    icon: 'Hand',
    price: '90 minutes — $350',
    calendlyUrl: 'https://calendly.com/breakthroughtherapyacu/chinese-medical-massage-90-minutes-350'
  },
  {
    id: '5',
    title: 'Acupuncture & Massage',
    description: 'For patients who have had their First Visit — 40 minutes of acupuncture followed or preceded by 20 minutes of bodywork using manual techniques and tools.',
    icon: 'Sparkles',
    price: '60 minutes — $220',
    calendlyUrl: 'https://calendly.com/breakthroughtherapyacu/acupuncture-massage-60-minutes-220'
  },
  {
    id: '6',
    title: 'Telehealth',
    description: 'A 30 minute phone or zoom call designed to provide you with nutrition and lifestyle advice catered either to an acute health challenge (like a cold, flu, infection, fungus, etc.) or a chronic health condition (like diabetes, arthritis, IBS, eczema and many others). The information gathered on this call will be used for future treatments and combined with a First Visit intake will serve as the basis for writing your custom herbal formula.',
    icon: 'Phone',
    price: '30 minutes — $50',
    calendlyUrl: 'https://calendly.com/breakthroughtherapyacu/telehealth-30-minutes-50'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Steven Lawrence',
    text: "Ian is a gifted healer with a positive attitude that's inspiring. Using acupuncture, herbs, and sometimes massage, he's helped me recover from GI problems and joint pain. I highly recommend him!",
    location: 'Google Review'
  },
  {
    id: 't2',
    name: 'Joshua Kwon',
    text: "Ian is not only talented in the healing arts he is also incredibly kind-hearted and an excellent communicator.",
    location: 'Google Review'
  },
  {
    id: 't3',
    name: 'Suzanne Kanj',
    text: "I was introduced to Ian through a friend after I told her about my back and shoulder pain which I developed from a previous injury. I had never received a massage from a male therapist before, but I trusted my friend's recommendation.",
    location: 'Google Review'
  },
  {
    id: 't4',
    name: 'Abbey Seiden',
    text: "I have had a hunched over posture since adolescence and have tried many different modalities throughout my life. None have been as effective and long lasting as the style Ian offers. He is extremely skilled at finding holding patterns.",
    location: 'Google Review'
  },
  {
    id: 't5',
    name: 'Mark Benjamin',
    text: "Amazing acupuncture. Ian is extremely knowledgeable and has a true healing touch.",
    location: 'Google Review'
  }
];
