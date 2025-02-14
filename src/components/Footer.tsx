import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, Clock, Accessibility } from 'lucide-react';
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

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gradient-to-b from-[#1A0000] to-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-4">
            <Link to="/">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/logo.svg"
                alt="הדרומית"
                className="h-16 mx-auto md:mr-0 mb-4 hover:brightness-125 transition-all duration-300"
              />
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed">
              חוויה קולינרית דרומית אותנטית
            </p>
            <Link 
              to="/accessibility"
              className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-[#FF0000] transition-colors duration-300"
            >
              <Accessibility className="w-5 h-5" />
              <span>הצהרת נגישות</span>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h3 className="text-xl font-semibold mb-6 text-[#FF0000]">פרטי התקשרות</h3>
            <motion.div className="space-y-4">
              <motion.a
                href="tel:0796744711"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center group"
              >
                <Phone size={20} className="ml-3 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">079-674-4711</span>
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center group"
              >
                <MapPin size={20} className="ml-3 text-[#FF0000] group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center group text-center"
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
          <motion.div variants={itemVariants} className="text-center md:text-left space-y-6">
            <h3 className="text-xl font-semibold mb-6 text-[#FF0000]">עקבו אחרינו</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-[#FF0000]/5 rounded-full hover:bg-[#FF0000]/10 transition-colors duration-300"
              >
                <Instagram size={24} className="text-[#FF0000]" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-[#FF0000]/5 rounded-full hover:bg-[#FF0000]/10 transition-colors duration-300"
              >
                <Facebook size={24} className="text-[#FF0000]" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-[#1A0000] text-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} הדרומית. כל הזכויות שמורות.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}