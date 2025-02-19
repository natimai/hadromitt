declare global {
  interface Window {
    fbq: any;
  }
}

const fbq = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
};

export default fbq; 