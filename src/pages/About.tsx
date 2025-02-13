import React from 'react';
import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">הסיפור שלנו</h1>
          <p className="text-xl text-gray-600">מסורת של טעמים אותנטיים</p>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80" 
              alt="Restaurant interior"
              className="rounded-xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-right"
          >
            <h2 className="text-3xl font-bold mb-6">המסע שלנו</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              הדרומית נולדה מתוך אהבה לאוכל דרומי אותנטי ורצון לשמר את המסורת הקולינרית העשירה של האזור.
              המסעדה שלנו משלבת מתכונים מסורתיים עם טכניקות מודרניות, תוך שימוש בחומרי גלם טריים ואיכותיים.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              כל מנה במסעדה מספרת סיפור, וכל ביקור הוא הזדמנות לחוות את העושר התרבותי והקולינרי של המטבח הדרומי.
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: 'איכות',
              description: 'שימוש בחומרי הגלם הטריים והאיכותיים ביותר',
              image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80'
            },
            {
              title: 'מסורת',
              description: 'שמירה על מתכונים מסורתיים ושיטות בישול אותנטיות',
              image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80'
            },
            {
              title: 'חדשנות',
              description: 'שילוב טכניקות מודרניות עם טעמים מסורתיים',
              image: 'https://images.unsplash.com/photo-1574966739987-65e42e4726e6?auto=format&fit=crop&q=80'
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img 
                src={value.image}
                alt={value.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-12">הצוות שלנו</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'שף דוד כהן',
                role: 'שף ראשי',
                image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80'
              },
              {
                name: 'מיכל לוי',
                role: 'שפית קונדיטורית',
                image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80'
              },
              {
                name: 'יוסי אברהם',
                role: 'מנהל המסעדה',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}