
import { ReviewPlatforms } from '../components/ReviewPlatforms';
import { SEO } from '../components/SEO';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Reviews } from '../components/home/Reviews';
import { CTA } from '../components/home/CTA';

export function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#1A0000] to-black">
      <SEO
        title="הדרומית - מסעדה בבאר שבע | מסעדת בשרים כשר חלק מומלצת | מסעדה מומלצת בבאר שבע"
        description="מסעדה בבאר שבע המובילה - הדרומית. מסעדת בשרים כשר חלק מומלצת המציעה חוויה קולינרית מיוחדת. תפריט עשיר של בשרים איכותיים, סטייקים מעולים, שיפודים על האש וסלטים טריים."
        keywords="מסעדה בבאר שבע, מסעדת בשרים בבאר שבע, מסעדה כשרה בבאר שבע, סטייקים בבאר שבע, שיפודים בבאר שבע, הדרומית"
        canonicalUrl="/"
      />

      <Hero />
      <Features />
      <Reviews />
      <ReviewPlatforms />
      <CTA />
    </div>
  );
}