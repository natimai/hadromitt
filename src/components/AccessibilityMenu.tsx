import React, { useState, useEffect } from 'react';
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
  Phone
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
        className="fixed bottom-4 right-4 z-50 p-3 bg-[#FF0000] text-white rounded-full shadow-lg hover:bg-[#CC0000] transition-colors duration-300"
        aria-label="תפריט נגישות"
      >
        <Accessibility className="w-6 h-6" />
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
              className="absolute top-0 left-0 bottom-0 w-96 bg-white shadow-xl p-6 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-[#1A0000] flex items-center gap-2">
                  <Accessibility className="w-6 h-6 text-[#FF0000]" />
                  הגדרות נגישות
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="סגור תפריט נגישות"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* גודל טקסט */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Type className="w-5 h-5 text-[#FF0000]" />
                    גודל טקסט
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decreaseFontSize}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      aria-label="הקטן טקסט"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-lg">{fontSize}%</span>
                    <button
                      onClick={increaseFontSize}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      aria-label="הגדל טקסט"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ניגודיות */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Contrast className="w-5 h-5 text-[#FF0000]" />
                    ניגודיות צבעים
                  </h3>
                  <button
                    onClick={toggleContrast}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      contrast === 'high' 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    ניגודיות {contrast === 'high' ? 'גבוהה' : 'רגילה'}
                  </button>
                </div>

                {/* סמן מוגדל */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MousePointer2 className="w-5 h-5 text-[#FF0000]" />
                    סמן מוגדל
                  </h3>
                  <button
                    onClick={toggleCursor}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      cursor === 'pointer' 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    סמן {cursor === 'pointer' ? 'מוגדל' : 'רגיל'}
                  </button>
                </div>

                {/* עצירת אנימציות */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {isAnimationPaused ? (
                      <PauseCircle className="w-5 h-5 text-[#FF0000]" />
                    ) : (
                      <Play className="w-5 h-5 text-[#FF0000]" />
                    )}
                    אנימציות
                  </h3>
                  <button
                    onClick={toggleAnimations}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      isAnimationPaused 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    אנימציות {isAnimationPaused ? 'מושבתות' : 'פעילות'}
                  </button>
                </div>

                {/* הדגשת קישורים */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#FF0000]" />
                    הדגשת קישורים
                  </h3>
                  <button
                    onClick={toggleHighlightLinks}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      isHighlightLinks 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    הדגשת קישורים {isHighlightLinks ? 'פעילה' : 'כבויה'}
                  </button>
                </div>

                {/* ניווט מקלדת */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Keyboard className="w-5 h-5 text-[#FF0000]" />
                    ניווט מקלדת
                  </h3>
                  <button
                    onClick={toggleKeyboardNav}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      isKeyboardNav 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    ניווט מקלדת {isKeyboardNav ? 'פעיל' : 'כבוי'}
                  </button>
                </div>

                {/* מצב כהה */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {isDark ? (
                      <Moon className="w-5 h-5 text-[#FF0000]" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#FF0000]" />
                    )}
                    מצב כהה
                  </h3>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      isDark 
                        ? 'bg-[#FF0000] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    מצב {isDark ? 'כהה' : 'בהיר'}
                  </button>
                </div>

                {/* איפוס הגדרות */}
                <button
                  onClick={resetSettings}
                  className="w-full mt-4 p-3 flex items-center justify-center gap-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  איפוס הגדרות
                </button>

                {/* קישור להצהרת נגישות */}
                <Link
                  to="/accessibility"
                  className="w-full mt-4 p-3 flex items-center justify-center gap-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FileText className="w-5 h-5" />
                  הצהרת נגישות
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 