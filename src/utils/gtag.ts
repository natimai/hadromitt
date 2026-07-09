declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const gtagEvent = (action: string, category: string, label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

/** Google Ads conversion helper — call on Tabit reservation clicks */
export const trackConversion = (url?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-16882671212/conversion',
      event_callback: () => {
        if (url) {
          // Navigation handled by the link itself
        }
      },
    });
  }
};

/** Combined reservation tracking for Tabit CTAs */
export const trackReservationClick = (label = 'tabit_reservation') => {
  gtagEvent('reservation_click', 'conversion', label);
  trackConversion();
};

export default gtagEvent;
