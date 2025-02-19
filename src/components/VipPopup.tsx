import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PartyPopper, Star, X, Crown } from 'lucide-react';

interface VipPopupProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export function VipPopup({ isVisible, setIsVisible }: VipPopupProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#1A0000] rounded-2xl overflow-hidden shadow-2xl relative"
            >
              {/* תמונת רקע */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img 
                  src="/gallery/BarAharon-3131 Large.jpeg"
                  alt="חדרי VIP מפוארים במסעדת הדרומית"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/30 to-[#1A0000]" />
                
                {/* כפתור סגירה */}
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  aria-label="סגור חלון"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* תוכן */}
              <div className="p-6 sm:p-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-3 -mt-12 relative">
                    <div className="bg-[#1A0000] p-4 rounded-xl shadow-lg">
                      <Crown className="w-8 h-8 text-[#FF0000]" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">חדרי VIP מפוארים</h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                      מושלם לאירועים פרטיים, ימי הולדת ומפגשים עסקיים
                    </p>
                  </div>

                  <ul className="text-gray-300 space-y-3 text-right max-w-md mx-auto">
                    <li className="flex items-center gap-2 text-sm sm:text-base">
                      <Star className="w-5 h-5 text-[#FF0000] shrink-0" />
                      חדרים מרווחים עד 90 איש
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base">
                      <Star className="w-5 h-5 text-[#FF0000] shrink-0" />
                      מערכות שמע ומולטימדיה מתקדמות
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base">
                      <Star className="w-5 h-5 text-[#FF0000] shrink-0" />
                      תפריט מותאם אישית
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base">
                      <Star className="w-5 h-5 text-[#FF0000] shrink-0" />
                      שירות VIP צמוד
                    </li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link
                      to="/events"
                      onClick={() => setIsVisible(false)}
                      className="bg-[#FF0000] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CC0000] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Crown className="w-5 h-5" />
                      לפרטים נוספים
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsVisible(false)}
                      className="border border-[#FF0000] text-[#FF0000] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF0000]/10 transition-colors text-sm sm:text-base"
                    >
                      צור קשר
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 