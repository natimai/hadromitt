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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-50"
          >
            <div className="relative bg-[#1A0000] rounded-2xl overflow-hidden">
              {/* Background Animation */}
              <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0.2 }}
                animate={{ 
                  opacity: [0.2, 0.3, 0.2],
                  background: 'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, transparent 100%)'
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />

              {/* Content */}
              <div className="relative p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <Crown className="w-8 h-8 text-[#FF0000]" />
                    <h2 className="text-2xl font-bold text-white">חדרי VIP מפוארים</h2>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="סגור חלון"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                <div className="space-y-6 text-center">
                  <div className="flex justify-center gap-2">
                    <PartyPopper className="w-6 h-6 text-[#FF0000] animate-bounce" />
                    <Star className="w-6 h-6 text-[#FF0000] animate-pulse" />
                  </div>
                  
                  <p className="text-lg text-gray-200">
                    אנחנו שמחים לבשר על פתיחת חדרי ה-VIP המפוארים שלנו!
                    <br />
                    מושלם לאירועים פרטיים, ימי הולדת ומפגשים עסקיים.
                  </p>

                  <ul className="text-gray-300 space-y-2">
                    <li>• חדרים מרווחים ל-20 עד 50 איש</li>
                    <li>• מערכות שמע וקריוקי מתקדמות</li>
                    <li>• תפריט מותאם אישית</li>
                    <li>• שירות VIP צמוד</li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link
                      to="/events"
                      onClick={() => setIsVisible(false)}
                      className="bg-[#FF0000] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CC0000] transition-colors flex items-center justify-center gap-2"
                    >
                      <Crown className="w-5 h-5" />
                      לפרטים נוספים
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsVisible(false)}
                      className="border border-[#FF0000] text-[#FF0000] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF0000]/10 transition-colors"
                    >
                      צור קשר
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 