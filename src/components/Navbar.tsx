import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

// פונקציה לטיפול באירועי המרה
const trackConversion = (eventType: 'reservation' | 'contact') => {
  if (window.grp) {
    window.grp.fireConversion({
      orderId: `event_${Date.now()}`,
      products: [
        {
          productId: eventType,
          productName: eventType === 'reservation' ? 'הזמנת שולחן' : 'יצירת קשר',
          productQuantity: 1,
          productPrice: eventType === 'reservation' ? 0 : 0 // ערך סמלי
        }
      ]
    });
  }
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', text: 'בית' },
    { to: '/menu', text: 'תפריט' },
    { to: '/about', text: 'עלינו' },
    { to: '/events', text: 'אירועים' },
    { to: '/gallery', text: 'גלריה' },
    { to: '/contact', text: 'צור קשר' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const dispatchMenuEvent = (isOpen: boolean) => {
      const event = new CustomEvent('menuStateChange', { 
        detail: { isOpen } 
      });
      window.dispatchEvent(event);
    };

    dispatchMenuEvent(isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = useMemo(() => {
    return `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#1A0000]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`;
  }, [isScrolled]);

  const mobileMenuClasses = useMemo(() => {
    return `fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
      isMenuOpen ? 'translate-x-0' : 'translate-x-full'
    }`;
  }, [isMenuOpen]);

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" aria-label="לוגו הדרומית">
              <motion.img
                src="/logo.svg"
                alt="לוגו הדרומית"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>

          {/* תפריט למסכים גדולים */}
          <div className="hidden md:flex md:items-center md:space-x-4 md:space-x-reverse">
            {links.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#FF0000] bg-white/10'
                        : 'text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF0000] hover:bg-[#CC0000] transition-colors"
                onClick={() => trackConversion('reservation')}
              >
                הזמן מקום
              </a>
            </motion.div>
          </div>

          {/* כפתור תפריט למובייל */}
          <div className="flex items-center md:hidden">
            <motion.button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">פתח תפריט</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* תפריט מובייל */}
      <motion.div
        className={mobileMenuClasses}
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%" }
        }}
      >
        <div className="fixed inset-0 bg-[#1A0000]/95 backdrop-blur-lg">
          <div className="pt-20 pb-6 px-4 h-full flex flex-col">
            <div className="flex-grow overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <motion.div
                    key={link.to}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-4 py-4 rounded-lg text-lg font-medium transition-colors ${
                          isActive
                            ? 'text-[#FF0000] bg-white/5'
                            : 'text-white hover:bg-white/5'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.text}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <a
                  href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-4 rounded-lg text-lg font-medium bg-[#FF0000] text-white hover:bg-[#CC0000] transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                    trackConversion('reservation');
                  }}
                >
                  הזמן מקום
                </a>
              </motion.div>
              <div className="mt-6 flex justify-center space-x-4 space-x-reverse">
                <a
                  href="tel:0796744711"
                  className="text-white hover:text-[#FF0000] transition-colors"
                  aria-label="התקשר אלינו"
                  onClick={() => trackConversion('contact')}
                >
                  <Phone size={24} />
                </a>
                <a
                  href="https://www.waze.com/ul?ll=31.22244798333614%2C34.80355542130626&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FF0000] transition-colors"
                  aria-label="נווט אלינו בוויז"
                >
                  <MapPin size={24} />
                </a>
                <a
                  href="https://www.instagram.com/hadromit_bs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FF0000] transition-colors"
                  aria-label="עקבו אחרינו באינסטגרם"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}