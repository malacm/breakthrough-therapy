import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flower2, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-earth-100 pt-16 pb-8 border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="h-6 w-6 text-autumn-700" />
              <span className="font-serif text-xl font-bold text-earth-800">Breakthrough</span>
            </div>
            <p className="text-earth-600 text-sm leading-relaxed mb-6">
              Chinese Medicine and Bodywork. A practice rooted in depth, attention, and clinical impact.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-earth-400 hover:text-autumn-600 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-earth-400 hover:text-autumn-600 transition-colors"><Facebook className="h-5 w-5" /></a>
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
                <MapPin className="h-5 w-5 text-autumn-600 shrink-0" />
                <span>Office address coming soon</span>
              </li>
              <li className="flex items-center gap-3 text-earth-600 text-sm">
                <Phone className="h-5 w-5 text-autumn-600 shrink-0" />
                <span>(213) 973-7287</span>
              </li>
              <li className="flex items-center gap-3 text-earth-600 text-sm">
                <Mail className="h-5 w-5 text-autumn-600 shrink-0" />
                <span>breakthroughtherapyacu@gmail.com</span>
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
