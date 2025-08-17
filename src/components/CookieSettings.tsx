import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Cookie } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieSettings({ isOpen, onClose }: CookieSettingsProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (isOpen) {
      // טעינת העדפות שמורות
      const savedPreferences = localStorage.getItem('cookiePreferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, [isOpen]);

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return;
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // הפעלה/כיבוי של קוקיז בהתאם להעדפות
    applyCookieSettings(preferences);
    
    onClose();
  };

  const applyCookieSettings = (prefs: CookiePreferences) => {
    // Google Analytics
    if (prefs.analytics) {
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    } else {
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }

    // Facebook Pixel
    if (prefs.marketing) {
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('consent', 'grant');
      }
    } else {
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('consent', 'revoke');
      }
    }
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    localStorage.setItem('cookiePreferences', JSON.stringify(necessaryOnly));
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyCookieSettings(necessaryOnly);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1A0000] flex items-center gap-2">
                <Cookie className="w-6 h-6 text-[#FF0000]" />
                הגדרות עוגיות
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* עוגיות הכרחיות */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#1A0000]">עוגיות הכרחיות</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">תמיד פעיל</span>
                    <div className="w-10 h-6 bg-[#FF0000] rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  עוגיות אלו הכרחיות לתפעול בסיסי של האתר ולא ניתן לכבות אותן. הן כוללות זיכרון הפעלה, אבטחה ונגישות.
                </p>
              </div>

              {/* עוגיות פונקציונליות */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#1A0000]">עוגיות פונקציונליות</h3>
                  <button
                    onClick={() => handlePreferenceChange('functional')}
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.functional ? 'bg-[#FF0000] justify-end' : 'bg-gray-300 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  מאפשרות שמירת העדפות אישיות כמו שפה, גודל טקסט והגדרות נגישות.
                </p>
              </div>

              {/* עוגיות אנליטיות */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#1A0000]">עוגיות אנליטיות</h3>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.analytics ? 'bg-[#FF0000] justify-end' : 'bg-gray-300 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  עוזרות לנו להבין כיצד אתם משתמשים באתר כדי לשפר את השירות. כוללות Google Analytics.
                </p>
              </div>

              {/* עוגיות שיווקיות */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#1A0000]">עוגיות שיווקיות</h3>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.marketing ? 'bg-[#FF0000] justify-end' : 'bg-gray-300 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  משמשות למעקב אחר פעילותכם לצורך הצגת פרסומות מותאמות. כוללות Facebook Pixel.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={acceptNecessaryOnly}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                עוגיות הכרחיות בלבד
              </button>
              <button
                onClick={savePreferences}
                className="px-6 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                שמירת העדפות
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
