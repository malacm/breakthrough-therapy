import React from 'react';
import { SERVICES, SERVICE_ICON_MAP, UNIFIED_PRACTICE_URL, PHONE_DISPLAY, PHONE_TEL } from '../constants';
import { ButtonLink } from '../components/Button';
import {
  CalendarIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useHeroReveal, useScrollReveal, useAlternatingReveal } from '../lib/useGsap';
import type { Service } from '../types';

const formatPrice = (n: number) => `$${n}`;

const OfficeRow: React.FC<{ price: number; duration: string }> = ({ price, duration }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-4 border-b border-earth-100 last:border-b-0">
    <div className="flex-1">
      <p className="text-xs uppercase tracking-wider text-earth-500 font-semibold mb-1">Office</p>
      <p className="text-earth-800 text-base sm:text-lg">
        <span className="font-semibold text-autumn-700">{formatPrice(price)}</span>
        <span className="text-earth-500"> — {duration}</span>
      </p>
    </div>
    <ButtonLink
      href={UNIFIED_PRACTICE_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant="primary"
      size="sm"
    >
      <CalendarIcon className="h-4 w-4 mr-2" />
      Book Now
    </ButtonLink>
  </div>
);

const MobileRow: React.FC<{ price: number; duration: string }> = ({ price, duration }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-4 border-b border-earth-100 last:border-b-0">
    <div className="flex-1">
      <p className="text-xs uppercase tracking-wider text-earth-500 font-semibold mb-1">Mobile</p>
      <p className="text-earth-800 text-base sm:text-lg">
        <span className="font-semibold text-autumn-700">{formatPrice(price)}</span>
        <span className="text-earth-500"> — {duration}</span>
      </p>
    </div>
    <a
      href={`tel:${PHONE_TEL}`}
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-autumn-600 text-autumn-700 hover:bg-autumn-50 transition-colors px-4 py-2 text-sm font-medium tracking-wide"
      aria-label={`Call or text ${PHONE_DISPLAY} to book a mobile visit`}
    >
      <PhoneIcon className="h-4 w-4" />
      Call/Text to Book
    </a>
  </div>
);

const TelehealthRow: React.FC<{ price: number; duration: string }> = ({ price, duration }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-4">
    <div className="flex-1">
      <p className="text-earth-800 text-base sm:text-lg">
        <span className="font-semibold text-autumn-700">{formatPrice(price)}</span>
        <span className="text-earth-500"> — {duration}</span>
      </p>
    </div>
    <ButtonLink
      href={UNIFIED_PRACTICE_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant="primary"
      size="sm"
    >
      <CalendarIcon className="h-4 w-4 mr-2" />
      Book Online
    </ButtonLink>
  </div>
);

const ServiceCard: React.FC<{ service: Service; isEven: boolean }> = ({ service, isEven }) => {
  const IconComponent = SERVICE_ICON_MAP[service.icon] || HeartIcon;
  const isTelehealth = service.telehealthPrice != null;

  return (
    <div className={`service-card bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-earth-100 overflow-hidden flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'}`}>
      <div className="md:w-1/3 bg-autumn-50 p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center">
        <div className="bg-white p-3 sm:p-4 rounded-full shadow-sm mb-4 sm:mb-6">
          <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-autumn-600" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-earth-800 mb-2">{service.title}</h3>
        <p className="text-earth-500 text-sm uppercase tracking-wide font-medium">{service.duration}</p>
      </div>
      <div className="md:w-2/3 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
        <p className="text-earth-600 text-base sm:text-lg mb-6 leading-relaxed">
          {service.description}
        </p>
        <div className="divide-y divide-earth-100">
          {isTelehealth && service.telehealthPrice != null && (
            <TelehealthRow price={service.telehealthPrice} duration={service.duration} />
          )}
          {service.officePrice != null && (
            <OfficeRow price={service.officePrice} duration={service.duration} />
          )}
          {service.mobilePrice != null && (
            <MobileRow price={service.mobilePrice} duration={service.duration} />
          )}
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const headerRef = useHeroReveal<HTMLDivElement>({ childSelector: '.svc-header-anim', y: 40, stagger: 0.18, ease: 'power3.out' });
  const calloutRef = useScrollReveal<HTMLDivElement>({ y: 50, duration: 0.8 });
  const cardsRef = useAlternatingReveal<HTMLDivElement>({ childSelector: '.service-card', xOffset: 60, y: 40, scale: 0.96, duration: 0.85, ease: 'power3.out' });
  const policyRef = useScrollReveal<HTMLDivElement>({ y: 50, duration: 0.8 });

  return (
    <div className="pt-24 min-h-screen bg-earth-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div ref={headerRef} className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="svc-header-anim font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-earth-800 mb-4 sm:mb-6">The Services</h1>
          <p className="svc-header-anim text-base sm:text-lg md:text-xl text-earth-600 font-light max-w-2xl mx-auto px-4">
            Traditional Chinese medicine modalities tailored to your individual needs.
          </p>
        </div>

        <div ref={calloutRef} className="mb-8 sm:mb-10 md:mb-12 bg-autumn-50 border border-autumn-200 p-5 sm:p-6 rounded-xl sm:rounded-2xl max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="bg-autumn-100 p-3 rounded-full shrink-0">
              <MapPinIcon className="h-6 w-6 text-autumn-700" />
            </div>
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-semibold text-earth-800">Office &amp; Mobile Visits in the Los Angeles Area</p>
              <p className="text-earth-600 text-sm sm:text-base">
                <span className="font-semibold text-earth-800">Office visits</span> can be booked online via the patient portal.
              </p>
              <p className="text-earth-600 text-sm sm:text-base">
                <span className="font-semibold text-earth-800">Mobile visits</span> are not bookable online — call or text{' '}
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-1 text-autumn-700 font-semibold hover:text-autumn-800 underline underline-offset-2">
                  <PhoneIcon className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
                {' '}to schedule.
              </p>
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="space-y-8 sm:space-y-10 md:space-y-12">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} isEven={index % 2 === 0} />
          ))}
        </div>

        <div ref={policyRef} className="mt-8 sm:mt-12 md:mt-16 max-w-3xl mx-auto">
          <details className="bg-earth-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 group">
            <summary className="font-serif text-base sm:text-lg font-semibold text-earth-800 cursor-pointer list-none flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span>Cancellation &amp; No-Show Policy</span>
              <ChevronDownIcon className="h-5 w-5 text-earth-600 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-earth-600 text-sm sm:text-base leading-relaxed">
              Appointments cancelled within 24 hours of the scheduled start time and missed appointments without notice may be subject to charge at the practitioner&apos;s discretion. Exceptions will be made in the event of emergencies, sudden illness, or natural disasters to ensure patient safety and consideration of individual circumstances.
            </p>
          </details>
        </div>

      </div>
    </div>
  );
};
