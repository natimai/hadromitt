import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Flame, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import fbq from '../utils/fbq';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  isSpicy: boolean;
  isRecommended: boolean;
}

interface MenuCategory {
  name: string;
  description: string;
  image: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    name: 'תפריט עסקיות',
    description: 'עסקיות מוגשות עד לשעה 17:00 | ניתן לשדרג את התוספות לצ׳יפס בטטה בתוספת 5 ש״ח לעסקית',
    image: '/gallery/BarAharon-3097 Large.jpeg',
    items: [
      { 
        name: 'עסקית דרומית', 
        price: '107', 
        description: '* מבחר סוגי סלטים ולאפות מהטאבון\n* 2 שיפודים לבחירה מתוך: פרגיות / כבד עוף / לבבות עוף / קבב / שישליק הודו / סטייק פרגית / חזה עוף / שניצל / נקניקיות מרגז / המבורגר הדרומית / כבד עוף מוקפץ עם בצל\n* תוספת לבחירה: צ׳יפס / אורז / פירה / פירה בטטה / סלט ירקות',
        isSpicy: false,
        isRecommended: true
      },
      { 
        name: 'עסקית שיפודים', 
        price: '128', 
        description: '* מבחר סוגי סלטים ולאפות מהטאבון\n* 2 שיפודים לבחירה מתוך: כבש / אנטריקוט / שומן כבש / מולארד / פיקניה / פילה בקר\n* תוספת לבחירה: צ׳יפס / אורז / פירה / פירה בטטה / סלט ירקות',
        isSpicy: false,
        isRecommended: true
      },
      { 
        name: 'עסקית דגים', 
        price: '128', 
        description: '* מבחר סוגי סלטים ולאפות מהטאבון\n* פילה דניס / פילה סלמון\n* תוספת לבחירה: צ׳יפס / אורז / פירה / פירה בטטה / סלט ירקות',
        isSpicy: false,
        isRecommended: false
      },
      { 
        name: 'עסקית בשרים', 
        price: '171', 
        description: '* מבחר סוגי סלטים ולאפות מהטאבון\n* סטייק אנטריקוט 350 ג׳ / מדליוני פילה בקר / נתח קצבים\n* תוספת לבחירה: צ׳יפס / אורז / פירה / פירה בטטה / סלט ירקות',
        isSpicy: false,
        isRecommended: true
      },
      { 
        name: 'עסקית פרימיום', 
        price: '209', 
        description: '* מבחר סוגי סלטים ולאפות מהטאבון\n* עיקרית לבחירה: צלעות כבש / סטייק עגל 500 גר׳ / דרום אדום / סופה דרומית / אליפות דרומית\n* תוספת לבחירה: צ׳יפס / אורז / פירה / פירה בטטה / סלט ירקות',
        isSpicy: false,
        isRecommended: true
      },
      { 
        name: 'עסקית קרניבורים', 
        price: '399', 
        description: '* מבחר סוגי סלטים ולאפות מהטאבון\n* עיקרית: קרניבורים (מינימום 2 סועדים) - פילה בקר, סלייסים של אנטריקוט, נתחי כבד אווז, צלעות כבש (1 ק"ג)\n* 2 תוספות לבחירה: צ׳יפס / אורז / פירה / פירה בטטה / סלט ירקות',
        isSpicy: false,
        isRecommended: true
      }
    ]
  },
  {
    name: 'מנות פתיחה',
    description: 'מבחר מנות ראשונות מעשה ידי השף',
    image: '/gallery/BarAharon-3333 Large.jpeg',
    items: [
      { 
        name: 'מבחר סלטי הבית', 
        price: '30', 
        description: 'מבחר סלטי הבית, לאפות מהטבון חופשי לסועד אחד, בהזמנת מנה עיקרית לסועד (2 שיפודים מינימום) 15 סוגי סלטים שונים שנעשים במקום מידי יום. ילדים עד גיל 6 אוכלים חופשי ללא תשלום בהזמנת מנה עיקרית / ילדים', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'מבחר סלטי הבית ללא מנה עיקרית', 
        price: '40', 
        description: 'מבחר סלטי הבית, לאפות מהטבון חופשי ללא מנה עיקרית, לסועד אחד', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חומוס הדרומית', 
        price: '31', 
        description: 'חומוס ביתי מיוצר במקום, גרגירי חומוס, טחינה ושמן זית', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'חומוס עם כדורי פלאפל', 
        price: '36', 
        description: 'חומוס ביתי מיוצר במקום, כדורי פלאפל (6 יח׳)', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חומוס פטריות', 
        price: '37', 
        description: 'חומוס ביתי מיוצר במקום, פטריות שמפיניון מוקפצות עם בצל', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'כדורי פלאפל עם טחינה', 
        price: '28', 
        description: '12 יחידות', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'סלט ירקות קצוץ דק', 
        price: '21', 
        description: 'עגבניה, מלפפון ובצל בחיתוך במקום בתיבול מלח, מיץ לימון ושמן זית', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חציל בלאדי', 
        price: '32', 
        description: 'מוגש עם צ׳ימיצ׳ורי וקונפי שום עם שמן זית ולימון', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'פסטייה אודיסאה', 
        price: '34', 
        description: 'פסטייה מרוקאית במלית כבד עוף בעיטור אבקת סוכר וסילאן', 
        isSpicy: true, 
        isRecommended: false 
      },
      { 
        name: 'קארפצ׳יו פילה בקר', 
        price: '56', 
        description: 'שמן זית, בלסמי מצומצם, קונפי שום, שבבי בטטה ועלי מיקרו', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'מחבת פטריות רותחות', 
        price: '54', 
        description: 'שום, שמן ועשבי טיבול', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'עראיס', 
        price: '46', 
        description: 'סוכריות עראיס ממולא קבב טלה, צלויה על הגריל מוגשת עם טחינה וסלט עגבניות חריף', 
        isSpicy: true, 
        isRecommended: true 
      },
      { 
        name: 'נאגטס עוף', 
        price: '38', 
        description: 'פילה עוף בציפוי פצפוצי אורז ושומשום', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'דואט כרובית ופטריות', 
        price: '43', 
        description: 'שמפיניון בציפוי פריך רוטב צ׳ילי מתוק וטחינה', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'כדורי פירה', 
        price: '32', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'אורז', 
        price: '19', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'פירה תפו״א', 
        price: '19', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'צ׳יפס', 
        price: '22/29', 
        description: 'גדול / קטן', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'פוטאטוס', 
        price: '29', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'הום פרייז ברוטב צ׳ילי מתוק', 
        price: '29', 
        description: '', 
        isSpicy: true, 
        isRecommended: false 
      },
      { 
        name: 'צ׳יפס בטטה', 
        price: '35', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      }
    ]
  },
  {
    name: 'המיוחדים שלנו',
    description: 'מנות הדגל של השף, הבאים בגדלים הנכונים לחבורה',
    image: '/gallery/BarAharon-3402 Large.jpeg',
    items: [
      { 
        name: 'סטייק פיקניה', 
        price: '134', 
        description: 'נתח פיקניה ארגנטינאית טריה (250 גרם)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'היציע הדרומי', 
        price: '129', 
        description: 'המבורגר אנטריקוט ומדליון כבד אווז', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'אמריקה דרומית', 
        price: '141', 
        description: 'נתח קצבים אמריקאי טרי (200 גר׳), נתח מובחר במליחות קלה', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'דרום אדום', 
        price: '194', 
        description: 'אנטריקוט מיושן ומדליון כבד אווז', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'אליפות דרומית', 
        price: '179', 
        description: 'מדליון פילה בקר, מדליון סינטה ומדליון כבד אווז', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סופה דרומית', 
        price: '229', 
        description: 'פילה בקר ומדליוני כבד אווז', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'קרניבורים', 
        price: '399', 
        description: 'פילה בקר, סלייסים של אנטריקוט, נתחי כבד אווז, צלעות כבש (1 ק"ג)', 
        isSpicy: false, 
        isRecommended: true 
      }
    ]
  },
  {
    name: 'בשרים ומנות עיקריות',
    description: 'כל מנות הפרימיום מוגשות בליווי של רוטב יין, קרם בטטה וקונפי שום למעט המבורגר',
    image: '/gallery/BarAharon-3287 Large.jpeg',
    items: [
      { 
        name: 'סטייק אנטריקוט ארגנטינאי', 
        price: '134', 
        description: 'נתח אנטריקוט משובח מיושן במקום (250 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סטייק אנטריקוט ארגנטינאי', 
        price: '154', 
        description: 'נתח אנטריקוט משובח מיושן במקום (350 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סטייק עגל טרי', 
        price: '190', 
        description: 'נתח עגל טרי משובח (500 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סטייק טומהוק אמריקאי עם עצם', 
        price: '31', 
        description: 'משקל נקבע לפי חיתוך יומי - שאל את המלצר (100 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'מדליוני פילה בקר', 
        price: '169', 
        description: 'נתח רך, נימוח ועסיסי ללא שומן (300 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סינטה', 
        price: '132', 
        description: 'נתח סינטה טרי (250 גרם)', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'צלעות כבש', 
        price: '189', 
        description: 'צלעות כבש טריות (500 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'מדליוני כבד אווז בגריל', 
        price: '199', 
        description: 'נתח כבד אווז מיוחד (300 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סטייק פרגית', 
        price: '78', 
        description: 'נתח פרגית טרי ועסיסי', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חזה עוף', 
        price: '57', 
        description: 'חזה עוף טרי על הגריל', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'המבורגר "הדרומית"', 
        price: '69', 
        description: 'המבורגר 250 גר׳ | לתוספות מפנקות שאל את המלצר', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'כבד עוף מוקפץ עם בצל', 
        price: '71', 
        description: 'כבד עוף טרי מוקפץ עם בצל מקורמל', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'נקניקיות מרגז בקר', 
        price: '59', 
        description: 'נקניקיות בקר חריפות', 
        isSpicy: true, 
        isRecommended: false 
      },
      { 
        name: 'סלט עוף ועלים ירוקים', 
        price: '69', 
        description: 'מוגש עם רטבים', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'שניצל', 
        price: '59', 
        description: 'חזה עוף טרי בציפוי קריספי, מוגש עם צ׳יפס', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'המבורגר ביונד טבעוני', 
        price: '68', 
        description: 'המבורגר מן הצומח בסגנון בשר', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'כנפיים ברוטב צ׳ילי', 
        price: '67', 
        description: 'כנפי עוף בציפוי פריך ברוטב צ׳ילי מתקתק', 
        isSpicy: true, 
        isRecommended: false 
      }
    ]
  },
  {
    name: 'ארוחות ילדים',
    description: 'מנות לקטנטנים עד גיל 10 | מגיעות עם צ׳יפס ושתייה קלה או מיץ תפוזים',
    image: '/gallery/BarAharon-3044 Large.jpeg',
    items: [
      { name: 'שניצלוני עוף', price: '65', description: '', isSpicy: false, isRecommended: false },
      { name: 'שיפוד פרגית/כבד עוף/לבבות', price: '65', description: '', isSpicy: false, isRecommended: false },
      { name: 'מיני המבורגר', price: '65', description: '', isSpicy: false, isRecommended: false },
    ]
  },
  {
    name: 'משקאות קלים',
    description: 'משקאות קרים ומרעננים',
    image: '/gallery/BarAharon-3097 Large.jpeg',
    items: [
      { name: 'קוקה קולה', price: '14', description: 'קוקה קולה, קולה קולה זירו, דיאט קוקה קולה', isSpicy: false, isRecommended: false },
      { name: 'ספרייט', price: '14', description: 'ספרייט, זירו ספרייט', isSpicy: false, isRecommended: false },
      { name: 'פנטה', price: '14', description: '', isSpicy: false, isRecommended: false },
      { name: 'פריגת משקה קל', price: '14', description: 'תפוזים, לימונענע, אשכוליות', isSpicy: false, isRecommended: false },
      { name: 'פריגת משקה קל', price: '14', description: 'ענבים, תות בננה', isSpicy: false, isRecommended: false },
      { name: 'פריגת 100%', price: '14', description: 'תפוחים - סיידר', isSpicy: false, isRecommended: false },
      { name: 'מאלטי בירה שחורה', price: '14', description: '', isSpicy: false, isRecommended: false },
      { name: 'פיוז-טי', price: '14', description: 'אפרסק, פירות יער', isSpicy: false, isRecommended: false },
      { name: 'נביעות בטעמים עדינים', price: '14', description: 'תפוחים, אפרסק, ענבים', isSpicy: false, isRecommended: false },
      { name: 'נביעות מים מינרלים', price: '14', description: '', isSpicy: false, isRecommended: false },
      { name: 'לימונענע גרוס', price: '19', description: '', isSpicy: false, isRecommended: false },
      { name: 'לימונדה', price: '14/25', description: '', isSpicy: false, isRecommended: false },
      { name: 'קינלי סודה', price: '14', description: '', isSpicy: false, isRecommended: false }
    ]
  },
  {
    name: 'תוספות',
    description: 'תוספות טעימות למנות הראשיות',
    image: '/gallery/BarAharon-3142 Large.jpeg',
    items: [
      { name: 'צ׳יפס', price: '22/29', description: 'גדול / קטן', isSpicy: false, isRecommended: false },
      { name: 'צ׳יפס בטטה', price: '35', description: '', isSpicy: false, isRecommended: false },
      { name: 'פוטאטוס', price: '29', description: 'תפוחי אדמה פריכים בתיבול מיוחד', isSpicy: false, isRecommended: false },
      { name: 'הום פרייז ברוטב צ׳ילי מתוק', price: '29', description: '', isSpicy: true, isRecommended: false },
      { name: 'אורז', price: '19', description: 'אורז לבן בסגנון ביתי', isSpicy: false, isRecommended: false },
      { name: 'פירה תפו״א', price: '19', description: 'פירה תפוחי אדמה חלק וקרמי', isSpicy: false, isRecommended: false },
      { name: 'פירה בטטה', price: '25', description: 'פירה בטטה קרמי במרקם עשיר', isSpicy: false, isRecommended: false },
      { name: 'סלט ירקות קצוץ', price: '21', description: '', isSpicy: false, isRecommended: false },
      { name: 'כדורי פירה', price: '32', description: 'כדורי פירה תפוחי אדמה מטוגנים', isSpicy: false, isRecommended: false }
    ]
  },
  {
    name: 'שתיה קלה',
    description: 'מבחר משקאות קרים ומרעננים',
    image: '/gallery/BarAharon-3087 Large.jpeg',
    items: [
      { name: 'קוקה קולה', price: '14', description: 'קוקה קולה, קולה קולה זירו, דיאט קוקה קולה', isSpicy: false, isRecommended: false },
      { name: 'ספרייט', price: '14', description: 'ספרייט, זירו ספרייט', isSpicy: false, isRecommended: false },
      { name: 'פנטה', price: '14', description: '', isSpicy: false, isRecommended: false },
      { name: 'פריגת משקה קל', price: '14', description: 'תפוזים, לימונענע, אשכוליות', isSpicy: false, isRecommended: false },
      { name: 'פריגת משקה קל', price: '14', description: 'ענבים, תות בננה', isSpicy: false, isRecommended: false },
      { name: 'פריגת 100%', price: '14', description: 'תפוחים - סיידר', isSpicy: false, isRecommended: false },
      { name: 'מאלטי בירה שחורה', price: '14', description: '', isSpicy: false, isRecommended: false },
      { name: 'פיוז-טי', price: '14', description: 'אפרסק, פירות יער', isSpicy: false, isRecommended: false },
      { name: 'נביעות בטעמים עדינים', price: '14', description: 'תפוחים, אפרסק, ענבים', isSpicy: false, isRecommended: false },
      { name: 'נביעות מים מינרלים', price: '14', description: '', isSpicy: false, isRecommended: false },
      { name: 'לימונענע גרוס', price: '19', description: '', isSpicy: false, isRecommended: false },
      { name: 'לימונדה', price: '14/25', description: 'כוס / קנקן', isSpicy: false, isRecommended: false },
      { name: 'קינלי סודה', price: '14', description: '', isSpicy: false, isRecommended: false }
    ]
  },
  {
    name: 'אלכוהול',
    description: 'מבחר משקאות אלכוהוליים',
    image: '/gallery/BarAharon-3235 Large.jpeg',
    items: [
      { name: 'ג׳ין גורדונ׳ס', price: '34', description: '', isSpicy: false, isRecommended: false },
      { name: 'ג׳ין ביפיטר', price: '36', description: '', isSpicy: false, isRecommended: false },
      { name: 'וודקה סמירנוף', price: '34', description: '', isSpicy: false, isRecommended: false },
      { name: 'וודקה סמירנוף דאבל', price: '47', description: '', isSpicy: false, isRecommended: false },
      { name: 'וודקה קטל וואן', price: '37', description: '', isSpicy: false, isRecommended: false },
      { name: 'וודקה קטל וואן דאבל', price: '57', description: '', isSpicy: false, isRecommended: false },
      { name: 'וודקה גריי גוס', price: '45', description: '', isSpicy: false, isRecommended: false },
      { name: 'וודקה גריי גוס דאבל', price: '74', description: '', isSpicy: false, isRecommended: false },
      { name: 'קפטן מורגן', price: '32', description: '', isSpicy: false, isRecommended: false },
      { name: 'קפטן מורגן דאבל', price: '48', description: '', isSpicy: false, isRecommended: false },
      { name: 'בקארדי', price: '34', description: '', isSpicy: false, isRecommended: false },
      { name: 'בקארדי דאבל', price: '47', description: '', isSpicy: false, isRecommended: false },
      { name: 'ג׳יימסון', price: '40', description: '', isSpicy: false, isRecommended: false },
      { name: 'בושמילס', price: '38', description: '', isSpicy: false, isRecommended: false }
    ]
  },
  {
    name: 'קינוחים',
    description: 'קינוחים מפנקים לסיום הארוחה',
    image: '/gallery/BarAharon-3114 Large.jpeg',
    items: [
      { name: 'פאי תפוחים חם', price: '45', description: 'מוגש עם כדור גלידה וניל', isSpicy: false, isRecommended: true },
      { name: 'סופלה שוקולד', price: '45', description: 'עם גלידה וניל', isSpicy: false, isRecommended: true },
      { name: 'צלחת בראוניז', price: '42', description: 'בראוניז שוקולד חמים', isSpicy: false, isRecommended: false },
      { name: 'מלבי', price: '38', description: 'עם סירופ רוזטה וקוקוס קלוי', isSpicy: false, isRecommended: false },
      { name: 'קינוח הדרומית', price: '49', description: 'קינוח מיוחד של השף - חם עם גלידה וניל', isSpicy: false, isRecommended: true }
    ]
  },
  {
    name: 'בירות',
    description: 'מבחר בירות מהחבית ובבקבוק',
    image: '/gallery/BarAharon-3097 Large.jpeg',
    items: [
      { name: 'קרלסברג בקבוק', price: '25', description: '', isSpicy: false, isRecommended: false },
      { name: 'טובורג אדום בקבוק', price: '25', description: '', isSpicy: false, isRecommended: false },
      { name: 'ווינשטפן בקבוק', price: '27', description: '', isSpicy: false, isRecommended: false },
      { name: 'קורונה בקבוק', price: '27', description: '', isSpicy: false, isRecommended: false },
      { name: 'קרלסברג חבית', price: '25/35', description: '300/500 מ"ל', isSpicy: false, isRecommended: false },
      { name: 'ווינשטפן חבית', price: '27/38', description: '300/500 מ"ל', isSpicy: false, isRecommended: false }
    ]
  },
  {
    name: 'יינות וקאווה',
    description: 'מבחר יינות משובחים',
    image: '/gallery/BarAharon-3097 Large.jpeg',
    items: [
      { name: 'יתיר הר עמשא אדום', price: '41/189', description: 'יין אדום יבש', isSpicy: false, isRecommended: true },
      { name: 'דרום אדום', price: '33/138', description: 'יין אדום יבש', isSpicy: false, isRecommended: true },
      { name: 'יתיר הר עמשא לבן', price: '41/189', description: 'יין לבן יבש', isSpicy: false, isRecommended: true },
      { name: 'דרום לבן', price: '33/138', description: 'יין לבן יבש', isSpicy: false, isRecommended: false },
      { name: 'דרום רוזה', price: '33/138', description: 'יין רוזה יבש', isSpicy: false, isRecommended: false }
    ]
  }
];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(menuCategories[0].name);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // SEO optimization for menu page
  useEffect(() => {
    document.title = 'תפריט - הדרומית מסעדה בבאר שבע | מסעדת בשרים כשר חלק מומלצת';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'תפריט מסעדת הדרומית - מסעדה מומלצת בבאר שבע. מסעדת בשרים כשר חלק עם תפריט עשיר: סטייקים, שיפודים, עסקיות ומנות מיוחדות. מחירים אטרקטיביים ומנות טעימות במסעדה הטובה ביותר בבאר שבע.');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleItemExpansion = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const filteredCategories = menuCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  useEffect(() => {
    // Track menu page view
    fbq('track', 'ViewContent', {
      content_type: 'menu',
      content_name: 'תפריט הדרומית'
    });
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-[#FF0000]">תפריט הדרומית - מסעדה בבאר שבע</h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">מסעדת בשרים כשר חלק מומלצת - תפריט עשיר ומגוון</p>
          
          {/* כפתורי הזמנה ואירועים */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link 
              to="/contact" 
              className="group relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium rounded-full transition duration-300 ease-out border-2 border-[#FF0000] text-white shadow-md"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-[#FF0000] group-hover:w-full transition-all duration-300 ease-out"></span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">להזמנת מקום</span>
              <span className="relative invisible">להזמנת מקום</span>
            </Link>
            <Link 
              to="/events" 
              className="group relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium rounded-full transition duration-300 ease-out border-2 border-white/20 text-white shadow-md"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-white/10 group-hover:w-full transition-all duration-300 ease-out"></span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">לאירועים מיוחדים</span>
              <span className="relative invisible">לאירועים מיוחדים</span>
            </Link>
          </div>
          
          {/* סרגל חיפוש */}
          <div className="relative max-w-md mx-auto mb-6 sm:mb-12">
            <motion.div
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="text"
                placeholder="חיפוש בתפריט..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 bg-[#1A0000]/60 border border-[#FF0000]/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF0000]/50 focus:ring-2 focus:ring-[#FF0000]/20"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </motion.div>
          </div>

          {/* כפתור פתיחת תפריט קטגוריות במובייל */}
          <div className="md:hidden mb-4">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-between w-full px-4 py-3 bg-[#FF0000] rounded-lg text-white font-bold"
            >
              <span>{selectedCategory || 'בחר קטגוריה'}</span>
              <ChevronDown className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} size={20} />
            </motion.button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-[#1A0000] rounded-b-lg border border-[#FF0000]/20 shadow-xl z-20"
                >
                  <div className="flex flex-col p-2 max-h-60 overflow-y-auto">
                    {menuCategories.map((category) => (
                      <motion.button
                        key={`mobile-${category.name}`}
                        onClick={() => toggleCategory(category.name)}
                        className={`px-4 py-3 text-right rounded-lg mb-1 transition-all ${
                          selectedCategory === category.name 
                            ? 'bg-[#FF0000]/20 text-white font-bold' 
                            : 'text-white/80 hover:bg-white/5'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* לשוניות קטגוריה למסכים גדולים */}
          <div className="hidden md:block overflow-x-auto py-4 mb-8 scrollbar-hide">
            <motion.div 
              className="flex gap-2 md:gap-4 justify-center min-w-max px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {menuCategories.map((category) => (
                <motion.button
                  key={category.name}
                  onClick={() => toggleCategory(category.name)}
                  className={`relative px-5 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.name 
                      ? 'bg-[#FF0000] text-white font-bold' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                  {selectedCategory === category.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* הצגת התפריט */}
        <AnimatePresence mode="wait">
          {filteredCategories.map((category) => (
            ((selectedCategory === category.name && searchQuery === '') || searchQuery !== '') && (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#1A0000]/90 via-[#1A0000]/60 to-[#1A0000]/80 backdrop-blur-lg mb-6"
              >
                {/* כותרת קטגוריה */}
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{category.name}</h2>
                    <p className="text-white/80 text-sm sm:text-lg">{category.description}</p>
                  </div>
                </div>

                {/* פריטי תפריט */}
                <div className="p-3 sm:p-6 grid gap-3 sm:gap-6 md:grid-cols-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.03 }}
                      className={`relative group p-3 sm:p-4 rounded-xl transition-all duration-300 border border-transparent ${
                        expandedItems.includes(item.name) ? 'bg-white/5 shadow-lg backdrop-blur-sm border-white/10' : 'hover:bg-white/5'
                      }`}
                      onClick={() => toggleItemExpansion(item.name)}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            <h3 className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${expandedItems.includes(item.name) ? 'text-[#FF0000]' : 'text-white'}`}>
                              {item.name}
                            </h3>
                            <div className="flex">
                              {item.isRecommended && (
                                <motion.div className="p-0.5">
                                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
                                </motion.div>
                              )}
                              {item.isSpicy && (
                                <motion.div className="p-0.5">
                                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4500]" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                          <AnimatePresence>
                            {(expandedItems.includes(item.name) || searchQuery) && item.description && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-gray-300 text-xs sm:text-sm mt-2 sm:mt-3 whitespace-pre-line leading-relaxed">
                                  {item.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-bold px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base"
                          >
                            ₪{item.price}
                          </motion.div>
                          <motion.div
                            animate={{ rotate: expandedItems.includes(item.name) ? 180 : 0 }}
                            className="text-white"
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* אפקט מרצד למנות מומלצות */}
                      {item.isRecommended && (
                        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                          <motion.div
                            className="absolute inset-0 bg-[#FFD700]/5 rounded-xl"
                            animate={{ 
                              scale: [1, 1.05, 1],
                              opacity: [0, 0.2, 0]
                            }}
                            transition={{ 
                              repeat: Infinity,
                              duration: 3
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* כפתור חזרה למעלה במובייל */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 md:hidden"
            >
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-[#FF0000] text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronUp size={24} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* אינדיקטור לקטגוריה נוכחית במובייל */}
        <div className="fixed top-16 left-0 z-10 md:hidden p-2 bg-gradient-to-r from-[#FF0000] to-transparent">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-bold text-sm flex items-center"
          >
            <span className="mr-1">{selectedCategory}</span>
          </motion.div>
        </div>

        {/* מקרא */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 sm:mt-12 bg-[#1A0000]/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm sm:text-base"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-2 bg-[#FFD700]/10 rounded-full">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
            </div>
            <span className="text-white">מומלץ השף</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-2 bg-[#FF4500]/10 rounded-full">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4500]" />
            </div>
            <span className="text-white">פיקנטי</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-2 bg-[#FF0000]/10 rounded-full">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-white">הקש לפרטים</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}