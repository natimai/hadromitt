import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, UtensilsCrossed, Calendar, MessageCircle, Menu } from 'lucide-react';

export function MobileNav(): JSX.Element {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { to: '/', icon: Home, label: 'בית' },
    { to: '/menu', icon: UtensilsCrossed, label: 'תפריט' },
    { to: '/events', icon: Calendar, label: 'אירועים' },
    { to: '/contact', icon: MessageCircle, label: 'צור קשר' },
    { to: '/blog', icon: Menu, label: 'עוד' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-t from-[#1A0000] via-[#1A0000]/98 to-[#1A0000]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl pb-safe"
        >
          {/* Safe area padding for iOS */}
          <div className="max-w-screen-xl mx-auto px-2 py-2">
            <div className="flex justify-around items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="relative flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[64px] group"
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 to-[#CC0000]/20 rounded-2xl"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className="relative">
                      {/* Icon container */}
                      <motion.div
                        whileTap={{ scale: 0.85 }}
                        className={`
                          relative p-2 rounded-xl transition-all duration-300
                          ${active 
                            ? 'bg-gradient-to-br from-[#FF0000] to-[#CC0000] text-white shadow-lg shadow-red-500/50' 
                            : 'text-gray-400 group-hover:text-white group-hover:bg-white/5'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                        
                        {/* Pulse effect for active */}
                        {active && (
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-[#FF0000]"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Label */}
                    <span 
                      className={`
                        relative text-xs font-medium transition-all duration-300
                        ${active 
                          ? 'text-white scale-105' 
                          : 'text-gray-400 group-hover:text-white'
                        }
                      `}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Decorative top gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF0000]/50 to-transparent" />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
