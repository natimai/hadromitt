import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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

const MENU_CATEGORIES = ['בשרים ומנות עיקריות', 'שיפודים בודדים'];

const HIGHLIGHTS = [
  'כשר חלק למהדרין',
  'צלייה במקום, מול האורחים',
  'צוות, ציוד והגשה עלינו',
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
  { src: '/outdoor-events/grill-skewers.jpg', alt: 'שיפודים על המנגל באירוע חוץ של הדרומית' },
  { src: '/outdoor-events/serving-line.jpg', alt: 'עמדת הגשה של הדרומית באירוע חוץ' },
  { src: '/outdoor-events/plated-meats.jpg', alt: 'בשרים מוגשים באירוע חוץ' },
  { src: '/outdoor-events/garden-dinner.jpg', alt: 'שולחנות ערוכים לארוחת ערב בגינה' },
  { src: '/outdoor-events/meat/event-meat-02.jpg', alt: 'שולחנות ערוכים לאירוע בחצר' },
  { src: '/outdoor-events/buffet-tent.jpg', alt: 'מתחם הגשה של הדרומית בשטח פתוח' },
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

function trackContact(label: string) {
  gtagEvent('contact_click', 'conversion', label);
  trackAdsLead();
}

export function OutdoorEventsLanding() {
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
  const menuItems = useMemo(
    () =>
      Array.from(
        new Set(
          menuCategories
            .filter((c) => MENU_CATEGORIES.includes(c.name))
            .flatMap((c) => c.items.filter((i) => i.isRecommended).map((i) => i.name))
        )
      ),
    []
  );

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
    <div className="min-h-screen bg-warmBg text-warmDark pb-20 md:pb-0 overflow-x-clip">
      <Helmet>
        <title>קייטרינג בשרים לאירועי חוץ | כשר חלק | הדרומית</title>
        <meta
          name="description"
          content="קייטרינג בשרים כשר חלק לאירועי חוץ בדרום ובמרכז. הבשרים של מסעדת הדרומית, צלייה במקום וצוות מקצועי. קבלו הצעת מחיר."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <img src="/logo.svg" alt="הדרומית — מסעדת בשרים כשרה" className="h-10 w-auto" />
          <a
            href={WHATSAPP_TEL}
            onClick={() => trackContact('landing_header_call')}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white text-sm font-bold hover:bg-white/20 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </header>

      {/* Hero + form */}
      <section className="relative bg-ink text-white overflow-hidden">
        <img
          src="/gallery/BarAharon-3565-2 Large.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/85 to-ink/50" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-14 lg:pt-28 lg:pb-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 border border-brand/40 px-4 py-1.5 text-sm font-semibold">
              <MapPin className="w-4 h-4 text-brand" />
              מסעדת הדרומית, באר שבע · דרום ומרכז
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
              קייטרינג בשרים לאירועי חוץ.
              <br />
              <span className="text-brand">המסעדה מגיעה אליכם.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl">
              הבשרים של מסעדת הדרומית, צלויים במקום על האש. אנחנו מביאים את הצוות, הציוד וההגשה. אתם נהנים מהאירוע.
            </p>
            <ul className="space-y-2">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 lg:hidden">
              <a href="#form" className="btn-brand">
                קבלו הצעת מחיר
              </a>
              <a
                href={WHATSAPP_TEL}
                onClick={() => trackContact('landing_hero_call')}
                className="btn-outline-light"
              >
                <Phone className="w-5 h-5" />
                התקשרו
              </a>
            </div>
          </div>

          <div id="form" className="scroll-mt-4 min-w-0">
            {leadForm}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-b border-warmDark/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-semibold text-warmDark/80">
          <span className="flex items-center gap-2 justify-center">
            <ShieldCheck className="w-5 h-5 text-brand" /> כשר חלק למהדרין
          </span>
          <span className="flex items-center gap-2 justify-center">
            <UtensilsCrossed className="w-5 h-5 text-brand" /> מסעדה פעילה בבאר שבע
          </span>
          <span className="flex items-center gap-2 justify-center">
            <Flame className="w-5 h-5 text-brand" /> צלייה חיה באירוע
          </span>
          <span className="flex items-center gap-2 justify-center">
            <MapPin className="w-5 h-5 text-brand" /> דרום ומרכז
          </span>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">מה מקבלים</h2>
          <p className="text-center text-warmDark/65 mb-10 max-w-xl mx-auto">
            אירוע בשרים ברמה של מסעדה, בלי שתצטרכו לעמוד ליד המנגל.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INCLUDED.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-warmDark/5 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-1.5">{title}</h3>
                <p className="text-sm text-warmDark/65 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {EVENT_TYPES.map((t) => (
              <span key={t} className="rounded-full bg-white border border-warmDark/10 px-4 py-1.5 text-sm text-warmDark/75">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-16 px-4 sm:px-6 bg-[#180000] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">מה על האש</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            כל מה שיש בתפריט המסעדה מגיע גם לאירוע. התפריט נבנה איתכם, לפי האירוע והתקציב.
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {menuItems.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-gray-200"
              >
                <Flame className="w-3.5 h-3.5 text-brand shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-white/60 text-sm mt-6">ועוד מנות דגל, מנות פתיחה, סלטים ותוספות מהמסעדה.</p>
        </div>
      </section>

      {/* Photos */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-10">מאירועים שעשינו</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PHOTOS.map((p) => (
              <div key={p.src} className="aspect-[4/3] rounded-2xl overflow-hidden bg-warmDark/5">
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 sm:px-6 bg-white border-y border-warmDark/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-10">איך זה עובד</h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-warmDark/65">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-10">
            <a href="#form" className="btn-brand">
              <ClipboardList className="w-5 h-5" />
              לקבלת הצעת מחיר
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-8">שאלות נפוצות</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white rounded-2xl border border-warmDark/10 px-5 py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold">
                  {f.q}
                  <ChevronDown className="w-5 h-5 text-brand shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-warmDark/70 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 bg-ink text-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-center lg:text-right min-w-0">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">בואו נדבר על האירוע שלכם</h2>
            <p className="text-white/75 text-lg">
              השאירו פרטים, או דברו איתנו ישירות בטלפון או בוואטסאפ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={WHATSAPP_TEL}
                onClick={() => trackContact('landing_footer_call')}
                className="btn-outline-light"
              >
                <Phone className="w-5 h-5" />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={WHATSAPP_OUTDOOR_EVENTS}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('landing_footer_whatsapp')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold text-white bg-[#25D366] hover:bg-[#1EBE5A] transition-colors"
              >
                <WhatsAppIcon />
                וואטסאפ
              </a>
            </div>
          </div>
          <div className="min-w-0">{leadForm}</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/50 text-xs py-6 px-4 text-center space-y-2">
        <p>מסעדת הדרומית · {ADDRESS}</p>
        <p className="space-x-3 space-x-reverse">
          <Link to="/accessibility" className="hover:text-white">הצהרת נגישות</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:text-white">מדיניות פרטיות</Link>
        </p>
      </footer>

      {/* Mobile sticky actions */}
      <nav
        aria-label="פעולות מהירות"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-warmDark/95 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-3 gap-1 px-2 py-2 text-white text-xs font-semibold">
          <a
            href={WHATSAPP_TEL}
            onClick={() => trackContact('landing_sticky_call')}
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl min-h-[52px] active:bg-white/15"
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
          <a
            href="#form"
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl min-h-[52px] bg-brand"
          >
            <ClipboardList className="w-5 h-5" />
            הצעת מחיר
          </a>
        </div>
      </nav>
    </div>
  );
}
