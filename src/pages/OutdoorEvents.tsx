import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  UtensilsCrossed,
  Truck,
  ChefHat,
  ShieldCheck,
  MapPin,
  Phone,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Calculator,
  Award,
  Clock,
  ArrowLeft,
  Star,
  Quote,
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
import { menuCategories } from '../data/menuData';

// Comprehensive Meat & Outdoor Catering Gallery
const GALLERY_ITEMS = [
  {
    src: '/gallery/BarAharon-3565-2 Large.jpeg',
    title: 'חרבות שיפודים ובשרים על האש',
    alt: 'חרבות שיפודי אנטריקוט, קבב ופרגיות על קרש עץ באירוע של הדרומית',
    category: 'גריל ושיפודים',
  },
  {
    src: '/gallery/BarAharon-3064 Large.jpeg',
    title: 'סטייק אנטריקוט מיושן מהגריל',
    alt: 'סטייק אנטריקוט עגלי בקר מיושן עם פסי צריבה מושלמים',
    category: 'בשרים וסטייקים',
  },
  {
    src: '/outdoor-events/plated-meats.jpg',
    title: "פריסת אסאדו ובשרים על בוצ'ר",
    alt: "חיתוך נתחי אסאדו ובשר עסיסי על קרש בוצ'ר באירוע חוץ",
    category: 'אסאדו ופריסה Live',
  },
  {
    src: '/gallery/BarAharon-3097 Large.jpeg',
    title: "נתחי טליאטה פרימיום וצ'ימיצ'ורי",
    alt: 'פרוסות בשר בקר מובחר במידת עשייה מדויקת עם ירקות חרוכים',
    category: 'בשרים וסטייקים',
  },
  {
    src: '/outdoor-events/grill-skewers.jpg',
    title: 'עמדת גרילמן ושיפודים חיה',
    alt: 'שיפודי שף לוהטים ישר מרשת הגריל בעמדה חיה מול האורחים',
    category: 'גריל ושיפודים',
  },
  {
    src: '/gallery/BarAharon-3008 Large.jpeg',
    title: 'מדליוני פילה בקר וכבד אווז',
    alt: 'מדליוני פילה בקר צרובים עם כבד אווז וקרם בטטה',
    category: 'בשרים וסטייקים',
  },
  {
    src: '/gallery/BarAharon-3402 Large.jpeg',
    title: 'סמאש בורגר קצבים מובחר',
    alt: "המבורגר בשר טחון במקום וצ'יפס פריך",
    category: 'גריל ושיפודים',
  },
  {
    src: '/outdoor-events/salads-station.jpg',
    title: 'עמדת 12 סלטי שף ופיתות חמות',
    alt: 'עמדת סלטים טריים, חומוס הבית ומטבלים לצד הבשרים',
    category: 'אירועי שטח ואווירה',
  },
  {
    src: '/outdoor-events/meat/event-meat-01.jpg',
    title: 'אירוע וילה ובריכה עם שולחנות מעוצבים',
    alt: 'אירוע שטח פרטי בוילה עם בריכה ושולחנות ערוכים לארוחת בשרים',
    category: 'אירועי שטח ואווירה',
  },
  {
    src: '/outdoor-events/buffet-tent.jpg',
    title: 'מתחם בופה בשרים בשטח',
    alt: 'אוהל הגשת קייטרינג בשרים של הדרומית בשטח פתוח',
    category: 'אירועי שטח ואווירה',
  },
  {
    src: '/outdoor-events/meat/event-meat-04.jpg',
    title: 'עריכת שולחנות פרימיום לאירוע חוץ',
    alt: 'סידור שולחנות אבירים אלגנטי לאירוע בשרים פתוח',
    category: 'אירועי שטח ואווירה',
  },
  {
    src: '/outdoor-events/salmon-skewers.jpg',
    title: 'שיפודי סלמון מובחרים מהאש',
    alt: 'שיפודי סלמון עסיסיים על הגריל למגוון אורחים',
    category: 'גריל ושיפודים',
  },
  {
    src: '/outdoor-events/pool-buffet.jpg',
    title: 'בופה שטח במסיבת בריכה',
    alt: 'עמדות אוכל ובשרים חמים לצד הבריכה',
    category: 'אירועי שטח ואווירה',
  },
  {
    src: '/outdoor-events/garden-tables-night.jpg',
    title: 'ארוחת גן ומשתה בשרים לילי',
    alt: 'שולחנות ערוכים בגינה תחת תאורת אווירה למשתה בשרים',
    category: 'אירועי שטח ואווירה',
  },
];

// Showcase built from the restaurant menu — everything served in the restaurant is brought to outdoor events
const SHOWCASE_CATEGORIES: { menuName: string; tagline: string }[] = [
  { menuName: 'המיוחדים שלנו', tagline: 'מנות הדגל של השף, בגדלים הנכונים לחבורה' },
  { menuName: 'בשרים ומנות עיקריות', tagline: 'נתחי פרימיום מיושנים, צלויים על הגריל' },
  { menuName: 'שיפודים בודדים', tagline: 'שיפודים איכותיים על האש, ישר אל האורחים' },
  { menuName: 'מנות פתיחה', tagline: 'מבחר מנות ראשונות מעשה ידי השף' },
];
const EXCLUDED_SHOWCASE_ITEMS = new Set([
  'סלט עוף ועלים ירוקים',
  'המבורגר ביונד טבעוני',
  'שניצל',
]);

const MEAT_SHOWCASE = SHOWCASE_CATEGORIES.flatMap(({ menuName, tagline }) => {
  const category = menuCategories.find((c) => c.name === menuName);
  if (!category) return [];
  const items = Array.from(
    new Set(category.items.map((i) => i.name).filter((n) => !EXCLUDED_SHOWCASE_ITEMS.has(n)))
  );
  return [{ name: category.name, tagline, image: category.image, items }];
});

// Real meat reviews
const MEAT_REVIEWS = [
  {
    name: 'אורית שפירא',
    role: 'מנהלת רווחה, חברת הייטק',
    event: 'אירוע חברה של 140 איש במדבר ליד באר שבע',
    text: 'סגרנו את הדרומית לערב גיבוש בטבע. האסאדו שנמס מהעצם והאנטריקוט היו ברמה של מסעדת שף בינלאומית! הגרילמנים תקתקו כמויות מטורפות בלי תורים, והעובדים לא מפסיקים לדבר על זה.',
    rating: 5,
  },
  {
    name: 'יואב דהן',
    role: 'חגיגת יום הולדת 50',
    event: 'אירוע בחצר וילה בעומר (65 אורחים)',
    text: 'חגגנו בחצר עם חברים קרניבורים שלא מתפשרים על בשר. השפע, חרבות השיפודים והעראייס היו מעל ומעבר לציפיות. השתחררתי מהמנגל ונהניתי מהאירוע שלי כמארח. מומלץ ביותר!',
    rating: 5,
  },
  {
    name: 'משפחת אבוטבול',
    role: 'אירוע בר מצווה משפחתי',
    event: 'אירוע שטח באשדוד (110 מוזמנים)',
    text: 'היה לנו קריטי שהאירוע יהיה כשר חלק למהדרין בלי לוותר על איכות בשר של מסעדת יוקרה. הדרומית סיפקו חוויה יוצאת דופן שריגשה את כל האורחים — דתיים וחילונים כאחד.',
    rating: 5,
  },
  {
    name: 'רועי קפלן',
    role: 'מסיבת קיץ ובריכה',
    event: 'אירוע וילה בראשון לציון (80 אורחים)',
    text: 'עמדת הגרילמן ליד הבריכה הייתה הלב של המסיבה! בשר לוהט שיצא מהרשת ללא הפסקה, סלטים טריים ושירות מכל הלב. בסיום השאירו את המתחם נקי ומצוחצח.',
    rating: 5,
  },
];

// Equipment guarantees
const GUARANTEES = [
  {
    icon: Flame,
    title: 'גרילים ומעשנות מקצועיים',
    text: 'אנו מגיעים עם ציוד צלייה תעשייתי, מעשנות עצי אלון ופחמי הדרים טבעיים בלבד.',
  },
  {
    icon: UtensilsCrossed,
    title: "בוצ'רים וכלי הגשה מהודרים",
    text: 'קרשי חיתוך כבדים מעץ מלא, סכיני שף וכלי הגשה מעוצבים שמשדרגים את מראה האירוע.',
  },
  {
    icon: Clock,
    title: 'שמירה על חום וטריות',
    text: 'מתקני חימום מקצועיים המבטיחים שכל נתח מגיע לצלחת כשהוא לוהט ועסיסי עד הסועד האחרון.',
  },
  {
    icon: CheckCircle2,
    title: 'השארת מתחם נקי ומצוחצח',
    text: 'הצוות שלנו דואג לפינוי מלא של מתחם הצלייה, אריזה מסודרת וניקיון מוחלט בסיום.',
  },
];

export function OutdoorEvents() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState<string>('הכל');

  // Calculator states
  const [guestCount, setGuestCount] = useState<number>(75);
  const [selectedEventType, setSelectedEventType] = useState<string>('אירוע פרטי / יום הולדת');

  useEffect(() => {
    fbq('track', 'ViewContent', {
      content_type: 'outdoor_events',
      content_name: 'אירועי חוץ בשרים',
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImage === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
      if (event.key === 'ArrowLeft') {
        setSelectedImage((curr) =>
          curr === null ? curr : (curr + GALLERY_ITEMS.length - 1) % GALLERY_ITEMS.length
        );
      }
      if (event.key === 'ArrowRight') {
        setSelectedImage((curr) =>
          curr === null ? curr : (curr + 1) % GALLERY_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedImage]);

  // Gallery filtering
  const filteredGallery = useMemo(() => {
    if (activeGalleryTab === 'הכל') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeGalleryTab);
  }, [activeGalleryTab]);

  // Calculator meat estimate: ~500 grams net per person
  const estimatedMeatKg = useMemo(() => {
    return Math.round(guestCount * 0.5);
  }, [guestCount]);

  // Pre-filled WhatsApp link based on calculator
  const calculatorWhatsAppUrl = useMemo(() => {
    const text = encodeURIComponent(
      `שלום לדרומית! אשמח להצעת מחיר לאירוע חוץ: ${selectedEventType}, כ-${guestCount} אורחים (הערכה של כ-${estimatedMeatKg} ק"ג בשר).`
    );
    return `https://wa.me/972528731388?text=${text}`;
  }, [selectedEventType, guestCount, estimatedMeatKg]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'קייטרינג בשרים ואירועי חוץ — הדרומית',
        serviceType: 'קייטרינג בשרים, אסאדו וגרילמן לאירועי חוץ',
        url: 'https://www.hadromit.co.il/outdoor-events',
        description:
          'הדרומית מגיעה לאירועי חוץ בדרום ובמרכז: משתה בשרים פרימיום כשר חלק, אסאדו במעשנת עצי אלון, נתחי אנטריקוט מיושנים ועמדות גריל חיות מול האורחים.',
        provider: {
          '@type': 'Restaurant',
          name: 'מסעדת הדרומית',
          url: 'https://www.hadromit.co.il',
          telephone: '079-674-4711',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'דרום ישראל' },
          { '@type': 'AdministrativeArea', name: 'מרכז ישראל' },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-warmBg text-warmDark">
      <SEO
        title="קייטרינג בשרים לאירועי חוץ | אסאדו וגרילמן במקום | הדרומית"
        description="משתה בשרים פרימיום לאירועי חוץ בדרום ובמרכז: נתחי אנטריקוט מיושנים, אסאדו בעישון עצי אלון, חרבות שיפודים וגרילמנים מקצועיים בשטח. כשר חלק למהדרין."
        keywords="קייטרינג בשרים לאירועי חוץ, קייטרינג אסאדו, גרילמן לאירועים, על האש לאירוע, קייטרינג בשרי כשר חלק, קייטרינג בשרים בדרום, קייטרינג בשרים במרכז, הדרומית אירועים"
        canonicalUrl="/outdoor-events"
        image="/gallery/BarAharon-3565-2 Large.jpeg"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-ink">
        <img
          src="/gallery/BarAharon-3565-2 Large.jpeg"
          alt="משתה בשרים וחרבות שיפודים על האש באירוע של הדרומית"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,0,0,0.6)_100%)]" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-white">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/20 border border-brand/40 px-4 py-1.5 text-sm backdrop-blur-md">
              <Flame className="w-4 h-4 text-brand animate-pulse" />
              <span className="font-semibold text-brand">משתה בשרים פרימיום בשטח · כשר חלק למהדרין</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              הבשרים והאש של הדרומית, <span className="text-brand">אצלכם באירוע</span>
            </h1>

            <p className="text-lg sm:text-2xl text-white/90 max-w-2xl leading-relaxed font-light">
              קייטרינג בשרים יוקרתי לשטח, וילה, גינה או מתחם אירועים בדרום ובמרכז. נתחי אנטריקוט מיושנים, אסאדו בעישון איטי, גרילמנים מקצועיים וצלייה רותחת מול האורחים.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#quote" className="btn-brand text-lg py-4 px-8 shadow-2xl">
                קבלו הצעת מחיר לתפריט בשרים
              </a>
              <a href="#meats" className="btn-outline-light text-lg py-4 px-8">
                לבשרים של הדרומית
              </a>
            </div>

            {/* Meat Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" />
                כשר חלק למהדרין
              </span>
              <span className="text-white/35">·</span>
              <span className="inline-flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand" />
                מנגל פחמים ומעשנות עצי אלון Live
              </span>
              <span className="text-white/35">·</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" />
                דרום, באר שבע ומרכז הארץ
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Carnivore Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warmBg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-brand font-bold text-sm tracking-wider uppercase">
              סטנדרט הבשרים של הדרומית
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-warmDark mt-2 mb-4">
              אירוע בשרים כמו שמסעדת שף יודעת לעשות
            </h2>
            <p className="text-lg text-warmDark/70 leading-relaxed">
              אנחנו לא רק מביאים בשר לשטח — אנחנו יוצרים חוויה קולינרית רב-חושית שבה הריח, האש, נתחי הענק וקצב החיתוך מול העיניים סוחפים את כולם.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Flame,
                title: 'נתחי פרימיום מיושנים',
                text: 'אנטריקוט מובחר מיושן 21 יום, נתחי אסאדו עגל משוישים, שוק טלה עסיסי וקבב קצבים הנטחן במקום.',
              },
              {
                icon: UtensilsCrossed,
                title: 'צלייה חיה ומעשנת Live',
                text: "גרילמנים מקצועיים הצולים מול האורחים על גחלים לוהטות, עם חיתוך ופריסת נתחים רותחים על בוצ'רים ענקיים.",
              },
              {
                icon: ShieldCheck,
                title: 'כשר חלק למהדרין',
                text: 'הכשרות המהודרת של מסעדת הדרומית — מאפשרת לכל האורחים לשבת, ליהנות ולאכול ביחד בלב שקט ובביטחון מלא.',
              },
              {
                icon: Truck,
                title: 'עצמאות לוגיסטית מלאה',
                text: 'מגיעים עם גרילים, מעשנות, עמדות הגשה, שולחנות עבודה וצוות שירות — ומשאירים שטח נקי ומצוחצח בסיום.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-3xl p-7 border border-warmDark/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-warmDark mb-2">{item.title}</h3>
                  <p className="text-warmDark/65 leading-relaxed text-sm">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurant Meats Showcase */}
      <section id="meats" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#180000] text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 text-brand rounded-full text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5" />
              כל המסעדה, אצלכם באירוע
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
              הבשרים של הדרומית — בשטח
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              כל מה שמגיע אליכם לצלחת במסעדה אנחנו מביאים גם לאירועי חוץ: אותם נתחים, אותה צלייה על האש ואותו סטנדרט. אנחנו יודעים להפיק אירועי חוץ מדהימים, והבשר הוא הלב של כל אירוע.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {MEAT_SHOWCASE.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 2) * 0.1 }}
                className="rounded-3xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[16/7] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">{cat.name}</h3>
                    <p className="text-xs text-white/80">{cat.tagline}</p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-gray-200"
                      >
                        <Flame className="w-3.5 h-3.5 text-brand shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/70 mt-10">
            בנוסף: מנות פתיחה, תוספות וקינוחים מהמסעדה — הכול זמין גם בשטח.{' '}
            <Link to="/menu" className="text-brand font-bold hover:underline">
              לתפריט המלא של המסעדה
            </Link>
          </p>
        </div>
      </section>

      {/* Interactive Meat Calculator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warmBg">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-warmDark/10 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mx-auto mb-3">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-warmDark mb-2">
              מחשבון בשרים לאירוע חוץ
            </h2>
            <p className="text-warmDark/70 text-sm sm:text-base">
              כמה בשר צריך לאירוע שלכם? הזינו את מספר האורחים וקבלו הערכת כמויות והמלצת שף מיידית.
            </p>
          </div>

          <div className="space-y-8">
            {/* Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-bold text-warmDark text-base sm:text-lg">
                  מספר אורחים משוער:
                </label>
                <span className="font-display text-2xl sm:text-3xl font-bold text-brand">
                  {guestCount} אורחים
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="400"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
              />
              <div className="flex justify-between text-xs text-warmDark/50 mt-1">
                <span>30 אורחים (אינטימי)</span>
                <span>150 אורחים</span>
                <span>400+ אורחים (אירוע ענק)</span>
              </div>
            </div>

            {/* Event Type selection */}
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                'אירוע פרטי / יום הולדת',
                'אירוע חברה / עסקי',
                'חתונה בטבע / מסיבת וילה',
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedEventType(type)}
                  className={`p-3.5 rounded-2xl text-sm font-semibold border transition-all ${
                    selectedEventType === type
                      ? 'border-brand bg-brand/5 text-brand shadow-sm ring-1 ring-brand'
                      : 'border-warmDark/10 text-warmDark/80 hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Result Box */}
            <div className="bg-warmBg rounded-2xl p-6 border border-warmDark/10">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <span className="text-xs text-warmDark/60 block mb-1">הערכת כמות בשר</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-warmDark">
                    כ-{estimatedMeatKg} ק"ג
                  </span>
                  <span className="text-xs text-warmDark/50 block mt-0.5">כ-500 גרם נטו לסועד</span>
                </div>
                <div>
                  <span className="text-xs text-warmDark/60 block mb-1">צלייה באירוע</span>
                  <span className="font-display text-lg sm:text-xl font-bold text-brand">
                    מנגל Live
                  </span>
                  <span className="text-xs text-warmDark/50 block mt-0.5">גרילמנים ובשרי המסעדה</span>
                </div>
                <div>
                  <span className="text-xs text-warmDark/60 block mb-1">סלטים ותוספות</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-warmDark">
                    12 סלטים
                  </span>
                  <span className="text-xs text-warmDark/50 block mt-0.5">פיתות פרנה ללא הגבלה</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-warmDark/10 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={calculatorWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-center text-sm shadow-md"
                >
                  שליחת ההתאמה ישירות לוואטסאפ
                </a>
                <a
                  href="#quote"
                  className="px-6 py-3.5 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors text-center text-sm shadow-md"
                >
                  מילוי טופס לקבלת הצעת מחיר
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meat Gallery Section with Category Tabs */}
      <section id="gallery" className="bg-[#140000] py-20 px-4 sm:px-6 lg:px-8 text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-brand text-sm font-bold tracking-wider uppercase">
              תמונות אותנטיות מהשטח
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mt-2 mb-4">
              רגעים של בשר ואש
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              אירועים אמיתיים שהדרומית הגיעה אליהם — נתחים משובחים, עמדות גריל חיות וסועדים מרוצים.
            </p>
          </motion.div>

          {/* Gallery Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {['הכל', 'גריל ושיפודים', 'בשרים וסטייקים', 'אסאדו ופריסה Live', 'אירועי שטח ואווירה'].map(
              (tab) => {
                const isActive = activeGalleryTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveGalleryTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand text-white shadow-lg shadow-brand/20'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {tab}
                  </button>
                );
              }
            )}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                onClick={() => {
                  const originalIndex = GALLERY_ITEMS.findIndex((i) => i.src === image.src);
                  setSelectedImage(originalIndex >= 0 ? originalIndex : 0);
                }}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0 || index === 5 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <span className="absolute bottom-3 right-3 text-white text-sm font-semibold">
                  {image.title}
                </span>
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 text-[11px] text-brand border border-white/10">
                  {image.category}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Meat Reviews & Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warmBg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-brand font-bold text-sm tracking-wider uppercase">
              ביקורות מאירועים אמיתיים
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-warmDark mt-2 mb-4">
              מה אומרים הקרניבורים שלנו?
            </h2>
            <p className="text-lg text-warmDark/70">
              לקוחות פרטיים ומנהלות רווחה שחגגו עם שירות הבשרים של הדרומית בשטח
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {MEAT_REVIEWS.map((rev, index) => (
              <motion.div
                key={rev.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-3xl p-8 border border-warmDark/5 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-brand/20" />
                  </div>
                  <p className="text-warmDark/85 leading-relaxed text-base mb-6 font-medium">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-warmDark/10">
                  <h3 className="font-bold text-warmDark text-lg">{rev.name}</h3>
                  <p className="text-xs text-brand font-semibold">{rev.role}</p>
                  <p className="text-xs text-warmDark/50 mt-0.5">{rev.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Logistics Guarantee */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-warmDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand font-bold text-sm uppercase tracking-wider">
                ראש שקט למארגנים
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-warmDark mt-2 mb-6 leading-tight">
                אנחנו דואגים להכל — אתם פשוט נהנים מהאירוע
              </h2>
              <p className="text-warmDark/70 text-lg leading-relaxed mb-8">
                אתם לא צריכים לקנות פחמים, לעמוד מול המנגל או לנקות רשתות. צוות הדרומית מגיע עם כל הציוד הנדרש, מקים מתחם גריל אלגנטי ומעניק לכם ולאורחים חוויית שירות מושלמת.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {GUARANTEES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-warmDark text-base mb-1">{item.title}</h3>
                        <p className="text-warmDark/65 text-xs leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-warmBg rounded-3xl p-8 border border-warmDark/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-brand" />
                <h3 className="font-display text-2xl font-bold text-warmDark">
                  אזורי הגעה ופעילות
                </h3>
              </div>
              <p className="text-warmDark/70 text-sm leading-relaxed">
                מערך הקייטרינג של הדרומית מגיע לכל אירוע בדרום ובמרכז הארץ: וילות פרטיות, חצרות, חאנים, חוות בודדים, מתחמי כנסים ומקומות פתוחים.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-4 border border-warmDark/5">
                  <h4 className="font-bold text-warmDark text-sm mb-1">אזור הדרום</h4>
                  <p className="text-warmDark/65 text-xs">
                    באר שבע, עומר, להבים, מיתר, אשקלון, אשדוד, הנגב ויישובי הסביבה.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 border border-warmDark/5">
                  <h4 className="font-bold text-warmDark text-sm mb-1">אזור המרכז</h4>
                  <p className="text-warmDark/65 text-xs">
                    גוש דן, תל אביב, ראשון לציון, רחובות, השפלה והסביבה לפי תיאום.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={PHONE_TEL}
                  onClick={() => gtagEvent('call_click', 'engagement', 'outdoor_events_call')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-warmDark/15 font-bold text-warmDark hover:border-brand hover:text-brand transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_OUTDOOR_EVENTS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-colors text-sm"
                >
                  וואטסאפ ישיר לגרילמן
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Guides Cross-Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warmBg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-brand font-bold text-xs uppercase tracking-wider">
                מדריכי שף וטיפים
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-warmDark mt-1">
                רוצים לדעת עוד על בשרים ואירועי חוץ?
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand font-bold text-sm hover:underline"
            >
              <span>לכל הכתבות בבלוג</span>
              <ChevronRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'המדריך המלא לקייטרינג בשרים לאירועי חוץ',
                slug: 'outdoor-meat-catering-guide',
                readTime: '9 דקות',
                image: '/gallery/BarAharon-3565-2 Large.jpeg',
              },
              {
                title: 'קייטרינג אסאדו ומעשנת בשרים: סודות הבשרים שנמסים בפה',
                slug: 'asado-smoker-meat-catering',
                readTime: '8 דקות',
                image: '/outdoor-events/grill-skewers.jpg',
              },
              {
                title: 'כמה בשר צריך לאדם באירוע? מחשבון כמויות והמלצות שף',
                slug: 'how-much-meat-per-person-events',
                readTime: '6 דקות',
                image: '/gallery/BarAharon-3402 Large.jpeg',
              },
            ].map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-warmDark/5 hover:border-brand/30 transition-all shadow-sm flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h3 className="font-display font-bold text-warmDark group-hover:text-brand transition-colors text-base mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-warmDark/50 pt-2 border-t border-warmDark/5">
                    <span>{article.readTime} קריאה</span>
                    <span className="text-brand font-semibold">קרא עוד &larr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="quote" className="bg-[#1A0000] py-20 px-4 sm:px-6 lg:px-8 text-white scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Users className="w-10 h-10 text-brand mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-3">
              רוצים את משתה הבשרים של הדרומית אצלכם?
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              השאירו פרטים — נחזור אליכם עם הצעת מחיר מדויקת לתפריט בשרים, מנגל וצוות גרילמנים בשטח.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
            <EventLeadForm
              title="הצעת מחיר לקייטרינג בשרים"
              subtitle="שם וטלפון מספיקים להתחלה. מיקום ומספר אורחים יעזרו לנו לדייק את התפריט."
              whatsappIntro="שלום, אשמח לקבל הצעת מחיר לקייטרינג בשרים לאירוע חוץ"
              trackingLabel="outdoor_events_form"
              contentName="קייטרינג בשרים חוץ"
              showLocation
              maxGuests={800}
              reopenWhatsApp={WHATSAPP_OUTDOOR_EVENTS}
            />
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
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
                setSelectedImage((curr) =>
                  curr === null ? curr : (curr + GALLERY_ITEMS.length - 1) % GALLERY_ITEMS.length
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
                setSelectedImage((curr) =>
                  curr === null ? curr : (curr + 1) % GALLERY_ITEMS.length
                );
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="max-w-6xl w-full text-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={GALLERY_ITEMS[selectedImage].src}
                alt={GALLERY_ITEMS[selectedImage].alt}
                className="max-h-[80vh] max-w-full mx-auto rounded-2xl object-contain shadow-2xl"
              />
              <p className="text-white mt-4 text-lg font-bold">
                {GALLERY_ITEMS[selectedImage].title}
              </p>
              <p className="text-xs text-brand font-medium mt-1">
                {GALLERY_ITEMS[selectedImage].category}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
