import React from 'react';
import { Button } from '../components/Button';
import { SERVICES, TESTIMONIALS } from '../constants';
import { ArrowRight, Star, HeartHandshake, Leaf, ShieldCheck } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
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
            A form of Chinese medicine that prioritizes depth, attention, and clinical impact. One person at a time, for the full duration of each treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">Start Your Journey</Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white/90 text-earth-800 hover:bg-white">
                View Services
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
                src="https://picsum.photos/600/800?random=2" 
                alt="Therapist portrait" 
                className="rounded-2xl shadow-xl w-full h-[400px] sm:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-earth-100 max-w-[85%] sm:max-w-xs">
                <p className="font-serif italic text-earth-600 text-sm sm:text-base md:text-lg">"Healing happens when we feel safe enough to feel."</p>
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
                  { icon: HeartHandshake, text: "One-on-one attention for the full treatment" },
                  { icon: Leaf, text: "Custom herbal formulas tailored to you" },
                  { icon: ShieldCheck, text: "Traditional Chinese medicine diagnostic frameworks" }
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service) => {
              // Dynamically get icon component
              const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;
              
              return (
                <div key={service.id} className="group bg-earth-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-earth-100 hover:border-autumn-200">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-7 w-7 text-autumn-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-earth-800 mb-3">{service.title}</h3>
                  <p className="text-earth-600 text-sm leading-relaxed mb-6">{service.description}</p>
                  <Link to="/services" className="inline-flex items-center text-autumn-700 text-sm font-semibold group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
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
                                <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
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
            <p className="text-earth-300 text-base sm:text-lg mb-6 sm:mb-8">Book your appointment and experience the depth of traditional Chinese medicine.</p>
            <Link to="/contact" className="inline-block w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-white text-autumn-600 hover:bg-autumn-600 hover:text-white border-none shadow-none transition-colors">
                    Book Your Appointment
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
};
