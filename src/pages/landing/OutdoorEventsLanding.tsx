import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Flame,
  ShieldCheck,
  MapPin,
  Users,
  Phone,
  CheckCircle2,
  ChevronDown,
  UtensilsCrossed,
  Truck,
  ClipboardList,
  ArrowLeft,
} from 'lucide-react';
import { EventLeadForm } from '../../components/EventLeadForm';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { menuCategories } from '../../data/menuData';
import fbq from '../../utils/fbq';
import { gtagEvent, trackAdsLead } from '../../utils/gtag';
import {
  ADDRESS,
  WHATSAPP_DISPLAY,
  WHATSAPP_TEL,
  WHATSAPP_OUTDOOR_EVENTS,
} from '../../utils/constants';

const EASE = [0.16, 1, 0.3, 1] as const;

const MENU_CATEGORIES = ['בשרים ומנות עיקריות', 'שיפודים בודדים'];

const HIGHLIGHTS = [
  'כשר חלק למהדרין',
  'צלייה במקום, מול האורחים',
  'צוות, ציוד והגשה עלינו',
];

const TICKER = [
  'כשר חלק למהדרין',
  'צלייה חיה מול האורחים',
  'הבשרים של מסעדת הדרומית',
  'דרום ומרכז',
  'צוות, ציוד והגשה',
];

const INCLUDED = [
  {
    icon: Flame,
    title: 'הבשרים של המסעדה',
    text: 'אותם נתחים ואותה רמה כמו בהדרומית בבאר שבע. כל מה שיש בתפריט המסעדה מגיע גם לאירוע.',
  },
  {
    icon: UtensilsCrossed,
    title: 'צלייה חיה במקום',
    text: 'הבשר יוצא מהאש ישר לצלחת. האורחים מקבלים אותו חם ועסיסי, לא מחומם מחדש.',
  },
  {
    icon: Users,
    title: 'צוות מקצועי',
    text: 'הצוות שלנו מקים, צולה ומגיש. אתם לא עומדים ליד המנגל — אתם בתוך האירוע.',
  },
  {
    icon: Truck,
    title: 'מגיעים עם הכול',
    text: 'מנגלים, עמדות הגשה וכלים. אתם מספקים את המקום, אנחנו את השאר.',
  },
];

const STEPS = [
  { title: 'משאירים פרטים', text: 'שם, טלפון ופרטי האירוע. לוקח פחות מדקה.' },
  { title: 'בונים תפריט והצעת מחיר', text: 'נחזור אליכם, נבין מה אתם צריכים ונשלח הצעה מסודרת.' },
  { title: 'אנחנו מגיעים, אתם נהנים', text: 'ביום האירוע אנחנו מקימים, צולים ומגישים.' },
];

const EVENT_TYPES = [
  'ימי הולדת ושמחות',
  'אירועי חברה וימי גיבוש',
  'בר/בת מצווה ובריתות',
  'אירועים בגינה, בווילה ובשטח',
];

const PHOTOS = [
  { src: '/outdoor-events/grill-skewers.jpg', alt: 'שיפודים על המנגל באירוע חוץ של הדרומית', caption: 'ישר מהאש' },
  { src: '/outdoor-events/serving-line.jpg', alt: 'עמדת הגשה של הדרומית באירוע חוץ', caption: 'עמדת הגשה בשטח' },
  { src: '/outdoor-events/garden-dinner.jpg', alt: 'שולחנות ערוכים לארוחת ערב בגינה', caption: 'ערב בגינה' },
  { src: '/outdoor-events/plated-meats.jpg', alt: 'בשרים מוגשים באירוע חוץ', caption: 'הבשרים של המסעדה' },
  { src: '/outdoor-events/meat/event-meat-02.jpg', alt: 'שולחנות ערוכים לאירוע בחצר', caption: 'אירוע בחצר' },
  { src: '/outdoor-events/buffet-tent.jpg', alt: 'מתחם הגשה של הדרומית בשטח פתוח', caption: 'מתחם בשטח פתוח' },
];

const FAQS = [
  {
    q: 'כמה זה עולה?',
    a: 'המחיר תלוי במספר האורחים, בתפריט ובמיקום. משאירים פרטים ומקבלים הצעת מחיר מסודרת, בלי התחייבות.',
  },
  {
    q: 'הכשרות היא כשר חלק?',
    a: 'כן. כשר חלק למהדרין, בדיוק כמו במסעדה.',
  },
  {
    q: 'לאן אתם מגיעים?',
    a: 'לדרום ולמרכז: באר שבע והנגב, אשדוד, אשקלון, השפלה וגוש דן. מקום אחר? שאלו אותנו.',
  },
  {
    q: 'אפשר לבחור מה יהיה בתפריט?',
    a: 'כן. כל מה שיש בתפריט המסעדה זמין גם באירוע, ואנחנו בונים איתכם את התפריט לפי האירוע והתקציב.',
  },
  {
    q: 'לכמה אורחים אתם מתאימים?',
    a: 'מאירועים משפחתיים ועד אירועים גדולים. ספרו לנו כמה אורחים צפויים ונתאים את הכמויות והצוות.',
  },
  {
    q: 'מה אנחנו צריכים לארגן?',
    a: 'בעיקר את המקום. את הבשרים, הצלייה, הצוות וההגשה אנחנו מביאים. את כל השאר נתאם איתכם בשיחה.',
  },
  {
    q: 'כמה זמן מראש צריך להזמין?',
    a: 'כמה שיותר מוקדם, במיוחד בעונת האירועים ובסופי שבוע. גם אם התאריך קרוב, שווה לבדוק איתנו.',
  },
];

// Fixed pseudo-random layout so embers don't jump between renders
const EMBERS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 3 + ((i * 7) % 6),
  duration: 7 + ((i * 13) % 8),
  delay: -((i * 11) % 14),
  drift: (i % 2 ? 1 : -1) * (10 + ((i * 17) % 50)),
}));

function trackContact(label: string) {
  gtagEvent('contact_click', 'conversion', label);
  trackAdsLead();
}

// The form sits in the hero on desktop and below it on mobile; scroll to whichever is visible
function scrollToForm() {
  const target = Array.from(document.querySelectorAll<HTMLElement>('[data-lead-form]')).find(
    (el) => el.offsetParent !== null
  );
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Embers({ count }: { count: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {EMBERS.slice(0, count).map((e, i) => (
        <span
          key={i}
          className="lp-ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            ['--lp-drift' as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="text-center mb-10">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`inline-flex items-center gap-2 text-sm font-bold ${light ? 'text-[#FFB23F]' : 'text-brand'}`}
      >
        <span className="h-px w-6 bg-current" />
        {eyebrow}
        <span className="h-px w-6 bg-current" />
      </motion.span>
      <div className="overflow-hidden mt-2">
        <motion.h2
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl font-bold leading-tight"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}

function Marquee({
  items,
  reverse = false,
  duration = 30,
  renderItem,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  renderItem: (item: string) => React.ReactNode;
}) {
  return (
    <div className="overflow-hidden" dir="ltr">
      <div
        className={`lp-marquee flex w-max ${reverse ? 'lp-marquee-reverse' : ''}`}
        style={{ ['--lp-marquee-duration' as string]: `${duration}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={`${item}-${i}`} className="shrink-0" dir="rtl" aria-hidden={i >= items.length}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepsTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });

  return (
    <ol ref={ref} className="relative max-w-xl mx-auto space-y-10 pr-16">
      <div className="absolute right-[22px] top-2 bottom-2 w-0.5 bg-warmDark/10" />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute right-[22px] top-2 bottom-2 w-0.5 origin-top bg-gradient-to-b from-[#FFB23F] via-[#FF5A1F] to-brand"
      />
      {STEPS.map((step, i) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="absolute -right-16 top-0 w-11 h-11 rounded-full bg-brand text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-brand/30 ring-4 ring-white"
          >
            {i + 1}
          </motion.span>
          <h3 className="font-bold text-xl mb-1">{step.title}</h3>
          <p className="text-warmDark/65">{step.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
            className={`rounded-2xl border transition-colors ${
              isOpen ? 'bg-white border-brand/30 shadow-md shadow-brand/5' : 'bg-white/70 border-warmDark/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right font-bold text-lg"
            >
              {f.q}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isOpen ? 'bg-brand text-white' : 'bg-warmDark/5 text-brand'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-warmDark/70 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export function OutdoorEventsLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40);
    setShowBar(y > 480);
  });

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(heroProgress, [0, 1], ['0%', '25%']);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  const { scrollYProgress: menuProgress } = useScroll({ target: menuRef, offset: ['start end', 'end start'] });
  const outlineX = useTransform(menuProgress, [0, 1], ['-20%', '20%']);

  // Keep the campaign keyword with the lead so we know which search brought it
  const leadSource = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const term = params.get('utm_term') || params.get('keyword');
    const campaign = params.get('utm_campaign');
    return ['דף נחיתה גוגל — אירועי חוץ', campaign && `קמפיין: ${campaign}`, term && `מילת חיפוש: ${term}`]
      .filter(Boolean)
      .join(' | ');
  }, []);

  // The chef's recommended meats from the restaurant menu — short enough to scan
  const menuRows = useMemo(() => {
    const items = Array.from(
      new Set(
        menuCategories
          .filter((c) => MENU_CATEGORIES.includes(c.name))
          .flatMap((c) => c.items.filter((i) => i.isRecommended).map((i) => i.name))
      )
    );
    const half = Math.ceil(items.length / 2);
    return [items.slice(0, half), items.slice(half)];
  }, []);

  useEffect(() => {
    fbq('track', 'ViewContent', {
      content_type: 'outdoor_events_landing',
      content_name: 'דף נחיתה אירועי חוץ',
    });
  }, []);

  const leadForm = (
    <EventLeadForm
      variant="dark"
      title="קבלו הצעת מחיר"
      subtitle="שם וטלפון מספיקים. נחזור אליכם בהקדם."
      whatsappIntro="שלום, אשמח לקבל הצעת מחיר לקייטרינג בשרים לאירוע חוץ"
      trackingLabel="outdoor_landing_form"
      contentName={leadSource}
      showLocation
      maxGuests={800}
      reopenWhatsApp={WHATSAPP_OUTDOOR_EVENTS}
      onLead={trackAdsLead}
      whatsappOnly
    />
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-warmBg text-warmDark overflow-x-clip">
        <Helmet>
          <title>קייטרינג בשרים לאירועי חוץ | כשר חלק | הדרומית</title>
          <meta
            name="description"
            content="קייטרינג בשרים כשר חלק לאירועי חוץ בדרום ובמרכז. הבשרים של מסעדת הדרומית, צלייה במקום וצוות מקצועי. קבלו הצעת מחיר."
          />
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        {/* Header */}
        <header
          className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
            scrolled ? 'bg-ink/85 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <motion.img
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              src="/logo.svg"
              alt="הדרומית — מסעדת בשרים כשרה"
              className="h-10 w-auto"
            />
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              href={WHATSAPP_TEL}
              onClick={() => trackContact('landing_header_call')}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white text-sm font-bold hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">{WHATSAPP_DISPLAY}</span>
            </motion.a>
          </div>
        </header>

        {/* Hero */}
        <section ref={heroRef} className="relative bg-ink text-white overflow-hidden">
          <motion.div style={{ y: heroImageY }} className="absolute inset-0">
            <motion.img
              initial={{ scale: 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: 9, ease: 'easeOut' }}
              src="/gallery/BarAharon-3565-2 Large.jpeg"
              alt=""
              className="w-full h-full object-cover opacity-50"
              fetchPriority="high"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30 lg:bg-gradient-to-l lg:from-ink lg:via-ink/80 lg:to-ink/30" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,90,31,0.35),transparent_70%)]" />
          <Embers count={22} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center min-h-[100svh] lg:min-h-0 pt-24 pb-20 lg:pt-32 lg:pb-28">
            <motion.div style={{ opacity: heroContentOpacity }} className="space-y-6 min-w-0">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold"
              >
                <MapPin className="w-4 h-4 text-[#FFB23F]" />
                מסעדת הדרומית, באר שבע · דרום ומרכז
              </motion.span>

              <h1 className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold">
                {['קייטרינג בשרים', 'לאירועי חוץ.'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-1">
                    <motion.span
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.12 }}
                      className="block"
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
                <span className="block overflow-hidden pb-4">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.54 }}
                    className="relative inline-block"
                  >
                    <span className="lp-fire-text">המסעדה מגיעה אליכם.</span>
                    <svg
                      className="absolute -bottom-3 right-0 w-full h-3"
                      viewBox="0 0 300 12"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M298 7 C 240 2, 180 11, 120 6 S 30 3, 2 8"
                        fill="none"
                        stroke="#FF5A1F"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut', delay: 1.2 }}
                      />
                    </svg>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
                className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl"
              >
                הבשרים של מסעדת הדרומית, צלויים במקום על האש. אנחנו מביאים את הצוות, הציוד וההגשה. אתם נהנים מהאירוע.
              </motion.p>

              <ul className="space-y-2.5">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 1 + i * 0.1 }}
                    className="flex items-center gap-2.5 text-white/90"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FFB23F] shrink-0" />
                    {h}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 1.3 }}
                className="flex flex-col sm:flex-row gap-3 lg:hidden"
              >
                <motion.button
                  type="button"
                  onClick={scrollToForm}
                  whileTap={{ scale: 0.97 }}
                  animate={{ boxShadow: ['0 0 0 0 rgba(237,29,36,0.55)', '0 0 0 14px rgba(237,29,36,0)'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-l from-brand to-[#FF5A1F]"
                >
                  קבלו הצעת מחיר
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
                <a
                  href={WHATSAPP_OUTDOOR_EVENTS}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('landing_hero_whatsapp')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold text-white bg-[#25D366] active:bg-[#1EBE5A]"
                >
                  <WhatsAppIcon />
                  כתבו לנו בוואטסאפ
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              data-lead-form
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="hidden lg:block min-w-0 scroll-mt-20"
            >
              {leadForm}
            </motion.div>
          </div>

          {/* Scroll cue (mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="lg:hidden absolute bottom-10 inset-x-0 flex justify-center pointer-events-none"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-7 h-11 rounded-full border-2 border-white/40 flex justify-center pt-2"
            >
              <span className="w-1 h-2 rounded-full bg-white/70" />
            </motion.div>
          </motion.div>
        </section>

        {/* Tilted ticker */}
        <div className="relative z-10 -mt-6 lg:-mt-8 -rotate-2 scale-105 bg-gradient-to-l from-brand via-[#F0391F] to-[#FF5A1F] text-white py-3 shadow-xl shadow-brand/30">
          <Marquee
            items={TICKER}
            duration={28}
            renderItem={(item) => (
              <span className="flex items-center gap-4 px-4 font-bold text-base sm:text-lg whitespace-nowrap">
                {item}
                <Flame className="w-4 h-4 text-[#FFD27A]" />
              </span>
            )}
          />
        </div>

        {/* Mobile form */}
        <section className="lg:hidden bg-ink px-4 pt-14 pb-12 -mt-4">
          <motion.div
            data-lead-form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="min-w-0 scroll-mt-20"
          >
            {leadForm}
          </motion.div>
        </section>

        {/* What's included */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <SectionTitle eyebrow="מה מקבלים" title="אירוע ברמה של מסעדה" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INCLUDED.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden bg-white rounded-3xl p-6 border border-warmDark/5 shadow-sm"
                >
                  <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-br from-[#FFB23F]/20 to-brand/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                  <motion.div
                    initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
                    whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 + (i % 2) * 0.08 }}
                    className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-[#FF5A1F] text-white flex items-center justify-center mb-5 shadow-lg shadow-brand/25"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                  <h3 className="relative font-bold text-xl mb-2">{title}</h3>
                  <p className="relative text-warmDark/65 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-10">
              {EVENT_TYPES.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.06 }}
                  className="rounded-full bg-white border border-warmDark/10 px-4 py-2 text-sm font-medium text-warmDark/80"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Menu */}
        <section ref={menuRef} className="relative py-20 bg-[#140000] text-white overflow-hidden">
          <motion.div
            style={{ x: outlineX }}
            className="absolute top-6 inset-x-0 whitespace-nowrap font-display font-bold text-[7rem] sm:text-[11rem] leading-none lp-outline-text select-none pointer-events-none text-center"
            aria-hidden="true"
          >
            על האש · על האש
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(237,29,36,0.25),transparent_70%)]" />

          <div className="relative px-4 sm:px-6">
            <SectionTitle eyebrow="התפריט" title="מה על האש" light />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/70 -mt-6 mb-10 max-w-xl mx-auto text-center"
            >
              כל מה שיש בתפריט המסעדה מגיע גם לאירוע. התפריט נבנה איתכם, לפי האירוע והתקציב.
            </motion.p>
          </div>

          <div className="relative space-y-3">
            {menuRows.map((row, i) => (
              <Marquee
                key={i}
                items={row}
                reverse={i === 1}
                duration={34 + i * 6}
                renderItem={(item) => (
                  <span className="mx-1.5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm px-5 py-3 text-base text-white/90 whitespace-nowrap">
                    <Flame className="w-4 h-4 text-[#FF5A1F]" />
                    {item}
                  </span>
                )}
              />
            ))}
          </div>

          <p className="relative text-white/55 text-sm mt-10 text-center px-4">
            ועוד מנות דגל, מנות פתיחה, סלטים ותוספות מהמסעדה.
          </p>
        </section>

        {/* Photos */}
        <section className="py-20">
          <div className="px-4 sm:px-6">
            <SectionTitle eyebrow="מהשטח" title="מאירועים שעשינו" />
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2))] pb-4">
            {PHOTOS.map((p, i) => (
              <motion.figure
                key={p.src}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 3) * 0.08 }}
                className="relative shrink-0 snap-center w-[78vw] sm:w-[45vw] lg:w-[24rem] aspect-[4/5] rounded-3xl overflow-hidden bg-warmDark/10 group"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 right-4 left-4 text-white font-bold text-lg">
                  {p.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <p className="text-center text-sm text-warmDark/45 mt-2 lg:hidden">החליקו לעוד תמונות ←</p>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 sm:px-6 bg-white border-y border-warmDark/5">
          <div className="max-w-5xl mx-auto">
            <SectionTitle eyebrow="פשוט" title="איך זה עובד" />
            <StepsTimeline />
            <div className="text-center mt-12">
              <motion.button
                type="button"
                onClick={scrollToForm}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-l from-brand to-[#FF5A1F] shadow-lg shadow-brand/30"
              >
                <ClipboardList className="w-5 h-5" />
                לקבלת הצעת מחיר
              </motion.button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionTitle eyebrow="לפני שמתקשרים" title="שאלות נפוצות" />
            <Faq />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 px-4 sm:px-6 bg-ink text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,90,31,0.25),transparent_60%)]" />
          <Embers count={10} />
          <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="space-y-5 text-center lg:text-right min-w-0"
            >
              <ShieldCheck className="w-12 h-12 text-[#FFB23F] mx-auto lg:mx-0" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
                בואו נדבר על <span className="lp-fire-text">האירוע שלכם</span>
              </h2>
              <p className="text-white/75 text-lg">השאירו פרטים, או דברו איתנו ישירות.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={WHATSAPP_OUTDOOR_EVENTS}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('landing_footer_whatsapp')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold text-white bg-[#25D366] hover:bg-[#1EBE5A] transition-colors"
                >
                  <WhatsAppIcon />
                  וואטסאפ
                </a>
                <a
                  href={WHATSAPP_TEL}
                  onClick={() => trackContact('landing_footer_call')}
                  className="btn-outline-light rounded-2xl"
                >
                  <Phone className="w-5 h-5" />
                  <span dir="ltr">{WHATSAPP_DISPLAY}</span>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="min-w-0"
            >
              {leadForm}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white/50 text-xs pt-6 pb-24 md:pb-6 px-4 text-center space-y-2">
          <p>מסעדת הדרומית · {ADDRESS}</p>
          <p className="flex justify-center gap-3">
            <Link to="/accessibility" className="hover:text-white">הצהרת נגישות</Link>
            <span>·</span>
            <Link to="/privacy" className="hover:text-white">מדיניות פרטיות</Link>
          </p>
        </footer>

        {/* Mobile sticky actions — slide in once the hero is out of view */}
        <AnimatePresence>
          {showBar && (
            <motion.nav
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: EASE }}
              aria-label="פעולות מהירות"
              className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ink/95 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
            >
              <div className="grid grid-cols-3 gap-2 px-3 py-2.5 text-white text-xs font-bold">
                <a
                  href={WHATSAPP_TEL}
                  onClick={() => trackContact('landing_sticky_call')}
                  className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl min-h-[52px] bg-white/10 active:bg-white/20"
                >
                  <Phone className="w-5 h-5" />
                  חיוג
                </a>
                <a
                  href={WHATSAPP_OUTDOOR_EVENTS}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('landing_sticky_whatsapp')}
                  className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl min-h-[52px] bg-[#25D366] active:bg-[#1EBE5A]"
                >
                  <WhatsAppIcon />
                  וואטסאפ
                </a>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl min-h-[52px] bg-gradient-to-l from-brand to-[#FF5A1F]"
                >
                  <ClipboardList className="w-5 h-5" />
                  הצעת מחיר
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
