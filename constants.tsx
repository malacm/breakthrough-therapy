import { NavItem, Service, Testimonial } from './types';
import { Leaf, Heart, Activity, Sparkles, Droplets, Flame } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Acupuncture',
    description: 'The practice of inserting and manipulating needles in the body to influence the volume and flow of qi and blood. For those who are more western-minded: the practice of inserting and manipulating needles in the body to stimulate tissues (skin, fascia, muscles, tendons, bones, ligaments, nerves, blood vessels, lymph etc.) at varying locations and depths.',
    icon: 'Activity',
    price: 'First Visit: $150 (100 min) | Follow-Up: $160 (60 min)'
  },
  {
    id: '2',
    title: 'Herbal Medicine',
    description: 'The practice of measuring and combining herbs to treat both acute and chronic health problems either in tandem or succession. Herbs are your everyday take-home treatment off the table and are discussed as they\'re taken to ensure success and efficacy.',
    icon: 'Leaf',
    price: 'Custom formulas tailored to individual needs'
  },
  {
    id: '3',
    title: 'Bodywork',
    description: 'The practice of manually manipulating the tissues of the body from the exterior by use of hands, knuckles, forearms, elbows, and tools.',
    icon: 'Heart',
    price: 'Chinese Medical Massage: $250 (60 min) | $350 (90 min)'
  },
  {
    id: '4',
    title: 'Moxibustion',
    description: 'The practice of burning Ai Ye, or mugwort as it\'s known to western herbalists, and passing or holding it over acupuncture channels and points in order to warm, move qi and alleviate pain.',
    icon: 'Flame',
    price: 'Included in treatment sessions'
  },
  {
    id: '5',
    title: 'Cupping',
    description: 'The practice of using glass, ceramic or silicone cups to suction and lift skin and fascia to unblock and move stuck qi and blood.',
    icon: 'Droplets',
    price: 'Included in treatment sessions'
  },
  {
    id: '6',
    title: 'Acupuncture & Massage',
    description: 'A combined treatment session integrating both acupuncture and bodywork techniques for comprehensive healing.',
    icon: 'Sparkles',
    price: '$220 (60 min)'
  },
  {
    id: '7',
    title: 'Telehealth',
    description: 'Remote consultation and guidance for ongoing care and herbal medicine discussions.',
    icon: 'Activity',
    price: '$50 (30 min)'
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
