import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Flame, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuCategories = [
  {
    name: 'מנות פתיחה',
    description: 'פתיחה מושלמת לארוחה עשירה',
    image: '/gallery/BarAharon-3097 Large.jpeg',
    items: [
      { 
        name: 'מבחר סלטי הבית', 
        price: '30', 
        description: 'מגוון סלטים טריים ומיוחדים מבית היוצר של השף, מוגשים עם לאפות מהטבון חופשי לסועד אחד, בהזמנת מנה עיקרית', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'מבחר סלטי הבית', 
        price: '40', 
        description: 'מגוון סלטים טריים ומיוחדים מבית היוצר של השף, מוגשים עם לאפות מהטבון חופשי לסועד אחד', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חומוס ביתי מוצר במקום', 
        price: '31', 
        description: 'חומוס קטיפתי טרי מוכן במקום, מוגש עם שמן זית משובח ועשבי תיבול ארומטיים', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'חומוס עם פטריות', 
        price: '36', 
        description: 'חומוס קטיפתי טרי מעוטר בפטריות שמפיניון מוקפצות ברוטב ראגו עשיר', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חומוס עם בשר', 
        price: '37', 
        description: 'חומוס קטיפתי טרי מוכן במקום, מעוטר בבשר בקר טחון מתובל בתיבול ביתי מיוחד', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סלט ירקות קצוץ דק', 
        price: '21', 
        description: 'ירקות טריים קצוצים דק-דק: עגבניות בשלות, מלפפונים ובצל, מתובלים בשמן זית כתית מעולה', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חציל בלאדי', 
        price: '32', 
        description: 'חציל שרוף על האש, מוגש עם שמן זית משובח ועשבי תיבול טריים', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'סביח פיתה אורזאנה', 
        price: '34', 
        description: 'פיתה טרייה מהטאבון במילוי חציל קלוי, ביצה קשה וטחינה משובחת בתיבול פיקנטי', 
        isSpicy: true, 
        isRecommended: false 
      },
      { 
        name: 'פיצה פיתה בקר', 
        price: '56', 
        description: 'פיתה טרייה מהטאבון במילוי בשר בקר טחון משובח, שומן כבש ותערובת עשבי תיבול מיוחדת של השף', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'מחבת פטריות רותחות', 
        price: '54', 
        description: 'פטריות טריות מוקפצות בשמן זית משובח ועשבי תיבול ארומטיים, מוגשות במחבת לוהטת', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'נאגטס עוף', 
        price: '47', 
        description: 'נתחי פילה עוף עסיסיים בציפוי פריך, מוגשים עם מבחר רטבים ביתיים', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'כדורי פירה', 
        price: '43', 
        description: 'כדורי פירה תפוחי אדמה ופטריות שמפיניון בציפוי פריך מושלם', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חירות פירה', 
        price: '32', 
        description: 'חירות פירה תפוחי אדמה ביתיות בתיבול עדין', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'אורז', 
        price: '19', 
        description: 'אורז לבן בתיבול עדין', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'פירה טרי', 
        price: '19', 
        description: 'מחית תפוחי אדמה טרייה בתוספת חמאה', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'צ׳יפס', 
        price: '22/29', 
        description: 'תפוחי אדמה פריכים בחיתוך צ׳יפס, במנה רגילה או גדולה', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'פוטאטוס', 
        price: '29', 
        description: 'קוביות תפוחי אדמה פריכות בתיבול מיוחד של השף', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'צ׳יפס בטטה', 
        price: '35', 
        description: 'רצועות בטטה מטוגנות בציפוי פריך ומושלם', 
        isSpicy: false, 
        isRecommended: false 
      }
    ]
  },
  {
    name: 'בשרים ומנות עיקריות',
    description: 'כל מנות הפריטים מוגשות בליווי צ׳יפס או פירה לבחירה ושתי תוספות חמות מהמזנון',
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
        description: 'משקל לפני חיתוך יחיד - שאל את המלצר (100 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'אנטריקוט פילה בקר', 
        price: '169', 
        description: 'נתח בקר רך, דימום וספטי לא שמן (300 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'פרגית', 
        price: '132', 
        description: 'נתח פרגית טרי (250 גרם)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'צלעות כבש', 
        price: '189', 
        description: 'צלעות כבש טריות (500 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'אנטריקוט צבר אווז גריל', 
        price: '199', 
        description: 'נתח אווז מיוחד (300 גר׳)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סטייק פרגית', 
        price: '78', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'חזה עוף', 
        price: '57', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'המבורגר "הדרומית"', 
        price: '69', 
        description: 'המבורגר 250 גר׳ בתוספת 3: ביצת עין, בצל מקורמל, פטריות מוקפצות', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'כבד עוף מוקפץ עם בצל', 
        price: '71', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'נקניקיות מרגז בקר', 
        price: '59', 
        description: 'נקניקיות בקר (חריפות)', 
        isSpicy: true, 
        isRecommended: false 
      },
      { 
        name: 'סלט עוף ועלים ירוקים', 
        price: '69', 
        description: 'חזה עוף טרי ואיכותי, מוגש עם צ׳יפס', 
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
        name: 'המבורגר (רגיל) עסיסי', 
        price: '68', 
        description: '', 
        isSpicy: false, 
        isRecommended: false 
      },
      { 
        name: 'נפיילה בחוץ צ׳יפס', 
        price: '67', 
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
        description: 'נתח פיקניה מיוחד טרי (250 גרם)', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'היציע הדרומי', 
        price: '129', 
        description: 'המבורגר אמריקאי מובחר מבשר בקר משובח', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'אמריקה בדרומית', 
        price: '141', 
        description: 'המבורגר אמריקאי טרי (200 גר׳), נתח מובחר במיוחד קצוץ', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'דרום אדום', 
        price: '194', 
        description: 'אנטריקוט מיושן מובחר עד אדום', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'אליפות דרומית', 
        price: '179', 
        description: 'מרכזי פילה בקר, מרולין פיקניה מובחר עד אדום', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'סופה דרומית', 
        price: '229', 
        description: 'פילה בקר מובחר עד אדום', 
        isSpicy: false, 
        isRecommended: true 
      },
      { 
        name: 'פלטת קרניבורים', 
        price: '399', 
        description: 'פילה בקר, סטייקים טובל אנטריקוט, נתחי בקר, צלעות כבש (1 ק"ג)', 
        isSpicy: false, 
        isRecommended: true 
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
    items: [
      { name: 'פילה דג דניס', price: '118', description: '' },
      { name: 'פילה סלמון', price: '118', description: '' },
    ]
  },
  {
    name: 'ארוחות ילדים',
    items: [
      { name: 'שניצלוני עוף', price: '65', description: '' },
      { name: 'שיפוד פרגית/כבד עוף/לבבות', price: '65', description: '' },
      { name: 'מיני המבורגר', price: '65', description: '' },
    ]
  },
  {
    name: 'משקאות קלים',
    items: [
      { name: 'קוקה קולה, קולה זירו', price: '14', description: '' },
      { name: 'ספרייט, ספרייט זירו', price: '14', description: '' },
      { name: 'פנטה', price: '14', description: '' },
      { name: 'פריגת משקה קל תפוזים', price: '14', description: '' },
      { name: 'מים בטעמים', price: '14', description: '' },
      { name: 'נביעות מים מינרלים', price: '14', description: '' },
      { name: 'קינלי סודה', price: '14', description: '' },
      { name: 'אקסל', price: '14', description: '' },
      { name: 'לימונדה', price: '14', description: '' },
    ]
  },
  {
    name: 'בירות',
    items: [
      { name: 'קרלסברג בקבוק', price: '25', description: '' },
      { name: 'טובורג אדום בקבוק', price: '25', description: '' },
      { name: 'ווינשטפן בקבוק', price: '27', description: '' },
      { name: 'קורונה בקבוק', price: '27', description: '' },
      { name: 'קרלסברג חבית', price: '25/35', description: '300/500 מ"ל' },
      { name: 'ווינשטפן חבית', price: '27/38', description: '300/500 מ"ל' },
    ]
  },
  {
    name: 'תפריט עסקיות',
    description: 'עסקיות מוגשות עד לשעה 17:00',
    image: '/gallery/BarAharon-3097 Large.jpeg',
    items: [
      { 
        name: 'עסקית דרומית', 
        price: '107', 
        description: 'מבחר סלטים וארוחות מהטאבון\n2 שיפודים לבחירה:\nפרגית / כבד עוף / לבבות עוף / קבב\nסטייק פרגית / חזה עוף\nשניצל / נקניקיות מרגז / המבורגר הדרומית\nכבד עוף מוקפץ עם בצל\nתוספת לבחירה:\nצ׳יפס / אורז / פירה / פוטטוס / סלט ירקות',
        isSpicy: false,
        isRecommended: true
      },
      { 
        name: 'עסקית שיפודים', 
        price: '128', 
        description: 'מבחר סלטים וארוחות מהטאבון\n2 שיפודים לבחירה:\nבשר / אנטריקוט / שומן כבש\nמולארד / פיקניה / פילה בקר\nתוספת לבחירה:\nצ׳יפס / אורז / פירה / פוטטוס / סלט ירקות',
        isSpicy: false,
        isRecommended: true
      }
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