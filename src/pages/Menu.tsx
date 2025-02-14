import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const menuCategories = [
  {
    name: 'מנות ראשונות',
    items: [
      { name: 'מבחר סלטי הבית', price: '30', description: 'לאפות מהטבון חופשי לסועד אחד, בהזמנת מנה עיקרית לסועד' },
      { name: 'חומוס עם פטריות', price: '37', description: '' },
      { name: 'סלט ירקות קצוץ דק', price: '21', description: '' },
      { name: 'מחבת פטריות רותחות', price: '54', description: '' },
      { name: 'נאגטס עוף', price: '47', description: '' },
      { name: 'פוטאטוס', price: '29', description: '' },
      { name: 'הום פרייז', price: '29', description: '' },
      { name: 'צ׳יפס בטטה', price: '35', description: '' },
    ]
  },
  {
    name: 'מנות עיקריות',
    items: [
      { name: 'סטייק טומהוק אמריקאי עם עצם', price: '31', description: '100 גרם' },
      { name: 'סטייק עגל טרי', price: '190', description: '' },
      { name: 'סינטה', price: '132', description: '' },
      { name: 'כבד עוף מוקפץ עם בצל', price: '71', description: '' },
      { name: 'סלט עוף ועלים ירוקים', price: '69', description: '' },
    ]
  },
  {
    name: 'המיוחדים שלנו',
    items: [
      { name: 'סטייק פיקניה', price: '134', description: '' },
      { name: 'אמריקה בדרומית', price: '141', description: '' },
    ]
  },
  {
    name: 'שיפודים',
    items: [
      { name: 'שיפוד פילה בקר', price: '64', description: '' },
      { name: 'שיפוד פיקניה', price: '59', description: '' },
      { name: 'שיפוד אנטריקוט', price: '51', description: '' },
      { name: 'שקדים', price: '99', description: '' },
      { name: 'שיפוד מולארד', price: '54', description: '' },
      { name: 'שיפוד שומן כבש', price: '59', description: '' },
      { name: 'שיפוד כבש', price: '57', description: '' },
      { name: 'שיפוד קבב', price: '38', description: '' },
      { name: 'שיפוד לבבות עוף', price: '31', description: '' },
      { name: 'שיפוד כבד עוף', price: '34', description: '' },
      { name: 'שיפוד כנפיים', price: '31', description: '' },
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
    items: [
      { name: 'עסקית דרומית', price: '107', description: '' },
      { name: 'עסקית שיפודים', price: '128', description: '' },
      { name: 'עסקית דגים', price: '128', description: '' },
      { name: 'עסקית בשרים', price: '171', description: '' },
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
          <p className="text-xl text-gray-300 mb-8">טעמים אותנטיים מהמטבח הדרומי</p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-12">
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
                className="bg-gradient-to-br from-[#1A0000] to-black/40 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-[#FF0000]/10"
              >
                <motion.button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full p-6 flex justify-between items-center hover:bg-[#FF0000]/5 transition-colors duration-300"
                >
                  <h2 className="text-2xl font-bold text-[#FF0000]">{category.name}</h2>
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
                              onClick={() => item.description && toggleItemExpansion(item.name)}
                              className={`flex justify-between items-start ${item.description ? 'cursor-pointer' : ''}`}
                            >
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white group-hover:text-[#FF0000] transition-colors duration-300">
                                  {item.name}
                                </h3>
                                <AnimatePresence>
                                  {(expandedItems.includes(item.name) || searchQuery) && item.description && (
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
                                {item.description && (
                                  <motion.div
                                    animate={{ rotate: expandedItems.includes(item.name) ? 180 : 0 }}
                                    className="text-[#FF0000]/50"
                                  >
                                    <ChevronDown size={16} />
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}