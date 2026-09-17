import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Truck,
  UtensilsCrossed,
  Users,
  MapPin,
  ChefHat,
  ShieldCheck,
  TreePine,
  Building2,
  Waves,
  Tent,
  ChevronRight,
  ChevronLeft,
  X,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../components/SEO';
import { EventLeadForm } from '../components/EventLeadForm';
import fbq from '../utils/fbq';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_OUTDOOR_EVENTS,
} from '../utils/constants';
import { gtagEvent } from '../utils/gtag';

const GALLERY = [
  {
    src: '/outdoor-events/buffet-tent.jpg',
    title: 'עמדת הגשה בשטח',
    alt: 'קייטרינג בשרים של הדרומית באירוע חוץ תחת אוהל',
  },
  {
    src: '/outdoor-events/grill-skewers.jpg',
    title: 'שיפודים על המנגל',
    alt: 'שיפודים על האש בעמדת מנגל חיה באירוע חוץ של הדרומית',
  },
  {
    src: '/outdoor-events/pool-buffet.jpg',
    title: 'אירוע בריכה',
    alt: 'בופה פלאפל, פיתות וסלטים באירוע חוץ ליד הבריכה',
  },
  {
    src: '/outdoor-events/fruit-kayak.jpg',
    title: 'עמדת פירות',
    alt: 'עמדת פירות טריים מעוצבת באירוע חוץ של הדרומית',
  },
  {
    src: '/outdoor-events/salmon-skewers.jpg',
    title: 'שיפודי סלמון',
    alt: 'שיפודי סלמון מוכנים לצלייה באירוע קייטרינג של הדרומית',
  },
  {
    src: '/outdoor-events/plated-meats.jpg',
    title: 'הגשת בשרים',
    alt: 'הגשת מנות בשר אישיות באירוע חוץ של מסעדת הדרומית',
  },
  {
    src: '/outdoor-events/salads-station.jpg',
    title: 'סלטים ומנות הבית',
    alt: 'עמדת סלטים, חומוס ומנות בישול באירוע קייטרינג של הדרומית',
  },
  {
    src: '/outdoor-events/serving-line.jpg',
    title: 'שירות במקום',
    alt: 'צוות הדרומית מגיש אורחים באירוע שטח',
  },
  {
    src: '/outdoor-events/garden-tables-night.jpg',
    title: 'ארוחת גן',
    alt: 'שולחנות ערוכים לאירוע חוץ בגינה בערב',
  },
  {
    src: '/outdoor-events/sushi-station.jpg',
    title: 'עמדת שף',
    alt: 'עמדת סושי חיה באירוע קייטרינג של הדרומית',
  },
  {
    src: '/outdoor-events/fruit-cups.jpg',
    title: 'קינוחים ומשקאות',
    alt: 'עמדת פירות טריים ומיצים באירוע חוץ',
  },
  {
    src: '/outdoor-events/garden-dinner.jpg',
    title: 'אירוע ערב בחוץ',
    alt: 'סידור שולחנות לאירוע חוץ בגינה עם תאורה',
  },
  {
    src: '/outdoor-events/sushi-counter.jpg',
    title: 'עמדת סושי',
    alt: 'עמדת סושי מעוצבת באירוע קייטרינג של הדרומית',
  },
  {
    src: '/outdoor-events/fruit-bar.jpg',
    title: 'בר פירות',
    alt: 'בר פירות ומשקאות באירוע חוץ של הדרומית',
  },
];

const INCLUDED = [
  {
    icon: Flame,
    title: 'מנגל במקום',
    text: 'צולים בשרים ושיפודים מול האורחים — ריח, אש וטעם של הדרומית.',
  },
  {
    icon: UtensilsCrossed,
    title: 'מנות מהמסעדה',
    text: 'בשרים כשר חלק, סלטים, פיתות, מנות בישול ועמדות הגשה.',
  },
  {
    icon: Truck,
    title: 'מגיעים אליכם',
    text: 'צוות, ציוד ומטבח נייד לאירועים בדרום ובמרכז.',
  },
  {
    icon: ChefHat,
    title: 'צוות שף ושירות',
    text: 'הגשה, צלייה וליווי מלא מההגעה ועד סיום האירוע.',
  },
];

const EVENT_TYPES = [
  {
    icon: Tent,
    title: 'אירועי שטח וארגונים',
    text: 'בופה מקצועי גם מחוץ למסעדה — שטח, מתחם או אוהל.',
    image: '/outdoor-events/serving-line.jpg',
  },
  {
    icon: Building2,
    title: 'אירועים עסקיים',
    text: 'השקות, כנסים ומפגשי חברה עם בשרים ומנות שף.',
    image: '/outdoor-events/plated-meats.jpg',
  },
  {
    icon: Waves,
    title: 'בריכה, חוף וקיץ',
    text: 'עמדות חיות, פיתות, סלטים ומנגל לאירועי קיץ.',
    image: '/outdoor-events/pool-buffet.jpg',
  },
  {
    icon: TreePine,
    title: 'גינה ואירועים פרטיים',
    text: 'ימי הולדת, משפחה וערב מעוצב עם שולחנות ושירות צמוד.',
    image: '/outdoor-events/garden-tables-night.jpg',
  },
];

const STEPS = [
  { step: '01', title: 'משאירים פרטים', text: 'תאריך, מספר אורחים ומיקום — ונחזור עם הצעה.' },
  { step: '02', title: 'מתאימים תפריט', text: 'מנגל, בופה, עמדות שף ומנות מהמסעדה לפי האירוע.' },
  { step: '03', title: 'מגיעים אליכם', text: 'הצוות מגיע עם הבשרים, הציוד והמנגל למיקום שבחרתם.' },
  { step: '04', title: 'צולים ומגישים', text: 'האורחים אוכלים טרי, חם ועם שירות של הדרומית.' },
];

const PAGE_FAQS = [
  {
    q: 'מה כולל שירות אירועי החוץ?',
    a: 'צוות הדרומית מגיע למיקום שלכם עם בשרים ומנות מהמסעדה, מנגל במקום, עמדות הגשה ושירות מלא. אפשר לשלב בופה, שיפודים, סלטים, פירות ועמדות שף.',
  },
  {
    q: 'לאילו אזורים אתם מגיעים?',
    a: 'אנחנו מגיעים לאירועים בדרום ובמרכז הארץ. שלחו את מיקום האירוע ונאשר זמינות והגעה.',
  },
  {
    q: 'האם האוכל כשר?',
    a: 'כן. כל המנות כשר חלק, כמו במסעדה בישפרו סנטר בבאר שבע.',
  },
  {
    q: 'כמה זמן מראש צריך להזמין?',
    a: 'מומלץ לפנות כמה שיותר מוקדם, במיוחד לסופי שבוע ולאירועים גדולים. גם פנייה קצרה לפני התאריך אפשר לבדוק — השאירו פרטים ונחזור עם זמינות.',
  },
  {
    q: 'יש מינימום אורחים?',
    a: 'מתאימים את התפריט והצוות לגודל האירוע. כתבו מספר אורחים משוער בטופס ונבנה הצעה מדויקת.',
  },
];

export function OutdoorEvents() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    fbq('track', 'ViewContent', {
      content_type: 'outdoor_events',
      content_name: 'אירועי חוץ',
    });
  }, []);

  useEffect(() => {
    if (selectedImage === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
      if (event.key === 'ArrowLeft') {
        setSelectedImage((current) =>
          current === null ? current : (current + GALLERY.length - 1) % GALLERY.length
        );
      }
      if (event.key === 'ArrowRight') {
        setSelectedImage((current) =>
          current === null ? current : (current + 1) % GALLERY.length
        );
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedImage]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'אירועי חוץ — הדרומית',
        serviceType: 'קייטרינג בשרים ואירועי חוץ',
        url: 'https://www.hadromit.co.il/outdoor-events',
        description:
          'הדרומית מגיעה לאירועי חוץ בדרום ובמרכז עם בשרים כשר חלק, מנות מהמסעדה ומנגל במקום.',
        provider: {
          '@type': 'Restaurant',
          name: 'הדרומית',
          url: 'https://www.hadromit.co.il',
          telephone: '079-674-4711',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'דרום ישראל' },
          { '@type': 'AdministrativeArea', name: 'מרכז ישראל' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: PAGE_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-warmBg">
      <SEO
        title="אירועי חוץ | קייטרינג בשרים ומנגל במקום | הדרומית"
        description="הדרומית מגיעה אליכם: אירועי חוץ בדרום ובמרכז עם בשרים כשר חלק, מנות מהמסעדה ומנגל במקום. קבלו הצעת מחיר לאירוע שטח, בריכה, גינה או אירוע עסקי."
        keywords="אירועי חוץ, קייטרינג בשרים, מנגל לאירועים, קייטרינג כשר חלק, קייטרינג בדרום, קייטרינג במרכז, הדרומית אירועים"
        canonicalUrl="/outdoor-events"
        image="/outdoor-events/buffet-tent.jpg"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[78vh] flex items-center overflow-hidden">
        <img
          src="/outdoor-events/buffet-tent.jpg"
          alt="אירוע חוץ של מסעדת הדרומית — בופה בשרים ומנות שף בשטח"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,0,0,0.35)_100%)]" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28 text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm">
              <Flame className="w-4 h-4 text-brand" />
              שירות חדש · כשר חלק
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              הדרומית מגיעה אליכם
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
              אירועי חוץ בדרום ובמרכז — בשרים ומנות מהמסעדה, מנגל במקום וצוות שירות צמוד.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#quote" className="btn-brand w-full sm:w-auto">
                קבלו הצעת מחיר
              </a>
              <a href="#gallery" className="btn-outline-light w-full sm:w-auto">
                לתמונות מהאירועים
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" />
                כשר חלק
              </span>
              <span className="text-white/35">·</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" />
                דרום ומרכז
              </span>
              <span className="text-white/35">·</span>
              <span>מנגל ועמדות הגשה במקום</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we bring */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-warmDark mb-4">
              המסעדה יוצאת מהקירות
            </h2>
            <p className="text-lg text-warmDark/70 leading-relaxed">
              לא צריך להגיע לישפרו סנטר כדי לאכול הדרומית. אנחנו מגיעים לאירוע שלכם עם הבשרים,
              המנות והאש — וצולים במקום.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INCLUDED.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-3xl p-6 border border-warmDark/5 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-warmDark mb-2">{item.title}</h3>
                  <p className="text-warmDark/65 leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split story */}
      <section className="bg-ink text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <img
              src="/outdoor-events/grill-skewers.jpg"
              alt="עמדת שיפודים חיה באירוע חוץ של הדרומית"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              בשרים על האש, אצלכם באירוע
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              מביאים את מה שמכירים מהמסעדה: שיפודים, סטייקים, סלטים ומנות שף — וצולים מול האורחים.
              מתאים לאירוע קטן בגינה ולאירוע גדול בשטח.
            </p>
            <ul className="space-y-3">
              {[
                'מנגל ועמדות חיות במקום',
                'בופה מלא: בשרים, סלטים, פיתות ומנות בישול',
                'עמדות פירות, קינוחים ושף לפי הזמנה',
                'כשר חלק, כמו במסעדה',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-white/90">
                  <ChevronRight className="w-5 h-5 text-brand shrink-0 mt-0.5 rotate-180" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              מעדיפים אירוע בחדרי VIP במסעדה?
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Event types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-warmDark mb-4">
              לכל סוג של אירוע בחוץ
            </h2>
            <p className="text-lg text-warmDark/65">מגיעים אליכם — לא משנה איפה האירוע</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENT_TYPES.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl min-h-[280px]"
                >
                  <img
                    src={type.image}
                    alt={type.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
                  <div className="relative h-full p-6 flex flex-col justify-end text-white">
                    <Icon className="w-8 h-8 text-brand mb-3" />
                    <h3 className="font-display text-xl font-bold mb-2">{type.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{type.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-[#1A0000] py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              רגעים מהשטח
            </h2>
            <p className="text-white/70 text-lg">אירועים אמיתיים שהדרומית הגיעה אליהם</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setSelectedImage(index)}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0 || index === 3 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 right-3 text-white text-sm font-medium">
                  {image.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + coverage */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warmDark mb-8">
              איך זה עובד
            </h2>
            <ol className="space-y-6">
              {STEPS.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="font-display text-2xl font-bold text-brand w-12 shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-bold text-xl text-warmDark mb-1">{item.title}</h3>
                    <p className="text-warmDark/65">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-warmDark/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-brand" />
              <h2 className="font-display text-2xl font-bold text-warmDark">אזורי פעילות</h2>
            </div>
            <p className="text-warmDark/70 mb-6 leading-relaxed">
              מגיעים לאירועי חוץ בדרום ובמרכז — גינה, מתחם, בריכה, שטח או אולם. שלחו מיקום ונחזור עם זמינות.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-warmBg p-5">
                <h3 className="font-bold text-warmDark mb-2">דרום</h3>
                <p className="text-warmDark/65 text-sm leading-relaxed">
                  באר שבע והנגב, אשקלון, אשדוד והסביבה
                </p>
              </div>
              <div className="rounded-2xl bg-warmBg p-5">
                <h3 className="font-bold text-warmDark mb-2">מרכז</h3>
                <p className="text-warmDark/65 text-sm leading-relaxed">
                  גוש דן, תל אביב והסביבה — לפי תיאום
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={PHONE_TEL}
                onClick={() => gtagEvent('call_click', 'engagement', 'outdoor_events_call')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-warmDark/15 font-bold text-warmDark hover:border-brand hover:text-brand transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_OUTDOOR_EVENTS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-colors"
              >
                וואטסאפ לאירוע חוץ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-warmDark mb-8 text-center">
            שאלות נפוצות
          </h2>
          <div className="space-y-4">
            {PAGE_FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-warmDark/10 p-5 bg-warmBg [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="cursor-pointer font-bold text-warmDark list-none flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-brand text-2xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-warmDark/70 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link to="/faq" className="text-brand font-semibold hover:underline">
              לעוד שאלות על הדרומית
            </Link>
          </p>
        </div>
      </section>

      {/* Lead form */}
      <section id="quote" className="bg-warmBg py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Users className="w-10 h-10 text-brand mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warmDark mb-3">
              רוצים את הדרומית באירוע שלכם?
            </h2>
            <p className="text-lg text-warmDark/65">
              השאירו פרטים — נחזור עם הצעת מחיר לתפריט, מנגל וצוות במקום.
            </p>
          </div>
          <EventLeadForm
            title="הצעת מחיר לאירוע חוץ"
            subtitle="שם וטלפון מספיקים להתחלה. מיקום ומספר אורחים עוזרים לנו לדייק."
            whatsappIntro="שלום, אשמח לקבל הצעת מחיר לאירוע חוץ"
            trackingLabel="outdoor_events_form"
            contentName="אירוע חוץ"
            showLocation
            maxGuests={800}
            reopenWhatsApp={WHATSAPP_OUTDOOR_EVENTS}
          />
        </div>
      </section>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 pt-24"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              aria-label="סגירת תמונה"
              className="absolute top-24 left-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              type="button"
              aria-label="תמונה קודמת"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((current) =>
                  current === null ? current : (current + GALLERY.length - 1) % GALLERY.length
                );
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              type="button"
              aria-label="תמונה הבאה"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((current) =>
                  current === null ? current : (current + 1) % GALLERY.length
                );
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="max-w-6xl w-full text-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={GALLERY[selectedImage].src}
                alt={GALLERY[selectedImage].alt}
                className="max-h-[80vh] max-w-full mx-auto rounded-2xl object-contain"
              />
              <p className="text-white mt-4 text-lg">{GALLERY[selectedImage].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
