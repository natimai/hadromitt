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
    { to: '/catering', text: 'הדרומית עד הבית' },
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
            <div className="hidden md:flex items-center space-x-8">
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

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {links.map(({ to, text }) => (
                  <motion.div
                    key={to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-base font-medium text-white hover:bg-[#FF0000]/10 rounded-lg transition-all duration-300 ${
                        isActive(to) ? 'text-[#FF0000] bg-[#FF0000]/5' : ''
                      }`}
                    >
                      {text}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}