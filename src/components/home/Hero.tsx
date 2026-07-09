import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Calendar, ShieldCheck } from 'lucide-react';
import { TABIT_RESERVATION_URL } from '../../utils/constants';
import { trackReservationClick } from '../../utils/gtag';

const BACKGROUND_IMAGES = [
  '/gallery/BarAharon-3131 Large.jpeg',
  '/gallery/BarAharon-3402 Large.jpeg',
  '/hero.jpeg',
  '/gallery/BarAharon-3565-2 Large.jpeg',
];

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);

  useEffect(() => {
    setIsLoaded(true);
    const backgroundInterval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 8000);
    return () => clearInterval(backgroundInterval);
  }, []);

  return (
    <header ref={heroRef} className="relative min-h-[100vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            key={currentBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={BACKGROUND_IMAGES[currentBackground]}
              alt="מסעדת הדרומית — בשרים על האש בבאר שבע"
              className="w-full h-full object-cover"
              fetchPriority={currentBackground === 0 ? 'high' : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,0,0,0.45)_100%)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-[100vh] flex flex-col items-center justify-center text-white px-4 sm:px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto text-center space-y-8"
        >
          <img
            src="/logo.svg"
            alt="הדרומית"
            className="h-28 sm:h-36 md:h-44 mx-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          />

          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              הדרומית
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-warmBg/90 font-medium max-w-2xl mx-auto leading-relaxed">
              מסעדת בשרים כשר חלק בבאר שבע — סטייקים, שיפודים וחדרי VIP
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a
              href={TABIT_RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackReservationClick('hero_tabit')}
              className="btn-brand w-full sm:w-auto"
            >
              <Calendar className="w-5 h-5" />
              הזמן שולחן אונליין
            </a>
            <Link to="/menu" className="btn-outline-light w-full sm:w-auto">
              לתפריט שלנו
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" />
              כשר חלק
            </span>
            <span className="text-white/40">·</span>
            <span>דירוג 4.8 בגוגל</span>
            <span className="text-white/40">·</span>
            <span>ישפרו סנטר, באר שבע</span>
          </div>
        </motion.div>

        <motion.button
          type="button"
          aria-label="גלול למטה"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full bg-white/5 border border-white/15 hover:border-brand/50 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.button>
      </div>
    </header>
  );
}
