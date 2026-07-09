import { useState, FormEvent } from 'react';
import { MessageCircle, Send, Calendar, Users, Phone, User } from 'lucide-react';
import { WHATSAPP_BASE, EMAIL, WHATSAPP_EVENTS } from '../utils/constants';
import { gtagEvent } from '../utils/gtag';
import fbq from '../utils/fbq';

interface EventLeadFormProps {
  variant?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
}

export function EventLeadForm({
  variant = 'light',
  title = 'בקשת הצעת מחיר לאירוע',
  subtitle = 'מלאו פרטים ונחזור אליכם בוואטסאפ עם הצעה מותאמת',
}: EventLeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isDark = variant === 'dark';

  const buildMessage = () => {
    const lines = [
      'שלום, אשמח לקבל פרטים על אירוע / חדר VIP',
      `שם: ${name}`,
      `טלפון: ${phone}`,
      date ? `תאריך מבוקש: ${date}` : null,
      guests ? `מספר אורחים: ${guests}` : null,
      note ? `הערות: ${note}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const trackLead = () => {
    gtagEvent('event_lead', 'conversion', 'events_form');
    try {
      fbq('track', 'Lead', {
        content_name: 'אירוע VIP',
        content_category: 'events',
      });
    } catch {
      // ignore
    }
  };

  const handleWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    trackLead();
    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleEmail = () => {
    if (!name.trim() || !phone.trim()) return;
    trackLead();
    const subject = encodeURIComponent(`פנייה לאירוע — ${name}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass = isDark
    ? 'w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand'
    : 'w-full rounded-xl bg-white border border-warmDark/15 text-warmDark placeholder-warmDark/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand';

  const labelClass = isDark ? 'text-white/80 text-sm font-medium mb-1.5 block' : 'text-warmDark/70 text-sm font-medium mb-1.5 block';

  if (submitted) {
    return (
      <div
        className={`rounded-3xl p-8 text-center ${
          isDark ? 'bg-white/10 text-white' : 'bg-warmBg text-warmDark border border-warmDark/10'
        }`}
      >
        <MessageCircle className="w-12 h-12 text-brand mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold mb-2">תודה! נפתח וואטסאפ</h3>
        <p className={isDark ? 'text-white/70' : 'text-warmDark/70'}>
          השלימו את השליחה בוואטסאפ — נחזור אליכם בהקדם.
        </p>
        <a
          href={WHATSAPP_EVENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brand mt-6"
        >
          פתיחה מחדש בוואטסאפ
        </a>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 ${
        isDark ? 'bg-white/10 border border-white/15' : 'bg-white shadow-xl shadow-warmDark/5 border border-warmDark/5'
      }`}
    >
      <h3 className={`font-display text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-warmDark'}`}>
        {title}
      </h3>
      <p className={`mb-6 ${isDark ? 'text-white/70' : 'text-warmDark/65'}`}>{subtitle}</p>

      <form onSubmit={handleWhatsApp} className="space-y-4">
        <div>
          <label htmlFor="lead-name" className={labelClass}>
            שם מלא *
          </label>
          <div className="relative">
            <User className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/40' : 'text-warmDark/35'}`} />
            <input
              id="lead-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputClass} pr-10`}
              placeholder="השם שלכם"
              autoComplete="name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lead-phone" className={labelClass}>
            טלפון *
          </label>
          <div className="relative">
            <Phone className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/40' : 'text-warmDark/35'}`} />
            <input
              id="lead-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputClass} pr-10`}
              placeholder="050-000-0000"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-date" className={labelClass}>
              תאריך מבוקש
            </label>
            <div className="relative">
              <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/40' : 'text-warmDark/35'}`} />
              <input
                id="lead-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${inputClass} pr-10`}
              />
            </div>
          </div>
          <div>
            <label htmlFor="lead-guests" className={labelClass}>
              מספר אורחים
            </label>
            <div className="relative">
              <Users className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/40' : 'text-warmDark/35'}`} />
              <input
                id="lead-guests"
                type="number"
                min={1}
                max={200}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={`${inputClass} pr-10`}
                placeholder="למשל 40"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="lead-note" className={labelClass}>
            הערות
          </label>
          <textarea
            id="lead-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={inputClass}
            placeholder="סוג אירוע, העדפות תפריט..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="submit" className="btn-brand flex-1">
            <MessageCircle className="w-5 h-5" />
            שליחה בוואטסאפ
          </button>
          <button
            type="button"
            onClick={handleEmail}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-bold transition-colors ${
              isDark
                ? 'border border-white/25 text-white hover:bg-white/10'
                : 'border border-warmDark/15 text-warmDark hover:border-brand hover:text-brand'
            }`}
          >
            <Send className="w-5 h-5" />
            שליחה במייל
          </button>
        </div>
      </form>
    </div>
  );
}
