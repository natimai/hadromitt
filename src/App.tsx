import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VipPopup } from './components/VipPopup';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AccessibilityMenu } from './components/AccessibilityMenu';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import AccessibilityPage from './pages/Accessibility';
import Sitemap from './pages/Sitemap';

function App(): JSX.Element {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 5000); // מציג את הפופ-אפ אחרי 5 שניות

    return () => clearTimeout(timer);
  }, []);

  // טיפול בגובה מסך דינמי במובייל
  useEffect(() => {
    // פתרון לבעיית גובה 100vh במובייל
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    // הוספת מאזין לשינוי גודל המסך
    window.addEventListener('resize', setAppHeight);
    // הוספת מאזין לשינוי כיוון המכשיר
    window.addEventListener('orientationchange', setAppHeight);
    
    // הגדרה ראשונית
    setAppHeight();
    
    // ניקוי המאזינים בעת פירוק הקומפוננטה
    return () => {
      window.removeEventListener('resize', setAppHeight);
      window.removeEventListener('orientationchange', setAppHeight);
    };
  }, []);

  // טיפול במצב תפריט פתוח
  useEffect(() => {
    const handleMenuState = (e: CustomEvent) => {
      if (e.detail.isOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    };

    // הוספת מאזין לאירוע מותאם אישית
    window.addEventListener('menuStateChange' as any, handleMenuState);
    
    return () => {
      window.removeEventListener('menuStateChange' as any, handleMenuState);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </main>
      <Footer />
      <AccessibilityMenu />
      <VipPopup isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} />
    </div>
  );
}

export default App;