import React from 'react';
import { NavLink } from 'react-router-dom';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

// Flower icon (matching Navbar)
const FlowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c1.5-2.5 4-4 4-6.5a4 4 0 00-8 0c0 2.5 2.5 4 4 6.5zm0 0c-2.5 1.5-4 4-6.5 4a4 4 0 000-8c2.5 0 4 2.5 6.5 4zm0 0c2.5 1.5 4 4 6.5 4a4 4 0 000-8c-2.5 0-4 2.5-6.5 4zm0 0c-1.5 2.5-4 4-4 6.5a4 4 0 008 0c0-2.5-2.5-4-4-6.5z" />
  </svg>
);

// Social media brand icons (not available in Heroicons)
const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-earth-100 pt-16 pb-8 border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FlowerIcon className="h-6 w-6 text-autumn-700" />
              <span className="font-serif text-xl font-bold text-earth-800">Breakthrough</span>
            </div>
            <p className="text-earth-600 text-sm leading-relaxed mb-6">
              Chinese Medicine and Bodywork. A practice rooted in depth, attention, and clinical impact.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-earth-400 hover:text-autumn-600 transition-colors"><InstagramIcon className="h-5 w-5" /></a>
              <a href="#" className="text-earth-400 hover:text-autumn-600 transition-colors"><FacebookIcon className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-earth-800 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><NavLink to="/" className="text-earth-600 hover:text-autumn-700 text-sm">Home</NavLink></li>
              <li><NavLink to="/about" className="text-earth-600 hover:text-autumn-700 text-sm">About Me</NavLink></li>
              <li><NavLink to="/services" className="text-earth-600 hover:text-autumn-700 text-sm">Services</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-earth-800 mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-earth-600 text-sm">
                <MapPinIcon className="h-5 w-5 text-autumn-600 shrink-0" />
                <span>Office address coming soon</span>
              </li>
              <li className="flex items-center gap-3 text-earth-600 text-sm">
                <PhoneIcon className="h-5 w-5 text-autumn-600 shrink-0" />
                <span>(213) 973-7287</span>
              </li>
              <li className="flex items-center gap-3 text-earth-600 text-sm">
                <EnvelopeIcon className="h-5 w-5 text-autumn-600 shrink-0" />
                <span>contact@breakthroughtherapy.clinic</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-earth-200 text-center text-earth-400 text-xs">
          <p>&copy; {new Date().getFullYear()} BreakThrough Therapy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
