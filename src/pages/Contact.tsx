import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Calendar, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import fbq from '../utils/fbq';
import { trackReservationClick, gtagEvent } from '../utils/gtag';
import {
  TABIT_RESERVATION_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  ADDRESS,
  HOURS_LINES,
  WHATSAPP_RESERVE,
  WHATSAPP_EVENTS,
} from '../utils/constants';
import { EventLeadForm } from '../components/EventLeadForm';

export function Contact() {
  const handleReservationClick = () => {
    try {
      fbq('track', 'Lead', {
        content_name: 'הזמנת מקום',
        content_category: 'reservation',
      });
    } catch {
      // ignore
    }
    trackReservationClick('contact_tabit');
  };

  const handleCallClick = () => {
    gtagEvent('call_click', 'engagement', 'phone_call');
  };

  return (
    <div className="min-h-screen pt-20 bg-warmBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-warmDark">צור קשר</h1>
          <p className="text-xl text-warmDark/65 mb-4">הזמנת שולחן, אירועים וכל שאלה — אנחנו כאן</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/menu" className="text-brand hover:text-brand-dark transition-colors underline">
              לתפריט המלא
            </Link>
            <span className="text-warmDark/30">|</span>
            <Link to="/events" className="text-brand hover:text-brand-dark transition-colors underline">
              לאירועים מיוחדים
            </Link>
            <span className="text-warmDark/30">|</span>
            <Link to="/about" className="text-brand hover:text-brand-dark transition-colors underline">
              אודותינו
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-warmDark/5"
          >
            <h2 className="font-display text-2xl font-bold mb-2 text-warmDark">הזמנת שולחן</h2>
            <p className="text-warmDark/65 mb-6">הזמינו אונליין תוך דקות — או צרו קשר ישירות:</p>

            <a
              href={TABIT_RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleReservationClick}
              className="w-full btn-brand mb-4"
            >
              <Calendar className="w-5 h-5" />
              הזמן שולחן אונליין
            </a>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <a
                href={PHONE_TEL}
                onClick={handleCallClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-warmDark/15 font-semibold text-warmDark hover:border-brand hover:text-brand transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_RESERVE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gtagEvent('whatsapp_click', 'engagement', 'contact_reserve')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                וואטסאפ
              </a>
            </div>

            <div className="inline-flex items-center gap-2 text-sm text-warmDark/70 bg-brand/5 px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-brand" />
              מסעדה כשר חלק
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-warmDark/5 space-y-5"
          >
            <h2 className="font-display text-2xl font-bold mb-2 text-warmDark">פרטי התקשרות</h2>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-warmDark">טלפון</h3>
                <a href={PHONE_TEL} onClick={handleCallClick} className="text-warmDark/65 hover:text-brand">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-warmDark">כתובת</h3>
                <p className="text-warmDark/65">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-warmDark mb-1">שעות פעילות</h3>
                {HOURS_LINES.map((line) => (
                  <p key={line} className="text-warmDark/65 text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-warmDark">דוא״ל</h3>
                <a href={`mailto:${EMAIL}`} className="text-warmDark/65 hover:text-brand">
                  {EMAIL}
                </a>
              </div>
            </div>

            <a
              href={WHATSAPP_EVENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              פנייה מהירה לאירועים בוואטסאפ
            </a>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <EventLeadForm
            title="פנייה לאירוע / חדר VIP"
            subtitle="מלאו פרטים ונחזור אליכם עם הצעה מותאמת"
          />

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-warmDark/5">
            <h2 className="font-display text-2xl font-bold mb-6 text-warmDark">מפה</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d973.7689027314881!2d34.80355542130626!3d31.22244798333614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502689c37f69ad9%3A0xa9e248ad8806ad22!2z15TXk9eo15XXnteZ16ogLSDXnteh16LXk9eqINeR16nXqNeZ150g15vXqdeo15Q!5e0!3m2!1siw!2sil!4v1739566917234!5m2!1siw!2sil"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="מפת הגעה למסעדת הדרומית"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
