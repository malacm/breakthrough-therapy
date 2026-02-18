import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CalendlyWidget } from './CalendlyWidget';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyUrl?: string;
  serviceTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  calendlyUrl,
  serviceTitle,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-earth-900/60 backdrop-blur-sm transition-opacity" />
      
      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] max-h-[900px] overflow-hidden flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-earth-100 flex-shrink-0">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-earth-800">
              Book an Appointment
            </h2>
            {serviceTitle && (
              <p className="text-sm sm:text-base text-earth-600 mt-1">
                {serviceTitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-earth-100 rounded-full transition-colors text-earth-600 hover:text-earth-800"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Calendly Widget */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
          <CalendlyWidget url={calendlyUrl} />
        </div>
      </div>
    </div>
  );
};
