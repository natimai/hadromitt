import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Map, Home, Phone, Calendar, Scale } from 'lucide-react';
import { gtagEvent } from '../utils/gtag';

export default function Sitemap(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const sections = [
    {
      title: "עמודים ראשיים",
      icon: <Home className="w-6 h-6" />,
      links: [
        { to: "/", text: "דף הבית" },
        { to: "/menu", text: "תפריט" },
        { to: "/about", text: "אודות" },
        { to: "/events", text: "אירועים" },
        { to: "/gallery", text: "גלריה" },
        { to: "/contact", text: "צור קשר" }
      ]
    },
    {
      title: "מידע משפטי",
      icon: <Scale className="w-6 h-6" />,
      links: [
        { to: "/privacy", text: "מדיניות פרטיות" },
        { to: "/terms", text: "תנאי שימוש" },
        { to: "/cookies", text: "מדיניות עוגיות" },
        { to: "/accessibility", text: "הצהרת נגישות" },
        { to: "/faq", text: "שאלות נפוצות" },
        { text: "מפת האתר XML", to: "/sitemap.xml", external: true }
      ]
    },
    {
      title: "שירותים",
      icon: <Calendar className="w-6 h-6" />,
      links: [
        { text: "הזמנת מקום", to: "https://tabitisrael.co.il/הזמנת-מקום/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation", external: true },
        { text: "אירועים פרטיים", to: "/events" },
        { text: "תפריט משלוחים", to: "/menu" }
      ]
    },
    {
      title: "רשתות חברתיות",
      icon: <Phone className="w-6 h-6" />,
      links: [
        { text: "פייסבוק", to: "https://www.facebook.com/hadromit/?locale=he_IL", external: true },
        { text: "אינסטגרם", to: "https://www.instagram.com/hadromit/?hl=he", external: true },
        { text: "יוטיוב", to: "https://www.youtube.com/@Hadromit_", external: true },
        { text: "טיקטוק", to: "https://www.tiktok.com/@hadromit_?lang=he-IL", external: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-6">
              <Map className="w-16 h-16 text-[#FF0000]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              מפת האתר
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              ניווט מהיר לכל העמודים והשירותים באתר שלנו
            </p>
          </motion.div>

          {/* Sections */}
          <div className="grid gap-8 md:grid-cols-2">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-[#FF0000]">{section.icon}</div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      {link.external ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (link.to.includes('tabitisrael')) {
                              gtagEvent('reservation_click', 'conversion', 'tabit_reservation_sitemap');
                            }
                          }}
                          className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.text}
                          </span>
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.text}
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">צריכים עזרה?</h2>
            <p className="text-gray-300 mb-4">
              אנחנו כאן לעזור! צרו איתנו קשר:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">טלפון: 079-674-4711</p>
              <p className="text-gray-300">דוא"ל: info@hadromit.co.il</p>
              <p className="text-gray-300">כתובת: רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
