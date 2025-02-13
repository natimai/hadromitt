import React from 'react';
import { motion } from 'framer-motion';

const menuCategories = [
  {
    name: 'ראשונות',
    items: [
      { name: 'סלט ירקות טרי', price: '42', description: 'ירקות טריים, שמן זית ולימון' },
      { name: 'חומוס הבית', price: '38', description: 'חומוס קטיפתי עם שמן זית ופטרוזיליה' },
      { name: 'טחינה', price: '36', description: 'טחינה ביתית עם פטרוזיליה ושמן זית' },
    ],
  },
  {
    name: 'עיקריות',
    items: [
      { name: 'שיפוד פרגית', price: '78', description: 'פרגית במרינדה ביתית על הגריל' },
      { name: 'קבב טלה', price: '82', description: 'קבב טלה עסיסי עם בצל ופטרוזיליה' },
      { name: 'דג ים טרי', price: '98', description: 'דג ים טרי צלוי בתנור עם עשבי תיבול' },
    ],
  },
  {
    name: 'קינוחים',
    items: [
      { name: 'מלבי', price: '32', description: 'מלבי ביתי עם קוקוס ואגוזים' },
      { name: 'כנאפה', price: '44', description: 'כנאפה חמה עם גבינה וסירופ סוכר' },
      { name: 'עוגת שוקולד', price: '38', description: 'עוגת שוקולד חמה עם גלידה' },
    ],
  },
];

export function Menu() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">התפריט שלנו</h1>
          <p className="text-xl text-gray-600">טעמים אותנטיים מהמטבח הדרומי</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">{category.name}</h2>
                <div className="space-y-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.1 }}
                      className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <span className="text-yellow-600 font-medium">₪{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}