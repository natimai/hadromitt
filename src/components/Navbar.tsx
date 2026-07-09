import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TABIT_RESERVATION_URL, PHONE_TEL } from '../utils/constants';
import { trackReservationClick, gtagEvent } from '../utils/gtag';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', text: 'בית' },
    { to: '/menu', text: 'תפריט' },
    { to: '/about', text: 'עלינו' },
    { to: '/events', text: 'אירועים' },
    { to: '/gallery', text: 'גלריה' },
    { to: '/blog', text: 'בלוג' },
    { to: '/contact', text: 'צור קשר' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleReserve = () => {
    trackReservationClick('navbar_tabit');
    setIsOpen(false);
  };

  return (
    <div className="fixed w-full z-40 top-0 transition-all duration-300">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="w-full bg-warmDark/95 backdrop-blur-sm shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 relative"
            >
              <Link to="/">
                <img
                  src="/logo.svg"
                  alt="הדרומית"
                  className="h-14 hover:brightness-125 transition-all duration-300 drop-shadow-[0_0_10px_rgba(237,29,36,0.35)]"
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-end">
              {links.map(({ to, text }) => (
                <motion.div key={to} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link
                    to={to}
                    className={`text-white hover:text-brand transition-all duration-300 px-2 lg:px-3 py-2 text-base lg:text-lg relative group ${
                      isActive(to) ? 'text-brand' : ''
                    }`}
                  >
                    {text}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    {isActive(to) && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <a
                href={TABIT_RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReserve}
                className="mr-2 inline-flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl shadow-lg shadow-brand/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                הזמן שולחן
              </a>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-3 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-white/10 active:bg-white/20 rounded-xl transition-colors duration-300 touch-manipulation"
              aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1]"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="md:hidden bg-gradient-to-b from-black/98 to-warmDark/98 backdrop-blur-xl border-b border-white/10 shadow-2xl"
              >
                <div className="px-4 pt-2 pb-6 space-y-1 max-h-[70vh] overflow-y-auto">
                  {links.map(({ to, text }, index) => (
                    <motion.div
                      key={to}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        to={to}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-6 py-4 text-lg font-medium text-white 
                          rounded-xl transition-all duration-300 text-right
                          min-h-[56px] flex items-center
                          active:scale-[0.98] touch-manipulation
                          ${
                            isActive(to)
                              ? 'text-white bg-gradient-to-r from-brand to-brand-dark shadow-lg shadow-brand/30'
                              : 'hover:bg-white/10 active:bg-white/20'
                          }
                        `}
                      >
                        <span className="flex-1">{text}</span>
                        {isActive(to) && (
                          <motion.div
                            layoutId="mobileDot"
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                    <a
                      href={PHONE_TEL}
                      className="block px-6 py-3 text-center bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-xl text-white font-medium transition-all touch-manipulation"
                      onClick={() => {
                        gtagEvent('call_click', 'engagement', 'navbar_mobile_call');
                        setIsOpen(false);
                      }}
                    >
                      התקשר עכשיו
                    </a>
                    <a
                      href={TABIT_RESERVATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-3 text-center bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand-darker active:scale-[0.98] rounded-xl text-white font-bold transition-all shadow-lg shadow-brand/30 touch-manipulation"
                      onClick={handleReserve}
                    >
                      הזמן מקום
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
