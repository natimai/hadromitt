import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, X, Settings, Check, Info } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // תמיד מופעל
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // בדיקה אם המשתמש כבר נתן הסכמה
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      // טעינת העדפות שמורות
      const savedPreferences = localStorage.getItem('cookiePreferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // הפעלה/כיבוי של קוקיז בהתאם להעדפות
    applyCookieSettings(prefs);
    
    setIsVisible(false);
  };

  const applyCookieSettings = (prefs: CookiePreferences) => {
    // Google Analytics
    if (prefs.analytics) {
      // הפעלת Google Analytics
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    } else {
      // כיבוי Google Analytics
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }

    // Facebook Pixel
    if (prefs.marketing) {
      // הפעלת Facebook Pixel
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('consent', 'grant');
      }
    } else {
      // כיבוי Facebook Pixel
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('consent', 'revoke');
      }
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return; // לא ניתן לשנות עוגיות הכרחיות
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          {!showSettings ? (
            // הודעה בסיסית
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Cookie className="w-8 h-8 text-[#FF0000] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#1A0000] mb-2">
                    שימוש בעוגיות באתר
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלכם, לנתח את התנועה באתר ולהציג תוכן מותאם אישית. 
                    על פי חוק הגנת הפרטיות בישראל, אנו נדרשים לקבל את הסכמתכם לשימוש בעוגיות שאינן הכרחיות לתפעול האתר.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-800">
                        <strong>זכויותיכם:</strong> תוכלו לשנות את העדפותיכם בכל עת, לחסום עוגיות או למחוק אותן. 
                        חסימת עוגיות עלולה להשפיע על תפקוד האתר.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    למידע נוסף, עיינו ב
                    <Link to="/cookies" className="text-[#FF0000] hover:underline mx-1">
                      מדיניות העוגיות
                    </Link>
                    ו
                    <Link to="/privacy" className="text-[#FF0000] hover:underline mx-1">
                      מדיניות הפרטיות
                    </Link>
                    שלנו.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  הגדרות מתקדמות
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  עוגיות הכרחיות בלבד
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors text-sm font-medium"
                >
                  קבלת כל העוגיות
                </button>
              </div>
            </div>
          ) : (
            // הגדרות מפורטות
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1A0000] flex items-center gap-2">
                  <Settings className="w-6 h-6 text-[#FF0000]" />
                  הגדרות עוגיות
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
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
                  onClick={saveCustomPreferences}
                  className="px-6 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  שמירת העדפות
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


