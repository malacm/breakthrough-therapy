import React from 'react';
import { Button } from '../components/Button';
import { TESTIMONIALS, SERVICE_ICON_MAP } from '../constants';
import { ArrowRightIcon, StarIcon, HeartIcon, ShieldCheckIcon, HandRaisedIcon, FireIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { getHeroImageUrl, getApproachImageUrl } from '../lib/seasonImages';

// Leaf icon (not available in Heroicons)
const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-8-7.5-8-12a8 8 0 0116 0c0 4.5-4 8-8 12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14c2-1.5 4-3 4-4" />
  </svg>
);

// Needle/Acupuncture icon
const NeedleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);

// Cupping icon
const CuppingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 1 7 7v2a7 7 0 0 1-14 0v-2a7 7 0 0 1 7-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v4" />
  </svg>
);

const HOME_MODALITIES = [
  {
    id: 'acupuncture',
    title: 'Acupuncture',
    description: 'The practice of inserting and manipulating needles in the body to influence the volume and flow of qi and blood. For those who are more western-minded I offer another definition: the practice of inserting and manipulating needles in the body in order to stimulate tissues (skin, fascia, muscles, tendons, bones, ligaments, nerves, blood vessels, lymph etc.) at varying locations and depths.',
    icon: NeedleIcon,
  },
  {
    id: 'herbal-medicine',
    title: 'Herbal Medicine',
    description: 'The practice of measuring and combining herbs to treat both acute and chronic health problems either in tandem or succession. Herbs are your everyday take-home treatment off the table and are discussed as they\u2019re taken to ensure success and efficacy.',
    icon: LeafIcon,
  },
  {
    id: 'bodywork',
    title: 'Bodywork',
    description: 'The practice of manually manipulating the tissues of the body from the exterior by use of hands, knuckles, forearms, elbows, and tools.',
    icon: HandRaisedIcon,
  },
  {
    id: 'moxibustion',
    title: 'Moxibustion',
    description: 'The practice of burning Ai Ye, or mugwort as it\u2019s known to western herbalists, and passing or holding it over acupuncture channels and points in order to warm, move qi and alleviate pain.',
    icon: FireIcon,
  },
  {
    id: 'cupping',
    title: 'Cupping',
    description: 'The practice of using glass, ceramic or silicone cups to suction and lift skin and fascia to unblock and move stuck qi and blood.',
    icon: CuppingIcon,
  },
];

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={getHeroImageUrl()} 
            alt="Calm nature scene" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-earth-900/20 mix-blend-multiply"></div>
          {/* Orange gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-autumn-900/40 via-autumn-800/30 to-autumn-700/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-earth-50/20 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block py-1 px-3 border border-white/40 rounded-full text-white text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-sm">
            Chinese Medicine and Bodywork
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-md px-2">
            BreakThrough Therapy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-earth-100 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed px-2">
            A form of Chinese medicine that prioritizes depth, attention, and clinical impact. The goal is not temporary relief, but clear, noticeable change that holds over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/services" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">View Services</Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white/90 text-earth-800 hover:bg-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 sm:py-16 md:py-24 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 bg-autumn-200 rounded-full -z-10 opacity-50"></div>
              <img 
                src={getApproachImageUrl()} 
                alt="Therapist portrait" 
                className="rounded-2xl shadow-xl w-full h-[400px] sm:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-earth-100 max-w-[85%] sm:max-w-xs">
                <p className="font-serif italic text-earth-600 text-sm sm:text-base md:text-lg">"The goal is not temporary relief, but clear, noticeable change that holds over time"</p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800 mb-4 sm:mb-6">The Approach</h2>
              <div className="h-1 w-20 bg-autumn-500 mb-6 sm:mb-8"></div>
              <p className="text-earth-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                My practice is rooted in a form of Chinese medicine that prioritizes depth, attention, and clinical impact. I work with one person at a time, for the full duration of each treatment.
              </p>
              <p className="text-earth-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Treatments are active, meaning that my time is spent observing, adjusting, palpating, listening, and responding as the treatment unfolds. This may involve acupuncture or dry needling, moxibustion, cupping, bodywork, herbal medicine, or, at times, focused discussion and clinical guidance. The modalities used are determined by a patient's needs, not a preset routine.
              </p>
              <p className="text-earth-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Herbal prescriptions are written as custom formulas, tailored to the individual and revised as their condition changes.
              </p>
              <p className="text-earth-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                My practice is not structured around selling products or generating revenue through unnecessary testing. Instead, it is grounded in the traditional diagnostic frameworks of Chinese medicine—understanding how illness arises, how it evolves, and how to intervene precisely and appropriately. The goal is not temporary relief, but clear, noticeable change that holds over time.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                {[
                  { icon: HeartIcon, text: "One-on-one attention for the full treatment" },
                  { icon: LeafIcon, text: "Custom herbal formulas tailored to you" },
                  { icon: ShieldCheckIcon, text: "Traditional Chinese medicine diagnostic frameworks" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="bg-autumn-100 p-2 rounded-full">
                      <item.icon className="h-5 w-5 text-autumn-700" />
                    </div>
                    <span className="text-earth-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800 mb-3 sm:mb-4">The Services</h2>
            <p className="text-earth-500 max-w-xl mx-auto text-sm sm:text-base px-4">Traditional Chinese medicine modalities tailored to your individual needs.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
            {HOME_MODALITIES.map((modality, index) => {
              const IconComponent = modality.icon;
              // First 3 cards: span 2 of 6 cols (1/3 each). Last 2 cards: span 3 of 6 cols (1/2 each).
              const isBottomRow = index >= 3;
              
              return (
                <Link key={modality.id} to="/services" className={`group bg-earth-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-earth-100 hover:border-autumn-200 flex flex-col ${isBottomRow ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-7 w-7 text-autumn-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-earth-800 mb-3">{modality.title}</h3>
                  <p className="text-earth-600 text-sm leading-relaxed mb-6 flex-grow">{modality.description}</p>
                  <span className="inline-flex items-center text-autumn-700 text-sm font-semibold group-hover:gap-2 transition-all mt-auto">
                    Learn more <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-24 bg-autumn-50 border-y border-autumn-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth-800 mb-8 sm:mb-12">Stories of Healing</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white p-8 rounded-xl shadow-sm relative">
                        <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <StarSolidIcon key={i} className="h-4 w-4 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-earth-600 italic mb-6">"{t.text}"</p>
                        <h4 className="font-serif font-bold text-earth-800">{t.name}</h4>
                        <span className="text-xs text-earth-400 uppercase tracking-wide">{t.location}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-earth-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Begin Your Treatment?</h2>
            <p className="text-earth-300 text-base sm:text-lg mb-6 sm:mb-8"></p>
        </div>
      </section>
    </div>
  );
};
