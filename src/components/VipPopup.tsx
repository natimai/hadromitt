import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, X, Crown } from 'lucide-react';
import fbq from '../utils/fbq';

interface VipPopupProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

// הוספת ErrorBoundary לטיפול בשגיאות
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("שגיאה ברכיב VipPopup:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // במקרה של שגיאה - לא להציג כלום
    }

    return this.props.children;
  }
}

export function VipPopup({ isVisible, setIsVisible }: VipPopupProps) {
  useEffect(() => {
    // מניעת בעיות עם ספריות חיצוניות
    try {
      if (isVisible && typeof fbq === 'function') {
        fbq('track', 'ViewContent', {
          content_type: 'vip_popup',
          content_name: 'פופאפ VIP'
        });
      }
    } catch (error) {
      console.error("שגיאה בקריאה ל-fbq:", error);
    }
  }, [isVisible]);

  // אם הקומפוננטה לא אמורה להיות מוצגת, החזר null ישירות לפני האנימציה
  if (!isVisible) {
    return null;
  }

  return (
    <ErrorBoundary>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Overlay עם מינימום השפעה מספריות חיצוניות */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-y-auto"
              style={{ direction: 'rtl' }}
            >
              {/* Popup - שיפור תאימות למסכים גדולים */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl bg-[#1A0000] rounded-2xl overflow-hidden shadow-2xl relative my-2 md:my-4"
                style={{ maxHeight: '90vh' }}
              >
                {/* תמונת רקע - שיפור תאימות לכל גדלי המסך */}
                <div className="relative h-36 sm:h-48 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
                  <img 
                    src="/gallery/BarAharon-3131 Large.jpeg"
                    alt="חדרי VIP מפוארים במסעדת הדרומית"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/30 to-[#1A0000]" />
                  
                  {/* כפתור סגירה */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVisible(false);
                    }}
                    className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    aria-label="סגור חלון"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* תוכן - שיפור גלילה והתאמה למסכים */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-h-[60vh] md:max-h-[55vh] lg:max-h-[50vh] xl:max-h-[45vh] overflow-y-auto">
                  <div className="text-center space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-center gap-3 -mt-12 relative">
                      <div className="bg-[#1A0000] p-3 sm:p-4 rounded-xl shadow-lg">
                        <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF0000]" />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-3">חדרי VIP מפוארים</h2>
                      <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
                        מושלם לאירועים פרטיים, ימי הולדת ומפגשים עסקיים
                      </p>
                    </div>

                    <ul className="text-gray-300 space-y-2 sm:space-y-3 md:space-y-4 text-right max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                      <li className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0000] shrink-0" />
                        חדרים מרווחים עד 90 איש
                      </li>
                      <li className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0000] shrink-0" />
                        מערכות שמע ומולטימדיה מתקדמות
                      </li>
                      <li className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0000] shrink-0" />
                        תפריט מותאם אישית
                      </li>
                      <li className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0000] shrink-0" />
                        שירות VIP צמוד
                      </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-3 sm:pt-4 md:pt-6">
                      <Link
                        to="/events"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVisible(false);
                        }}
                        className="bg-[#FF0000] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#CC0000] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg"
                      >
                        <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                        לפרטים נוספים
                      </Link>
                      <Link
                        to="/contact"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVisible(false);
                        }}
                        className="border border-[#FF0000] text-[#FF0000] px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#FF0000]/10 transition-colors text-sm sm:text-base md:text-lg"
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
    </ErrorBoundary>
  );
} 