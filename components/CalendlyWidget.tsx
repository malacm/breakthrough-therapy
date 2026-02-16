import React, { useEffect, useRef, useState } from 'react';

interface CalendlyWidgetProps {
  /** The Calendly scheduling URL, e.g. "https://calendly.com/your-username" */
  url?: string;
  /** Optional CSS class for the outer container */
  className?: string;
}

// The Calendly inline embed script URL
const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CSS_HREF = 'https://assets.calendly.com/assets/external/widget.css';


/**
 * Loads the Calendly external script and stylesheet once, then renders
 * the inline scheduling widget inside a container div.
 */
export const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  url,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const widgetInitializedRef = useRef(false);

  const calendlyUrl = url || import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/breakthroughtherapyacu';

  useEffect(() => {
    // Reset loading state when URL changes
    setIsLoaded(false);
    
    // Inject Calendly stylesheet if not already present
    if (!document.querySelector(`link[href="${CALENDLY_CSS_HREF}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CALENDLY_CSS_HREF;
      document.head.appendChild(link);
    }

    // Inject Calendly script if not already present
    const existingScript = document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`);
    
    const initWidget = () => {
      // Wait for Calendly global to be available
      const checkInterval = setInterval(() => {
        if ((window as any).Calendly && containerRef.current) {
          clearInterval(checkInterval);
          
          // Clear the container if widget was already initialized (for URL changes)
          if (widgetInitializedRef.current && containerRef.current) {
            containerRef.current.innerHTML = '';
          }
          
          (window as any).Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: containerRef.current,
          });
          setIsLoaded(true);
          widgetInitializedRef.current = true;
        }
      }, 100);

      // Clean up interval after 10 seconds to avoid infinite polling
      setTimeout(() => clearInterval(checkInterval), 10000);
    };

    if (existingScript) {
      // Script already loaded, initialize widget
      initWidget();
    } else {
      // Load script first
      const script = document.createElement('script');
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        initWidget();
      };
      document.head.appendChild(script);
    }
  }, [calendlyUrl]);

  if (!calendlyUrl) {
    return (
      <div className={`bg-earth-100 rounded-2xl p-8 text-center ${className}`}>
        <p className="text-earth-600 text-lg">
          Booking widget is not configured. Please set <code className="bg-earth-200 px-2 py-1 rounded text-sm">VITE_CALENDLY_URL</code> in your environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {/* Loading state */}
      {!isLoaded && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-pulse text-earth-500 text-lg font-light">Loading scheduling widget...</div>
            <div className="w-8 h-8 border-2 border-earth-300 border-t-autumn-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      {/* Calendly inline widget container */}
      <div
        ref={containerRef}
        style={{ minWidth: '320px', height: '700px' }}
        className="rounded-2xl overflow-hidden"
      />
    </div>
  );
};

