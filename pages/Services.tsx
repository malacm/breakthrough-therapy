import React from 'react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import * as Icons from 'lucide-react';
import { Check } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 mb-4 sm:mb-6">The Services</h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto px-4">
            Traditional Chinese medicine modalities tailored to your individual needs.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {SERVICES.map((service, index) => {
             const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;
             const isEven = index % 2 === 0;

             return (
               <div key={service.id} className={`bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'}`}>
                 <div className="md:w-1/3 bg-sage-50 p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center">
                    <div className="bg-white p-3 sm:p-4 rounded-full shadow-sm mb-4 sm:mb-6">
                        <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-sage-600" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 mb-2">{service.title}</h3>
                    <p className="text-sage-700 font-semibold text-base sm:text-lg">{service.price}</p>
                 </div>
                 <div className="md:w-2/3 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-stone-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                        {service.description}
                    </p>
                    <div>
                        <Link to="/contact">
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">Book This Service</Button>
                        </Link>
                    </div>
                 </div>
               </div>
             );
          })}
        </div>
        
        {/* Pricing Note */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-stone-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2 sm:mb-3">The Pricing</h3>
            <div className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base px-4 space-y-2">
                <p>First Visit (100 minutes) — $150</p>
                <p>Chinese Medical Massage (90 minutes) — $350</p>
                <p>Follow-Up Acupuncture (60 minutes) — $160</p>
                <p>Acupuncture & Massage (60 minutes) — $220</p>
                <p>Chinese Medical Massage (60 minutes) — $250</p>
                <p>Telehealth (30 minutes) — $50</p>
                <p className="mt-4 text-xs italic">All services are currently priced for mobile services — pricing will be updated when office visits are available.</p>
            </div>
        </div>
      </div>
    </div>
  );
};
