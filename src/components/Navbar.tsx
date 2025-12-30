import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="fixed w-full z-40 top-0 transition-all duration-300">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="w-full bg-[#1A0000]/95 backdrop-blur-sm shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 relative"
            >
              <Link to="/">
                <img src="/logo.svg" alt="הדרומית" className="h-14 hover:brightness-125 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {links.map(({ to, text }) => (
                <motion.div
                  key={to}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    to={to}
                    className={`text-white hover:text-[#FF0000] transition-all duration-300 px-4 py-2 text-lg relative group ${
                      isActive(to) ? 'text-[#FF0000]' : ''
                    }`}
                  >
                    {text}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FF0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    {isActive(to) && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF0000]"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button - Improved Touch Target */}
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

        {/* Mobile Menu - Enhanced */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
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
                className="md:hidden bg-gradient-to-b from-black/98 to-[#1A0000]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl"
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
                          ${isActive(to) 
                            ? 'text-white bg-gradient-to-r from-[#FF0000] to-[#CC0000] shadow-lg shadow-red-500/30' 
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
                  
                  {/* Quick Actions */}
                  <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                    <a
                      href="tel:0796744711"
                      className="block px-6 py-3 text-center bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-xl text-white font-medium transition-all touch-manipulation"
                      onClick={() => setIsOpen(false)}
                    >
                      📞 התקשר עכשיו
                    </a>
                    <a
                      href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-3 text-center bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#990000] active:scale-[0.98] rounded-xl text-white font-bold transition-all shadow-lg shadow-red-500/30 touch-manipulation"
                      onClick={() => setIsOpen(false)}
                    >
                      🍽️ הזמן מקום
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