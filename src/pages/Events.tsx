import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Music, Tv, Gift, ChevronRight, MapPin } from 'lucide-react';

export function Events() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const rooms = [
    {
      id: 1,
      name: 'חדר יהלום',
      capacity: '30-40',
      image: '/gallery/BarAharon-3097 Large.jpeg',
      features: [
        'מערכת סאונד איכותית',
        'מסך LED גדול',
        'תאורה מתכווננת',
        'שירות VIP צמוד',
        'תפריט מותאם אישית'
      ]
    },
    {
      id: 2,
      name: 'חדר ספיר',
      capacity: '40-50',
      image: '/gallery/BarAharon-3402 Large.jpeg',
      features: [
        'מערכת קריוקי מקצועית',
        'מקרן ומסך ענק',
        'תאורת אווירה',
        'שירות VIP צמוד',
        'תפריט מותאם אישית'
      ]
    },
    {
      id: 3,
      name: 'חדר אודם',
      capacity: '20-30',
      image: '/gallery/BarAharon-3565-2 Large.jpeg',
      features: [
        'אווירה אינטימית',
        'מערכת שמע היקפית',
        'תאורה רומנטית',
        'שירות VIP צמוד',
        'תפריט מותאם אישית'
      ]
    }
  ];

  const eventTypes = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'ימי הולדת',
      description: 'חגגו את יום ההולדת שלכם באווירה מיוחדת עם תפריט עשיר ושירות VIP'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'אירועים עסקיים',
      description: 'מפגשי עסקים, השקות וכנסים בסביבה מקצועית ומכובדת'
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'מסיבות פרטיות',
      description: 'חגגו אירועים פרטיים באווירה שמחה עם מערכות שמע וקריוקי'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <div className="absolute inset-0">
          <img 
            src="/gallery/BarAharon-3131 Large.jpeg"
            alt="אירועים בדרומית"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/80 to-[#1A0000]"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              אירועים בדרומית
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              חדרי VIP מפוארים לאירועים פרטיים ועסקיים עם חוויה קולינרית יוצאת דופן
            </p>
          </motion.div>
        </div>
      </div>

      {/* Event Types */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1A0000] mb-4">סוגי אירועים</h2>
            <p className="text-gray-600">מגוון אפשרויות לכל סוג של אירוע</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-[#FF0000]/10 rounded-full text-[#FF0000]">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1A0000]">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* VIP Rooms */}
      <div className="bg-[#1A0000] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">חדרי VIP</h2>
            <p className="text-gray-300">חדרים מפוארים המתאימים לכל סוגי האירועים</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
              >
                <div className="aspect-[4/5]">
                  <img 
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/60 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{room.name}</h3>
                  <p className="text-gray-200">קיבולת: {room.capacity} איש</p>
                  
                  <AnimatePresence>
                    {selectedRoom === room.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <ul className="space-y-2">
                          {room.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center text-gray-200"
                            >
                              <ChevronRight className="w-4 h-4 text-[#FF0000] ml-2" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-[#1A0000]">
              מעוניינים לחגוג אצלנו?
            </h2>
            <p className="text-xl text-gray-600">
              צוות המסעדה ישמח לסייע בתכנון האירוע המושלם עבורכם
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-12 py-5 rounded-full text-xl font-bold overflow-hidden bg-[#1A0000] text-white transition-colors duration-300"
              >
                <MapPin className="w-6 h-6" />
                <span>צור קשר לתיאום</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 