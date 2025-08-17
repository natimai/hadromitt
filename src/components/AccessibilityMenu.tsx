import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Accessibility, 
  Type, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Contrast,
  MousePointer2,
  X,
  RotateCcw,
  Keyboard,
  Play,
  PauseCircle,
  FileText,
  Check
} from 'lucide-react';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState('normal');
  const [cursor, setCursor] = useState('default');
  const [isDark, setIsDark] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [isHighlightLinks, setIsHighlightLinks] = useState(false);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);

  // שומר את ההגדרות ב-localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize);
      setContrast(settings.contrast);
      setCursor(settings.cursor);
      setIsDark(settings.isDark);
      setIsAnimationPaused(settings.isAnimationPaused);
      setIsHighlightLinks(settings.isHighlightLinks);
      setIsKeyboardNav(settings.isKeyboardNav);
      applySettings(settings);
    }
  }, []);

  // מחיל את ההגדרות על ה-HTML
  const applySettings = (settings: any) => {
    document.documentElement.style.fontSize = `${settings.fontSize}%`;
    document.body.style.filter = settings.contrast === 'high' ? 'contrast(150%)' : 'none';
    document.body.style.cursor = settings.cursor;
    
    if (settings.isDark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }

    if (settings.isAnimationPaused) {
      document.documentElement.classList.add('pause-animations');
    } else {
      document.documentElement.classList.remove('pause-animations');
    }

    if (settings.isHighlightLinks) {
      document.documentElement.classList.add('highlight-links');
    } else {
      document.documentElement.classList.remove('highlight-links');
    }

    if (settings.isKeyboardNav) {
      document.documentElement.classList.add('keyboard-nav');
    } else {
      document.documentElement.classList.remove('keyboard-nav');
    }
  };

  // שומר את ההגדרות
  const saveSettings = (settings: any) => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    applySettings(settings);
  };

  // מגדיל גודל טקסט
  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    saveSettings({ 
      fontSize: newSize, 
      contrast, 
      cursor, 
      isDark,
      isAnimationPaused,
      isHighlightLinks,
      isKeyboardNav
    });
  };

  // מקטין גודל טקסט
  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 70);
    setFontSize(newSize);
    saveSettings({ 
      fontSize: newSize, 
      contrast, 
      cursor, 
      isDark,
      isAnimationPaused,
      isHighlightLinks,
      isKeyboardNav
    });
  };

  // משנה ניגודיות
  const toggleContrast = () => {
    const newContrast = contrast === 'normal' ? 'high' : 'normal';
    setContrast(newContrast);
    saveSettings({ 
      fontSize, 
      contrast: newContrast, 
      cursor, 
      isDark,
      isAnimationPaused,
      isHighlightLinks,
      isKeyboardNav
    });
  };

  // משנה סמן עכבר
  const toggleCursor = () => {
    const newCursor = cursor === 'default' ? 'pointer' : 'default';
    setCursor(newCursor);
    saveSettings({ 
      fontSize, 
      contrast, 
      cursor: newCursor, 
      isDark,
      isAnimationPaused,
      isHighlightLinks,
      isKeyboardNav
    });
  };

  // משנה מצב כהה/בהיר
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    saveSettings({ 
      fontSize, 
      contrast, 
      cursor, 
      isDark: newIsDark,
      isAnimationPaused,
      isHighlightLinks,
      isKeyboardNav
    });
  };

  // משנה מצב אנימציות
  const toggleAnimations = () => {
    const newIsAnimationPaused = !isAnimationPaused;
    setIsAnimationPaused(newIsAnimationPaused);
    saveSettings({ 
      fontSize, 
      contrast, 
      cursor, 
      isDark,
      isAnimationPaused: newIsAnimationPaused,
      isHighlightLinks,
      isKeyboardNav
    });
  };

  // משנה הדגשת קישורים
  const toggleHighlightLinks = () => {
    const newIsHighlightLinks = !isHighlightLinks;
    setIsHighlightLinks(newIsHighlightLinks);
    saveSettings({ 
      fontSize, 
      contrast, 
      cursor, 
      isDark,
      isAnimationPaused,
      isHighlightLinks: newIsHighlightLinks,
      isKeyboardNav
    });
  };

  // משנה ניווט מקלדת
  const toggleKeyboardNav = () => {
    const newIsKeyboardNav = !isKeyboardNav;
    setIsKeyboardNav(newIsKeyboardNav);
    saveSettings({ 
      fontSize, 
      contrast, 
      cursor, 
      isDark,
      isAnimationPaused,
      isHighlightLinks,
      isKeyboardNav: newIsKeyboardNav
    });
  };

  // מאפס את כל ההגדרות
  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 100,
      contrast: 'normal',
      cursor: 'default',
      isDark: false,
      isAnimationPaused: false,
      isHighlightLinks: false,
      isKeyboardNav: false
    };
    setFontSize(defaultSettings.fontSize);
    setContrast(defaultSettings.contrast);
    setCursor(defaultSettings.cursor);
    setIsDark(defaultSettings.isDark);
    setIsAnimationPaused(defaultSettings.isAnimationPaused);
    setIsHighlightLinks(defaultSettings.isHighlightLinks);
    setIsKeyboardNav(defaultSettings.isKeyboardNav);
    saveSettings(defaultSettings);
  };

  return (
    <>
      {/* כפתור נגישות קבוע */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-4 bg-[#FF0000] text-white rounded-full shadow-lg hover:bg-[#CC0000] transition-colors duration-300 hover:scale-110 transform"
        aria-label="תפריט נגישות"
      >
        <Accessibility className="w-7 h-7" />
      </button>

      {/* תפריט נגישות */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-[min(100vw,400px)] bg-white shadow-xl overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* כותרת */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#1A0000] flex items-center gap-2">
                  <Accessibility className="w-6 h-6 text-[#FF0000]" />
                  הגדרות נגישות
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="סגור תפריט נגישות"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* תוכן התפריט */}
              <div className="p-6 space-y-6">
                {/* גודל טקסט */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1A0000]">
                    <Type className="w-5 h-5 text-[#FF0000]" />
                    גודל טקסט
                  </h3>
                  <div className="flex items-center justify-between gap-4 bg-white rounded-lg p-2">
                    <button
                      onClick={decreaseFontSize}
                      className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={fontSize <= 70}
                      aria-label="הקטן טקסט"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-medium w-16 text-center">{fontSize}%</span>
                    <button
                      onClick={increaseFontSize}
                      className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={fontSize >= 150}
                      aria-label="הגדל טקסט"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ניגודיות */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1A0000]">
                    <Contrast className="w-5 h-5 text-[#FF0000]" />
                    ניגודיות צבעים
                  </h3>
                  <button
                    onClick={toggleContrast}
                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      contrast === 'high' 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <span>ניגודיות {contrast === 'high' ? 'גבוהה' : 'רגילה'}</span>
                    <Check className={`w-5 h-5 ${contrast === 'high' ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </div>

                {/* סמן מוגדל */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1A0000]">
                    <MousePointer2 className="w-5 h-5 text-[#FF0000]" />
                    סמן מוגדל
                  </h3>
                  <button
                    onClick={toggleCursor}
                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      cursor === 'pointer' 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <span>סמן {cursor === 'pointer' ? 'מוגדל' : 'רגיל'}</span>
                    <Check className={`w-5 h-5 ${cursor === 'pointer' ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </div>

                {/* עצירת אנימציות */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1A0000]">
                    {isAnimationPaused ? (
                      <PauseCircle className="w-5 h-5 text-[#FF0000]" />
                    ) : (
                      <Play className="w-5 h-5 text-[#FF0000]" />
                    )}
                    אנימציות
                  </h3>
                  <button
                    onClick={toggleAnimations}
                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      isAnimationPaused 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <span>אנימציות {isAnimationPaused ? 'מושבתות' : 'פעילות'}</span>
                    <Check className={`w-5 h-5 ${isAnimationPaused ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </div>

                {/* הדגשת קישורים */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1A0000]">
                    <FileText className="w-5 h-5 text-[#FF0000]" />
                    הדגשת קישורים
                  </h3>
                  <button
                    onClick={toggleHighlightLinks}
                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      isHighlightLinks 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <span>הדגשת קישורים {isHighlightLinks ? 'פעילה' : 'כבויה'}</span>
                    <Check className={`w-5 h-5 ${isHighlightLinks ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </div>

                {/* ניווט מקלדת */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1A0000]">
                    <Keyboard className="w-5 h-5 text-[#FF0000]" />
                    ניווט מקלדת
                  </h3>
                  <button
                    onClick={toggleKeyboardNav}
                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      isKeyboardNav 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <span>ניווט מקלדת {isKeyboardNav ? 'פעיל' : 'כבוי'}</span>
                    <Check className={`w-5 h-5 ${isKeyboardNav ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </div>

                {/* מצב כהה */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1A0000]">
                    {isDark ? (
                      <Moon className="w-5 h-5 text-[#FF0000]" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#FF0000]" />
                    )}
                    מצב כהה
                  </h3>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      isDark 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <span>מצב {isDark ? 'כהה' : 'בהיר'}</span>
                    <Check className={`w-5 h-5 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </div>

                {/* כפתורי פעולה */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={resetSettings}
                    className="w-full p-4 flex items-center justify-center gap-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-[#1A0000] font-medium"
                  >
                    <RotateCcw className="w-5 h-5" />
                    איפוס הגדרות
                  </button>

                  <Link
                    to="/accessibility"
                    className="w-full p-4 flex items-center justify-center gap-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="w-5 h-5" />
                    הצהרת נגישות
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 