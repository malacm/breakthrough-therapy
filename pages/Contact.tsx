import React, { useState } from 'react';
import { Button } from '../components/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you! We will reach out shortly.");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 mb-4 sm:mb-6">Get in Touch</h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto px-4">
            Booking software under construction — in the meantime use the form below to book and establish contact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Form */}
            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-lg border border-stone-100">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 mb-4 sm:mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                                placeholder="jane@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                                placeholder="(555) 123-4567"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">How can we help?</label>
                        <textarea 
                            name="message" 
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                            placeholder="Briefly describe what you're looking for..."
                        ></textarea>
                    </div>
                    <Button type="submit" size="lg" className="w-full">Send Message</Button>
                </form>
            </div>

            {/* Info */}
            <div className="space-y-6 sm:space-y-8">
                {/* Location Card */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-4 sm:mb-6 flex items-center gap-2">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-sage-600" /> Office Location
                    </h3>
                    <p className="text-stone-600 mb-3 sm:mb-4 text-sm sm:text-base">
                        Office address coming soon
                    </p>
                </div>

                {/* Contact Details */}
                <div className="grid sm:grid-cols-1 gap-4 sm:gap-6 md:gap-8">
                     <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-stone-800 mb-3 sm:mb-4 flex items-center gap-2">
                            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-sage-600" /> Contact
                        </h3>
                        <p className="text-stone-600 text-xs sm:text-sm mb-1 sm:mb-2">Tel: (213) 973-7287</p>
                        <p className="text-stone-600 text-xs sm:text-sm">Email: breakthroughtherapyacu@gmail.com</p>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
