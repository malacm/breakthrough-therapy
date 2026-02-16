import { NavItem, Service, Testimonial } from './types';
import { Leaf, Heart, Activity, Sparkles, Droplets, Flame, Hand } from 'lucide-react';

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
    icon: 'Activity',
    price: '30 minutes — $50',
    calendlyUrl: 'https://calendly.com/breakthroughtherapyacu/telehealth-30-minutes-50'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Patient Review',
    text: "Ian's approach to Chinese medicine is truly unique. The depth of attention and personalized care I receive in each session has made a significant difference in my health.",
    location: 'Los Angeles, CA'
  },
  {
    id: 't2',
    name: 'Patient Review',
    text: "The custom herbal formulas have been transformative. Unlike other practitioners, Ian takes the time to understand my condition and adjusts the treatment as I heal.",
    location: 'Los Angeles, CA'
  },
  {
    id: 't3',
    name: 'Patient Review',
    text: "The active, hands-on approach means every minute of my treatment is purposeful. I feel heard, understood, and most importantly, I'm seeing real results that last.",
    location: 'Los Angeles, CA'
  }
];
