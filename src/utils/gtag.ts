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

/**
 * Google Ads lead conversion for the outdoor-events landing page.
 * Fill in the "AW-ID/label" pair from Google Ads → Goals → Conversions; until then nothing is sent.
 */
export const GOOGLE_ADS_LEAD_SEND_TO = '';

export const trackAdsLead = () => {
  if (GOOGLE_ADS_LEAD_SEND_TO && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_LEAD_SEND_TO });
  }
};

export default gtagEvent;
