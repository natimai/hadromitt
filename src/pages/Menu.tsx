import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Flame, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    description: 'פתיחה מושלמת לארוחה עשירה',
    image: '/gallery/BarAharon-3097 Large.jpeg',
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
    description: 'מנות הדגל של השף',
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
    image: '/gallery/BarAharon-3565-2 Large.jpeg',
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
    name: 'שיפודים',
    description: 'על האש בסגנון דרומי אותנטי',
    image: '/gallery/staik or shipud.png',
    items: [
      { name: 'שיפוד פילה בקר', price: '64', description: 'קוביות פילה בקר טרי בתיבול עדין', isSpicy: false, isRecommended: true },
      { name: 'שיפוד פיקניה', price: '59', description: 'נתחי פיקניה מיושנים בתיבול הבית', isSpicy: false, isRecommended: true },
      { name: 'שיפוד אנטריקוט', price: '51', description: 'קוביות אנטריקוט מיושן בתיבול מיוחד', isSpicy: false, isRecommended: false },
      { name: 'שקדים', price: '99', description: 'נתחי בשר רכים במיוחד בתיבול ביתי', isSpicy: false, isRecommended: false },
      { name: 'שיפוד מולארד', price: '54', description: 'נתח בשר מיוחד בתיבול סודי של השף', isSpicy: true, isRecommended: true },
      { name: 'שיפוד שומן כבש', price: '59', description: 'שומן כבש עסיסי בתיבול מסורתי', isSpicy: false, isRecommended: false },
      { name: 'שיפוד כבש', price: '57', description: 'נתחי כבש מובחרים בתיבול מזרחי', isSpicy: false, isRecommended: true },
      { name: 'שיפוד קבב', price: '38', description: 'קבב ביתי עסיסי בתיבול מסורתי', isSpicy: true, isRecommended: false },
      { name: 'שיפוד לבבות עוף', price: '31', description: 'לבבות עוף טריים בתיבול עדין', isSpicy: false, isRecommended: false },
      { name: 'שיפוד כבד עוף', price: '34', description: 'כבדי עוף טריים בתיבול הבית', isSpicy: false, isRecommended: false },
      { name: 'שיפוד כנפיים', price: '31', description: 'כנפי עוף בתיבול חריף-מתוק', isSpicy: true, isRecommended: false },
    ]
  },
  {
    name: 'מנות דגים',
    description: 'דגים טריים מהים',
    image: '/gallery/BarAharon-3097 Large.jpeg',
    items: [
      { name: 'פילה דג דניס', price: '118', description: '', isSpicy: false, isRecommended: false },
      { name: 'פילה סלמון', price: '118', description: '', isSpicy: false, isRecommended: false },
    ]
  },
  {
    name: 'ארוחות ילדים',
    description: 'מנות מיוחדות לילדים',
    image: '/gallery/BarAharon-3097 Large.jpeg',
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
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

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF0000]">התפריט שלנו</h1>
          <p className="text-xl text-gray-300 mb-6">חוויה קולינרית מהמטבח הדרומי</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              to="/contact" 
              className="bg-[#FF0000] text-white px-6 py-3 rounded-full hover:bg-[#CC0000] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              להזמנת מקום
            </Link>
            <Link 
              to="/events" 
              className="bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              לאירועים מיוחדים
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="חיפוש בתפריט..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 bg-[#1A0000]/60 border border-[#FF0000]/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF0000]/50 focus:ring-2 focus:ring-[#FF0000]/20"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </motion.div>

        <div className="grid gap-8">
          <AnimatePresence>
            {filteredCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl shadow-lg"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A0000] via-[#1A0000]/90 to-[#1A0000]/80"></div>
                </div>

                <div className="relative">
                  <motion.button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full p-6 flex justify-between items-center hover:bg-[#FF0000]/5 transition-colors duration-300"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-[#FF0000] mb-2">{category.name}</h2>
                      <p className="text-gray-300">{category.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedCategory === category.name ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-[#FF0000]" size={24} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {(selectedCategory === category.name || searchQuery) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 space-y-6">
                          {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.05 }}
                              className="group relative border-b border-[#FF0000]/10 last:border-0 pb-4 last:pb-0"
                            >
                              <div 
                                onClick={() => toggleItemExpansion(item.name)}
                                className="cursor-pointer"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-semibold text-white group-hover:text-[#FF0000] transition-colors duration-300">
                                        {item.name}
                                      </h3>
                                      {item.isRecommended && (
                                        <Award className="w-5 h-5 text-[#FFD700]" />
                                      )}
                                      {item.isSpicy && (
                                        <Flame className="w-5 h-5 text-[#FF4500]" />
                                      )}
                                    </div>
                                    <AnimatePresence>
                                      {(expandedItems.includes(item.name) || searchQuery) && (
                                        <motion.p
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="text-gray-400 text-sm mt-2"
                                        >
                                          {item.description}
                                        </motion.p>
                                      )}
                                    </AnimatePresence>
                      </div>
                                  <div className="flex items-center gap-4">
                                    <span className="text-[#FF0000] font-medium text-lg">₪{item.price}</span>
                                    <motion.div
                                      animate={{ rotate: expandedItems.includes(item.name) ? 180 : 0 }}
                                      className="text-[#FF0000]/50"
                                    >
                                      <ChevronDown size={16} />
                    </motion.div>
                                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FFD700]" />
            <span>מומלץ השף</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#FF4500]" />
            <span>פיקנטי</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}