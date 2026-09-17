import { motion } from 'framer-motion';
import { Flame, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const shots = [
  { src: '/outdoor-events/buffet-tent.jpg', alt: 'בופה בשרים באירוע חוץ של הדרומית' },
  { src: '/outdoor-events/grill-skewers.jpg', alt: 'שיפודים על המנגל באירוע חוץ' },
  { src: '/outdoor-events/fruit-kayak.jpg', alt: 'עמדת פירות באירוע חוץ' },
];

export function OutdoorTeaser() {
  return (
    <section className="relative bg-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm">
              <Flame className="w-4 h-4 text-brand" />
              שירות חדש
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              לא באתם למסעדה?
              <br />
              המסעדה מגיעה אליכם.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              אירועי חוץ בדרום ובמרכז — בשרים כשר חלק, מנות מהדרומית ומנגל במקום.
              שטח, בריכה, גינה או אירוע עסקי.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" />
                כשר חלק
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" />
                דרום ומרכז
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/outdoor-events" className="btn-brand">
                לאירועי חוץ
              </Link>
              <Link
                to="/outdoor-events#quote"
                className="btn-outline-light"
              >
                קבלו הצעת מחיר
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="col-span-2 aspect-[16/10] rounded-3xl overflow-hidden">
              <img
                src={shots[0].src}
                alt={shots[0].alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src={shots[1].src}
                alt={shots[1].alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src={shots[2].src}
                alt={shots[2].alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
