import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, Clock, Accessibility, Youtube, Video, Heart, Code, Shield, FileText, Scale, Cookie, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { CookieSettings } from './CookieSettings';

export function Footer() {
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-[#1A0000] to-black text-white"
    >
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/80 to-black/90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <Link to="/" className="inline-block">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img
                  src="/logo.svg"
                  alt="הדרומית - מסעדה מומלצת בבאר שבע"
                  className="h-16 w-auto filter drop-shadow-lg"
                />
              </motion.div>
            </Link>
            
            <div className="space-y-4">
              <p className="text-gray-200 text-lg font-medium">
                מסעדה מומלצת בבאר שבע
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                חוויה קולינרית מיוחדת עם בשרים כשר חלק איכותיים
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://instagram.com/hadromit"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://facebook.com/hadromit"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://youtube.com/hadromit"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">ניווט מהיר</h3>
            <div className="space-y-3">
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/menu" className="text-gray-300 hover:text-white transition-colors">
                  תפריט
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  אודות
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  גלריה
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  אירועים
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">פרטי התקשרות</h3>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 text-gray-300"
              >
                <Phone className="w-5 h-5 text-[#FF0000]" />
                <a href="tel:0796744711" className="hover:text-white transition-colors">
                  079-674-4711
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 text-gray-300"
              >
                <MapPin className="w-5 h-5 text-[#FF0000]" />
                <span>רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 text-gray-300"
              >
                <Clock className="w-5 h-5 text-[#FF0000]" />
                <span>א-ה: 10:00-22:00</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">מידע נוסף</h3>
            <div className="space-y-3">
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Accessibility className="w-4 h-4" />
                  נגישות
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  פרטיות
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  תנאי שימוש
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Cookie className="w-4 h-4" />
                  עוגיות
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 הדרומית. כל הזכויות שמורות.</span>
              <Heart className="w-4 h-4 text-[#FF0000]" />
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setIsCookieSettingsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Settings className="w-4 h-4" />
                הגדרות עוגיות
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cookie Settings Modal */}
      <CookieSettings 
        isOpen={isCookieSettingsOpen} 
        onClose={() => setIsCookieSettingsOpen(false)} 
      />
    </motion.footer>
  );
}