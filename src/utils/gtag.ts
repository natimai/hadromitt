declare global {
  interface Window {
    gtag: (...args: any[]) => void;
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

// עוזר ספציפי להמרות גוגל אדס
export const trackConversion = (url?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-16882671212/conversion', // כדאי לוודא אם יש Label ספציפי מהלקוח, כרגע משתמש בברירת מחדל
      'event_callback': () => {
        if (url) {
          // window.location.href = url;
        }
      }
    });
  }
};

export default gtagEvent;

