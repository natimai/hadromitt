import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, Clock, Accessibility, Youtube, Video, Heart, Code, Shield, FileText, Scale, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-[#1A0000] to-black text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{
            opacity: [0.1, 0.15, 0.1],
            transition: { duration: 3, repeat: Infinity }
          }}
          className="absolute inset-0 bg-[url('/gallery/BarAharon-3131 Large.jpeg')] bg-cover bg-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/90 to-black/95" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-4 md:col-span-1">
            <Link to="/">
              <motion.div className="relative inline-block">
                <motion.div
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-[#FF0000]/20 blur-xl rounded-full"
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/logo.svg"
                  alt="הדרומית"
                  className="relative h-16 mx-auto md:mr-0 mb-4 hover:brightness-125 transition-all duration-300"
                />
              </motion.div>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed">
              חוויה קולינרית דרומית אותנטית
            </p>
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative bg-white/5 backdrop-blur-sm rounded-lg p-2 hover:bg-white/10 transition-colors duration-300 flex flex-col items-center"
                >
                  <img 
                    src="/039-kosher.svg" 
                    alt="תעודת כשרות למהדרין" 
                    className="h-10 w-auto object-contain"
                  />
                  <span className="mt-2 text-xs text-gray-400">כשר למהדרין</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative bg-white/5 backdrop-blur-sm rounded-lg p-2 hover:bg-white/10 transition-colors duration-300 flex flex-col items-center"
                >
                  <img 
                    src="/people-wheelchair.svg" 
                    alt="נגיש לנכים" 
                    className="h-10 w-auto object-contain"
                  />
                  <span className="mt-2 text-xs text-gray-400">נגיש לנכים</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-6 md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-[#FF0000]">פרטי התקשרות</h3>
            <motion.div className="space-y-4">
              <motion.a
                href="tel:0796744711"
                whileHover={{ scale: 1.05, x: [0, 5, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center md:justify-end group"
              >
                <Phone size={20} className="ml-3 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">079-674-4711</span>
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center md:justify-end group"
              >
                <MapPin size={20} className="ml-3 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center md:justify-end group text-right"
              >
                <Clock size={20} className="ml-3 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  <div>א'-ד': 12:00-23:00</div>
                  <div>ה': 12:00-00:00</div>
                  <div>מוצ"ש: שעה לאחר צאת השבת עד 00:00</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-6 md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-[#FF0000]">עקבו אחרינו</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <motion.a
                href="https://www.instagram.com/hadromit/?hl=he"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 bg-[#FF0000]/5 rounded-full hover:bg-[#FF0000]/10 transition-colors duration-300 group"
                aria-label="עקבו אחרינו באינסטגרם"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.3 }}
                  className="absolute inset-0 bg-[#FF0000] rounded-full blur-md"
                />
                <Instagram size={24} className="relative text-[#FF0000] group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/hadromit/?locale=he_IL"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 bg-[#FF0000]/5 rounded-full hover:bg-[#FF0000]/10 transition-colors duration-300 group"
                aria-label="עקבו אחרינו בפייסבוק"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.3 }}
                  className="absolute inset-0 bg-[#FF0000] rounded-full blur-md"
                />
                <Facebook size={24} className="relative text-[#FF0000] group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@Hadromit_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 bg-[#FF0000]/5 rounded-full hover:bg-[#FF0000]/10 transition-colors duration-300 group"
                aria-label="הצטרפו אלינו ביוטיוב"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.3 }}
                  className="absolute inset-0 bg-[#FF0000] rounded-full blur-md"
                />
                <Youtube size={24} className="relative text-[#FF0000] group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@hadromit_?lang=he-IL"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 bg-[#FF0000]/5 rounded-full hover:bg-[#FF0000]/10 transition-colors duration-300 group"
                aria-label="עקבו אחרינו בטיקטוק"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.3 }}
                  className="absolute inset-0 bg-[#FF0000] rounded-full blur-md"
                />
                <Video size={24} className="relative text-[#FF0000] group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-6 md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-[#FF0000]">מידע נוסף</h3>
            <div className="flex flex-col items-center md:items-end space-y-3">
              <Link 
                to="/accessibility"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group w-fit"
              >
                <Accessibility className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span>הצהרת נגישות</span>
              </Link>
              <Link 
                to="/privacy"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group w-fit"
              >
                <Shield className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span>מדיניות פרטיות</span>
              </Link>
              <Link 
                to="/terms"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group w-fit"
              >
                <Scale className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span>תנאי שימוש</span>
              </Link>
              <Link 
                to="/cookies"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group w-fit"
              >
                <Cookie className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span>מדיניות עוגיות</span>
              </Link>
              <Link 
                to="/sitemap"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group w-fit"
              >
                <FileText className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span>מפת האתר</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mt-12 pt-8 border-t border-[#1A0000] text-center space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} הדרומית. כל הזכויות שמורות.
            </div>
            <div className="text-gray-400 text-sm">
              רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע | טל: 079-674-4711
            </div>
          </div>
          <motion.div 
            className="flex items-center justify-center gap-2 text-sm text-gray-500"
            whileHover={{ scale: 1.05 }}
          >
            <span>נבנה באהבה</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 1, repeat: Infinity }
              }}
            >
              <Heart size={16} className="text-[#FF0000]" />
            </motion.div>
            <span>על ידי</span>
            <a 
              href="https://nati-maimon.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FF0000] hover:text-white transition-colors duration-300 flex items-center gap-1"
            >
              <Code size={16} />
              <span>נתי מימון</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}