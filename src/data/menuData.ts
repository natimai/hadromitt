
export interface MenuItem {
  name: string;
  price: string;
  description: string;
  isSpicy: boolean;
  isRecommended: boolean;
}

export interface MenuCategory {
  name: string;
  description: string;
  image: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
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
        price: '450', 
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
        price: '219', 
        description: 'אנטריקוט מיושן ומדליון כבד אווז', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'אליפות דרומית', 
        price: '189', 
        description: 'מדליון פילה בקר, מדליון סינטה ומדליון כבד אווז', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סופה דרומית', 
        price: '249', 
        description: 'פילה בקר ומדליוני כבד אווז', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'קרניבורים', 
        price: '450', 
        description: 'פילה בקר, סלייסים של אנטריקוט, נתחי כבד אווז, צלעות כבש (1 ק"ג)', 
        isSpicy: false, 
        isRecommended: true 
      }
    ]
  },
  {
    name: 'שיפודים בודדים',
    description: 'שיפודים איכותיים על האש - מגוון בשרים טריים',
    image: '/gallery/BarAharon-3565-2 Large.jpeg',
    items: [
      { 
        name: 'שיפוד פילה בקר', 
        price: '82', 
        description: 'שיפוד פילה בקר רך ועסיסי', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'שיפוד אנטריקוט', 
        price: '69', 
        description: 'שיפוד אנטריקוט עסיסי', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'שיפוד כבש', 
        price: '67', 
        description: 'שיפוד כבש טרי', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'שיפוד שומן כבש', 
        price: '66', 
        description: 'שיפוד שומן כבש עסיסי', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'שיפוד מולארד', 
        price: '72', 
        description: 'שיפוד חזה מולארד', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'שיפוד פיקניה', 
        price: '63', 
        description: 'שיפוד פיקניה ארגנטינאית', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'שקדים', 
        price: '119', 
        description: 'שיפוד שקדים מיוחד', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'שיפוד פרגית', 
        price: '39', 
        description: 'שיפוד פרגית עסיסי', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'שיפוד שישליק הודו', 
        price: '39', 
        description: 'שיפוד שישליק הודו', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'שיפוד קבב', 
        price: '38', 
        description: 'שיפוד קבב מתובל', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'שיפוד כבד עוף', 
        price: '34', 
        description: 'שיפוד כבד עוף טרי', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'שיפוד לבבות עוף', 
        price: '31', 
        description: 'שיפוד לבבות עוף', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'שיפוד כנפיים', 
        price: '31', 
        description: 'שיפוד כנפי עוף פריכות', 
        isSpicy: false, 
        isRecommended: false 
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
        price: '154', 
        description: 'נתח אנטריקוט משובח מיושן במקום (250 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סטייק אנטריקוט ארגנטינאי', 
        price: '174', 
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
        price: '189', 
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
        price: '199', 
        description: 'צלעות כבש טריות (500 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'מדליוני כבד אווז בגריל', 
        price: '219', 
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
