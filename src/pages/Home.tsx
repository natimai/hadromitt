import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { SocialProof } from '../components/home/SocialProof';
import { CTA } from '../components/home/CTA';
import { VipPopup } from '../components/VipPopup';
import { VIP_POPUP_STORAGE_KEY } from '../utils/constants';

export function Home() {
  const [showVipPopup, setShowVipPopup] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(VIP_POPUP_STORAGE_KEY) === '1') return;
    } catch {
      // ignore storage errors
    }

    const timer = window.setTimeout(() => {
      setShowVipPopup(true);
    }, 12000);

    const onScroll = () => {
      const scrolled =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled > 0.35) {
        setShowVipPopup(true);
        window.clearTimeout(timer);
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleVipVisibility = (visible: boolean) => {
    setShowVipPopup(visible);
    if (!visible) {
      try {
        localStorage.setItem(VIP_POPUP_STORAGE_KEY, '1');
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-ink to-black">
      <SEO
        title="הדרומית - מסעדה בבאר שבע | מסעדת בשרים כשר חלק מומלצת | מסעדה מומלצת בבאר שבע"
        description="מסעדה בבאר שבע המובילה - הדרומית. מסעדת בשרים כשר חלק מומלצת המציעה חוויה קולינרית מיוחדת. תפריט עשיר של בשרים איכותיים, סטייקים מעולים, שיפודים על האש וסלטים טריים."
        keywords="מסעדה בבאר שבע, מסעדת בשרים בבאר שבע, מסעדה כשרה בבאר שבע, סטייקים בבאר שבע, שיפודים בבאר שבע, הדרומית"
        canonicalUrl="/"
      />

      <Hero />
      <Features />
      <SocialProof />
      <CTA />
      <VipPopup isVisible={showVipPopup} setIsVisible={handleVipVisibility} />
    </div>
  );
}
