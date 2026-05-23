import { NavItem, Service, Testimonial } from './types';
import {
  HeartIcon,
  HandRaisedIcon,
  SparklesIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

import React from 'react';

const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);

export const SERVICE_ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Heart: HeartIcon,
  Activity: ActivityIcon,
  Hand: HandRaisedIcon,
  Sparkles: SparklesIcon,
  Phone: PhoneIcon,
};

export const UNIFIED_PRACTICE_URL = 'https://patient.unifiedpractice.com/breakthrough';
export const PHONE_DISPLAY = '(310) 430-0478';
export const PHONE_TEL = '+13104300478';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'First Visit',
    description: 'This is the recommended first step to beginning your journey with BreakThrough. We\'ll spend 40-60 minutes doing a full patient intake and medical history to establish your health goals, current needs and any sensitivities or medication interactions that could interfere with providing you optimal care. We\'ll spend the remaining 40-60 minutes on a treatment that is carefully crafted for your needs on that day.',
    icon: 'Heart',
    duration: '100 minutes',
    officePrice: 150,
    mobilePrice: 250,
    bookableOnline: true,
  },
  {
    id: '2',
    title: 'Acupuncture',
    description: 'For patients who have already had their First Visit appointment — 10-15 minutes will be spent checking in and reassessing your needs, the remaining 45-50 minutes will be spent receiving acupuncture.',
    icon: 'Activity',
    duration: '60 minutes',
    officePrice: 110,
    mobilePrice: 250,
    bookableOnline: true,
  },
  {
    id: '3',
    title: 'Acupuncture & Massage',
    description: 'For patients who have had their First Visit — 40 minutes of acupuncture followed or preceded by 20 minutes of bodywork using manual techniques and tools.',
    icon: 'Sparkles',
    duration: '60 minutes',
    officePrice: 175,
    mobilePrice: 300,
    bookableOnline: true,
  },
  {
    id: '4',
    title: 'Chinese Medical Massage',
    description: '60 minutes of hands-on bodywork using hands, knuckles, forearms, elbows, and tools (gua sha, cups, IASTM, moxa).',
    icon: 'Hand',
    duration: '60 minutes',
    officePrice: 200,
    mobilePrice: 350,
    bookableOnline: true,
  },
  {
    id: '5',
    title: 'Chinese Medical Massage',
    description: '90 minutes of hands-on bodywork using hands, knuckles, forearms, elbows, and tools (gua sha, cups, IASTM, moxa).',
    icon: 'Hand',
    duration: '90 minutes',
    officePrice: 300,
    mobilePrice: 450,
    bookableOnline: true,
  },
  {
    id: '6',
    title: 'Telehealth',
    description: 'A 30 minute phone or zoom call designed to provide you with nutrition and lifestyle advice catered either to an acute health challenge (like a cold, flu, infection, fungus, etc.) or a chronic health condition (like diabetes, arthritis, IBS, eczema and many others). The information gathered on this call will be used for future treatments and combined with a First Visit intake will serve as the basis for writing your custom herbal formula.',
    icon: 'Phone',
    duration: '30 minutes',
    telehealthPrice: 50,
    bookableOnline: true,
  },
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
