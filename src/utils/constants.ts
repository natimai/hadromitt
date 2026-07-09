/** Shared contact & conversion URLs for הדרומית */

export const TABIT_RESERVATION_URL =
  'https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation';

export const PHONE_DISPLAY = '079-674-4711';
export const PHONE_TEL = 'tel:0796744711';
export const PHONE_E164 = '972796744711';

export const EMAIL = 'info@hadromit.co.il';
export const ADDRESS = 'רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע';

export const WHATSAPP_BASE = `https://wa.me/${PHONE_E164}`;

export const WHATSAPP_RESERVE = `${WHATSAPP_BASE}?text=${encodeURIComponent('שלום, אני מעוניין להזמין מקום')}`;
export const WHATSAPP_EVENTS = `${WHATSAPP_BASE}?text=${encodeURIComponent('שלום, אשמח לקבל פרטים על אירוע / חדר VIP')}`;

/** Canonical opening hours (aligned with Contact / FAQ) */
export const HOURS_SHORT = "א'-ד': 12:00–23:00 | ה': 12:00–00:00 | מוצ\"ש: מצאת שבת–00:00";

export const HOURS_LINES = [
  "ראשון–רביעי: 12:00–23:00",
  "חמישי: 12:00–00:00",
  'מוצאי שבת: שעה לאחר צאת השבת עד 00:00',
  'סגורים בשבת',
] as const;

export const VIP_POPUP_STORAGE_KEY = 'hadromit_vip_popup_dismissed';
