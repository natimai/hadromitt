import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PartyPopper, Star, X } from 'lucide-react';

interface TopBannerProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export function TopBanner({ isVisible, setIsVisible }: TopBannerProps) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A0000] via-[#FF0000] to-[#1A0000] text-white"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: 'linear'
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative">
            <div className="flex items-center justify-center gap-2 text-center">
              <PartyPopper className="w-5 h-5 animate-bounce" />
              <Star className="w-4 h-4 animate-pulse" />
              <span className="font-semibold">חדש!</span>
              <span>אירועים פרטיים בחדרי VIP מפוארים - </span>
              <Link 
                to="/events" 
                className="underline font-bold hover:text-white/90 transition-colors"
              >
                לפרטים נוספים
              </Link>
              <Star className="w-4 h-4 animate-pulse" />
              <PartyPopper className="w-5 h-5 animate-bounce" />
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="סגור באנר"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 