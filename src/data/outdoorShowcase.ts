import { menuCategories } from './menuData';

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

export const MEAT_SHOWCASE = SHOWCASE_CATEGORIES.flatMap(({ menuName, tagline }) => {
  const category = menuCategories.find((c) => c.name === menuName);
  if (!category) return [];
  const items = Array.from(
    new Set(category.items.map((i) => i.name).filter((n) => !EXCLUDED_SHOWCASE_ITEMS.has(n)))
  );
  return [{ name: category.name, tagline, image: category.image, items }];
});
