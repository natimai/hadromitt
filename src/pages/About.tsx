import React from 'react';
import { motion } from 'framer-motion';
import { Users, Utensils, Calendar, MapPin, Accessibility, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  const sections = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'חוויה קולינרית',
      content: 'בדרומית תמצאו תפריט עשיר ומגוון הכולל מנות בשרים משובחות, סלטים טריים וייחודיים, מנות פתיחה מפתיעות ומנות דגל שזכו לשם ולשבח בתחום האירועים. סימן ההיכר שלנו הוא הנדיבות יוצאת הדופן שמאפיינת את בעלי הקבוצה, אבי לב.',
      image: '/gallery/BarAharon-3565-2 Large.jpeg'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'אירועים פרטיים',
      content: 'למעוניינים באירועים פרטיים, המסעדה מציעה שלושה חדרי אירועי VIP מאובזרים במערכות הגברה מתקדמות ובמסכים, המתאימים לאירועים אינטימיים מ-30 סועדים ועד 50 סועדים. כל חדר תוכנן בקפידה כדי להעניק חוויה ייחודית ומותאמת אישית.',
      image: '/gallery/BarAharon-3097 Large.jpeg'
    },
    {
      icon: <Accessibility className="w-8 h-8" />,
      title: 'נגישות',
      content: 'מתחם המסעדה מתוכנן להנגיש חוויית ביקור נוחה לכל אורח. חניות נכים מסומנות ושמורות נמצאות בקרבת הכניסה, והגישה אל המסעדה נוחה ומותאמת לחלוטין.',
      image: '/gallery/BarAharon-3402 Large.jpeg'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'הדרומית עד הבית',
      content: 'שירות חדש! אנחנו מגיעים אליכם עם גריל ענק, ציפסר מקצועי ומכינים הכל טרי במקום. ערבי פרישה, ימי גיבוש ואירועים משפחתיים בהתאמה אישית.',
      image: '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-38 2.jpg'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] mb-16">
        <div className="absolute inset-0">
          <img 
            src="/gallery/BarAharon-3131 Large.jpeg"
            alt="אווירה מיוחדת ועיצוב מודרני במסעדת הדרומית"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/95 via-[#1A0000]/80 to-[#1A0000]/95 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <img 
                src="/logo.svg" 
                alt="לוגו מסעדת הדרומית - מסעדת בשרים כשרה בבאר שבע" 
                className="h-32 mx-auto"
              />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              מסעדת בשרים כשרה בבאר שבע
            </h1>
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <p className="text-xl leading-relaxed text-gray-100 mb-8">
                  ברוכים הבאים להדרומית, מסעדת בשרים כשרה מבית קבוצת פפה מישל, הממוקמת במתחם ישפרו סנטר ליד הפורום בבאר שבע.
                  <Link to="/menu" className="text-[#FF0000] hover:text-[#CC0000] transition-colors mx-1">
                    צפו בתפריט שלנו
                  </Link>
                  ,
                  <Link to="/catering" className="text-[#FF0000] hover:text-[#CC0000] transition-colors mx-1">
                    הדרומית עד הבית
                  </Link>
                  או
                  <Link to="/contact" className="text-[#FF0000] hover:text-[#CC0000] transition-colors mx-1">
                    צרו קשר
                  </Link>
                  לפרטים נוספים.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16"
          >
            המסעדה תוכננה ועוצבה בסגנון מודרני עם גווני עץ חמים, היוצרים אווירה אינטימית, חמה ורומנטית לכל סועד.
          </motion.p>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-2xl shadow-xl"
              >
                <div className="aspect-square">
                  <img 
                    src={section.image}
                    alt={`${section.title} - ${section.content}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/60 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed">{section.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action with Background */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <img 
            src="/gallery/BarAharon-3055 Large.jpeg"
            alt="מטבח מקצועי ומודרני במסעדת הדרומית"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] to-[#1A0000]/60 backdrop-blur-sm"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative inline-block mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              בואו לחוות חוויה קולינרית נדיבה, ייחודית ומרגשת
            </h2>
            <div className="absolute -inset-1 bg-white/20 blur-xl -z-10 rounded-full"></div>
          </div>
          <p className="text-2xl text-gray-200 mb-12">אנחנו מחכים לכם בדרומית!</p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-12 py-5 rounded-full text-xl font-bold overflow-hidden bg-white text-[#1A0000] hover:text-white transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#CC0000] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <MapPin className="relative w-6 h-6" />
              <span className="relative">צור קשר</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}