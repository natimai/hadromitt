import { EMAIL } from './constants';

export type LeadPayload = {
  name: string;
  phone: string;
  date?: string;
  guests?: string;
  location?: string;
  note?: string;
  source: string;
};

/** שולח את פרטי הטופס למייל המסעדה, גם אם הגולש לא לחץ «שליחה» בוואטסאפ */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `פנייה מהאתר — ${payload.source} — ${payload.name}`,
        _template: 'table',
        _captcha: false,
        name: payload.name,
        phone: payload.phone,
        date: payload.date || '',
        guests: payload.guests || '',
        location: payload.location || '',
        note: payload.note || '',
        source: payload.source,
        email: EMAIL,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
