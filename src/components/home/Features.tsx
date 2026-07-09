import { motion } from 'framer-motion';
import { Flame, Crown, HeartHandshake, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TABIT_RESERVATION_URL } from '../../utils/constants';
import { trackReservationClick } from '../../utils/gtag';

const features = [
  {
    title: 'בשרים על האש',
    description: 'סטייקים ושיפודים כשר חלק, נצלים במקום — טעם עשיר וחוויה דרומית אותנטית.',
    icon: Flame,
    image: '/gallery/BarAharon-3565-2 Large.jpeg',
    highlights: ['כשר חלק', 'סטייקים מעולים', 'שיפודים על האש'],
  },
  {
    title: 'חדרי VIP לאירועים',
    description: 'חדרים פרטיים עד 90 אורחים — ימי הולדת, מפגשים עסקיים וחגיגות משפחתיות.',
    icon: Crown,
    image: '/gallery/BarAharon-3097 Large.jpeg',
    highlights: ['חדרי VIP פרטיים', 'תפריט מותאם', 'שירות צמוד'],
  },
  {
    title: 'שירות שמזמין לחזור',
    description: 'צוות מקצועי, אווירה חמה והמלצות אישיות — מההזמנה ועד הקינוח.',
    icon: HeartHandshake,
    image: '/gallery/BarAharon-3402 Large.jpeg',
    highlights: ['צוות מקצועי', 'שירות אישי', 'אווירה מזמינה'],
  },
];

export function Features() {
  return (
    <section className="relative py-24 px-6 bg-warmBg">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-warmDark mb-4">
            למה הדרומית?
          </h2>
          <p className="text-xl text-warmDark/70 font-medium">
            חוויה קולינרית שלא תשכחו
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isFeatured = index === 0;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-3xl ${
                  isFeatured ? 'lg:col-span-6' : 'lg:col-span-3'
                }`}
              >
                <div className={`relative ${isFeatured ? 'aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px]' : 'aspect-[3/4] lg:min-h-[420px]'}`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand/90 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/85 leading-relaxed mb-4 text-sm sm:text-base">
                      {feature.description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {feature.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white/10 border border-white/15"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href={TABIT_RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReservationClick('features_tabit')}
            className="btn-brand"
          >
            <Calendar className="w-5 h-5" />
            הזמן שולחן
          </a>
          <Link
            to="/events"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold text-warmDark border-2 border-warmDark/15 hover:border-brand hover:text-brand transition-colors"
          >
            לאירועים וחדרי VIP
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
