import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VipPopup } from './components/VipPopup';
import { Breadcrumb } from './components/Breadcrumb';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { AccessibilityMenu } from './components/AccessibilityMenu';
import { CookieBanner } from './components/CookieBanner';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import AccessibilityPage from './pages/Accessibility';
import Sitemap from './pages/Sitemap';
import Order from './pages/Order';

// קומפוננטה לגלילה אוטומטית למעלה בכל מעבר עמוד
function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App(): JSX.Element {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 15000); // שינוי מ-5 שניות ל-15 שניות

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Breadcrumb />
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
        <Footer />
        <AccessibilityMenu />
        <CookieBanner />
        <VipPopup isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} />
      </div>
    </HelmetProvider>
  );
}

export default App;