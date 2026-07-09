import { motion } from 'framer-motion';
import { Calendar, Utensils, ShieldCheck, Crown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TABIT_RESERVATION_URL } from '../../utils/constants';
import { trackReservationClick } from '../../utils/gtag';

export function CTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/gallery/BarAharon-3565-2 Large.jpeg"
          alt="אווירה במסעדת הדרומית"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/65" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            מוכנים לשולחן?
          </h2>
          <p className="text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            כשר חלק, בשרים על האש וחדרי VIP — בישפרו סנטר, באר שבע.
            הזמינו עכשיו ותבטיחו מקום לערב הבא.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/75">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" />
              כשר חלק
            </span>
            <span className="inline-flex items-center gap-2">
              <Crown className="w-4 h-4 text-brand" />
              חדרי VIP
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand" />
              ישפרו סנטר
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={TABIT_RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackReservationClick('bottom_cta_tabit')}
              className="btn-brand"
            >
              <Calendar className="w-5 h-5" />
              הזמן שולחן
            </a>
            <Link to="/menu" className="btn-outline-light">
              <Utensils className="w-5 h-5" />
              לתפריט המלא
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
