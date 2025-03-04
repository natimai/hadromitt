import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import fbq from '../utils/fbq';

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

export function Contact() {
  const handleReservationClick = () => {
    fbq('track', 'Lead', {
      content_name: 'הזמנת מקום',
      content_category: 'reservation'
    });
    trackConversion('reservation');
  };

  const handleContactClick = () => {
    trackConversion('contact');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">צור קשר</h1>
          <p className="text-xl text-gray-600 mb-4">נשמח לעמוד לשירותכם</p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/menu" 
              className="text-[#FF0000] hover:text-[#CC0000] transition-colors underline"
            >
              לתפריט המלא
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              to="/events" 
              className="text-[#FF0000] hover:text-[#CC0000] transition-colors underline"
            >
              לאירועים מיוחדים
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              to="/about" 
              className="text-[#FF0000] hover:text-[#CC0000] transition-colors underline"
            >
              אודותינו
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">הזמנת מקום</h2>
            <div className="space-y-6">
              <p className="text-gray-600">להזמנת מקום באופן מקוון, לחצו על הכפתור מטה:</p>
              <a
                href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReservationClick}
                className="w-full bg-[#FF0000] text-white py-3 rounded-lg font-semibold hover:bg-[#CC0000] transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                הזמן שולחן אונליין
              </a>
              <div className="text-gray-600 mt-4">
                <p className="font-semibold mb-2">או צרו איתנו קשר:</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#FF0000]" />
                  <a href="tel:0796744711" className="hover:text-[#FF0000] transition-colors" onClick={handleContactClick}>079-674-4711</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">פרטי התקשרות</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-[#FF0000]" />
                  <div>
                    <h3 className="font-semibold">טלפון</h3>
                    <p className="text-gray-600">
                      <a href="tel:0796744711" className="hover:text-[#FF0000] transition-colors" onClick={handleContactClick}>079-674-4711</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-[#FF0000]" />
                  <div>
                    <h3 className="font-semibold">כתובת</h3>
                    <p className="text-gray-600">רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-[#FF0000]" />
                  <div>
                    <h3 className="font-semibold">שעות פעילות</h3>
                    <p className="text-gray-600">ראשון-רביעי:</p>
                    <p className="text-gray-600 mr-4">סרויס צהריים: 12:00-17:00</p>
                    <p className="text-gray-600 mr-4">סרויס ערב: 17:00-23:00</p>
                    <p className="text-gray-600">חמישי:</p>
                    <p className="text-gray-600 mr-4">סרויס צהריים: 12:00-17:00</p>
                    <p className="text-gray-600 mr-4">סרויס ערב: 17:00-00:00</p>
                    <p className="text-gray-600">מוצ"ש:</p>
                    <p className="text-gray-600 mr-4">שעה לאחר צאת השבת עד 00:00</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-[#FF0000]" />
                  <div>
                    <h3 className="font-semibold">דוא"ל</h3>
                    <p className="text-gray-600">info@hadromit.co.il</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">מפה</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d973.7689027314881!2d34.80355542130626!3d31.22244798333614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502689c37f69ad9%3A0xa9e248ad8806ad22!2z15TXk9eo15XXnteZ16ogLSDXnteh16LXk9eqINeR16nXqNeZ150g15vXqdeo15Q!5e0!3m2!1siw!2sil!4v1739566917234!5m2!1siw!2sil"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="מפת הגעה למסעדת הדרומית"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}