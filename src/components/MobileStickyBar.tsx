import { Calendar, Phone, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  TABIT_RESERVATION_URL,
  PHONE_TEL,
  WHATSAPP_RESERVE,
  WHATSAPP_EVENTS,
  WHATSAPP_OUTDOOR_EVENTS,
} from '../utils/constants';
import { trackReservationClick, gtagEvent } from '../utils/gtag';

export function MobileStickyBar() {
  const { pathname } = useLocation();
  const isOutdoor = pathname === '/outdoor-events';
  const isEvents = pathname === '/events';

  const whatsappHref = isOutdoor
    ? WHATSAPP_OUTDOOR_EVENTS
    : isEvents
      ? WHATSAPP_EVENTS
      : WHATSAPP_RESERVE;

  const whatsappLabel = isOutdoor || isEvents ? 'אירוע' : 'וואטסאפ';
  const whatsappTrack = isOutdoor
    ? 'mobile_sticky_whatsapp_outdoor'
    : isEvents
      ? 'mobile_sticky_whatsapp_events'
      : 'mobile_sticky_whatsapp';

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-warmDark/95 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
      role="navigation"
      aria-label="פעולות מהירות"
    >
      <div className="grid grid-cols-3 gap-1 px-2 py-2">
        <a
          href={PHONE_TEL}
          onClick={() => gtagEvent('call_click', 'engagement', 'mobile_sticky_call')}
          className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-white hover:bg-white/10 active:bg-white/15 touch-manipulation min-h-[52px]"
        >
          <Phone className="w-5 h-5 text-brand" />
          <span className="text-xs font-medium">התקשר</span>
        </a>
        {isOutdoor ? (
          <a
            href="#quote"
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark active:scale-[0.98] touch-manipulation min-h-[52px] shadow-lg shadow-brand/30"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-bold">הצעת מחיר</span>
          </a>
        ) : isEvents ? (
          <Link
            to="/outdoor-events"
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark active:scale-[0.98] touch-manipulation min-h-[52px] shadow-lg shadow-brand/30"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-bold">אירועי חוץ</span>
          </Link>
        ) : (
          <a
            href={TABIT_RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReservationClick('mobile_sticky_tabit')}
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark active:scale-[0.98] touch-manipulation min-h-[52px] shadow-lg shadow-brand/30"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-bold">הזמן שולחן</span>
          </a>
        )}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => gtagEvent('whatsapp_click', 'engagement', whatsappTrack)}
          className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-white hover:bg-white/10 active:bg-white/15 touch-manipulation min-h-[52px]"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <span className="text-xs font-medium">{whatsappLabel}</span>
        </a>
      </div>
    </div>
  );
}
