import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Calendar, Users, ChefHat, Star, ArrowLeft, ArrowRight, Check, Flame, Truck, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Catering() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const images = [
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-38 2.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-38 3.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-38 4.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-38.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-39 2.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-39 3.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-39.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-40 2.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-40 3.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-40 4.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-40.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-41 2.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-41 3.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-41 4.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-41.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-42 2.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-42 3.jpg',
    '/HADROMIT_OUT/PHOTO-2025-09-03-12-02-42.jpg'
  ];

  const services = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: 'הפקת אירועים מקצועית',
      description: 'צוות מקצועי ומנוסה בהפקת אירועים פרטיים ועסקיים. ערבי פרישה, ימי גיבוש, אירועים משפחתיים ועוד.',
      features: ['צוות שפים מקצועי', 'הכנה במקום טרייה', 'שירות אישי מותאם', 'הפקה מלאה']
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: 'גריל ענק וציוד מתקדם',
      description: 'אנחנו מגיעים עם גריל ענק, ציפסר מקצועי וכל הציוד הנדרש להכנת האוכל במקום.',
      features: ['גריל ענק מקצועי', 'ציפסר מתקדם', 'ציוד מקצועי מלא', 'הכנה טרייה במקום']
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'שירות עד הבית',
      description: 'אנחנו מגיעים אליכם עם כל הציוד והמזון. לא צריך לדאוג לכלום - אנחנו מטפלים בהכל.',
      features: ['הגעה עד הבית', 'הקמה מלאה', 'ניקוי ופירוק', 'שירות מלא']
    }
  ];

  const menuItems = [
    {
      category: 'סלטי הבית',
      items: ['מבחר סלטי הבית', 'לאפות מהטאבון', 'חומוס הדרומית', 'סלטים טריים']
    },
    {
      category: 'מנות בשרים',
      items: ['שיפודים על האש', 'סטייקים מעולים', 'פרגיות', 'כבד עוף', 'בשרים איכותיים']
    },
    {
      category: 'תוספות',
      items: ['צ׳יפס טרי', 'אורז', 'פירה', 'פירה בטטה', 'סלט ירקות']
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // אוטומציה להחלפת תמונות
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Helmet>
        <title>הדרומית עד הבית - קייטרינג והפקת אירועים | הדרומית</title>
        <meta name="description" content="הדרומית עד הבית - שירות קייטרינג מקצועי והפקת אירועים. אנחנו מגיעים אליכם עם גריל ענק, ציפסר מקצועי ומכינים הכל טרי במקום. ערבי פרישה, ימי גיבוש, אירועים משפחתיים ועוד. הזמן עכשיו: 050-7557055" />
        <meta name="keywords" content="קייטרינג, הפקת אירועים, הדרומית עד הבית, ערב פרישה, יום גיבוש, אירועים משפחתיים, גריל, ציפסר, אוכל טרי" />
        <meta name="author" content="הדרומית" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="הדרומית עד הבית - קייטרינג והפקת אירועים" />
        <meta property="og:description" content="שירות קייטרינג מקצועי והפקת אירועים. אנחנו מגיעים אליכם עם גריל ענק ומכינים הכל טרי במקום." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hadromit.co.il/catering" />
        <meta property="og:image" content="/hero.jpeg" />
        <meta property="og:site_name" content="הדרומית" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="הדרומית עד הבית - קייטרינג והפקת אירועים" />
        <meta name="twitter:description" content="שירות קייטרינג מקצועי והפקת אירועים. הזמן עכשיו: 050-7557055" />
        <meta name="twitter:image" content="/hero.jpeg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hadromit.co.il/catering" />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodService",
            "name": "הדרומית עד הבית",
            "description": "שירות קייטרינג מקצועי והפקת אירועים. אנחנו מגיעים אליכם עם גריל ענק, ציפסר מקצועי ומכינים הכל טרי במקום.",
            "url": "https://hadromit.co.il/catering",
            "telephone": "050-7557055",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IL"
            },
            "servesCuisine": ["ישראלית", "מזרח תיכונית", "בשרים", "גריל"],
            "priceRange": "₪₪₪",
            "openingHours": "Mo-Su 10:00-22:00",
            "image": [
              "https://hadromit.co.il/HADROMIT_OUT/PHOTO-2025-09-03-12-02-38 2.jpg",
              "https://hadromit.co.il/HADROMIT_OUT/PHOTO-2025-09-03-12-02-38 3.jpg"
            ],
            "hasMenu": {
              "@type": "Menu",
              "name": "תפריט הדרומית עד הבית",
              "hasMenuSection": [
                {
                  "@type": "MenuSection",
                  "name": "סלטי הבית",
                  "hasMenuItem": [
                    { "@type": "MenuItem", "name": "מבחר סלטי הבית" },
                    { "@type": "MenuItem", "name": "לאפות מהטאבון" },
                    { "@type": "MenuItem", "name": "חומוס הדרומית" }
                  ]
                },
                {
                  "@type": "MenuSection", 
                  "name": "מנות בשרים",
                  "hasMenuItem": [
                    { "@type": "MenuItem", "name": "שיפודים על האש" },
                    { "@type": "MenuItem", "name": "סטייקים מעולים" },
                    { "@type": "MenuItem", "name": "פרגיות" }
                  ]
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150"
            }
          })}
        </script>
      </Helmet>
      
            <main className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black">
        {/* Hero Section */}
        <section className="relative min-h-[75vh] overflow-hidden flex items-center justify-center" aria-label="הדרומית עד הבית - קייטרינג והפקת אירועים">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {isLoaded && (
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <img 
                  src={images[currentImage]}
                  alt={`הדרומית עד הבית - קייטרינג והפקת אירועים - תמונה ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0000]/60 via-[#1A0000]/40 to-[#1A0000]/60" />
                <div className="absolute inset-0 bg-black/30" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 w-full py-20">
                      <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto relative flex flex-col justify-center items-center"
            >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-[#FF6666] to-white bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
                הדרומית עד הבית
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-white font-semibold drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              הטעמים של הדרומית מגיעים אליכם
            </motion.p>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-100 font-medium max-w-2xl sm:max-w-3xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              קייטרינג, אירועי חוץ והפקות בהתאמה אישית. אנחנו מגיעים עם גריל ענק, ציפסר מקצועי ומכינים הכל טרי במקום.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-2xl mx-auto px-4"
            >
              <motion.a
                href="tel:0507557055"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#FF0000] text-white rounded-full text-base sm:text-lg font-bold hover:bg-[#CC0000] transition-colors drop-shadow-[0_8px_16px_rgba(255,0,0,0.6)] w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">הזמן עכשיו: </span>050-7557055
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-base sm:text-lg font-bold hover:bg-white/20 transition-colors drop-shadow-[0_8px_16px_rgba(255,255,255,0.4)] w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  צור קשר לפרטים
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center px-2 sm:px-4 z-20">
          <motion.button
            onClick={prevImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </motion.button>
          <motion.button
            onClick={nextImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </motion.button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentImage === index ? 'bg-[#FF0000]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">מה אנחנו מציעים</h2>
            <p className="text-lg sm:text-xl text-gray-300">שירות מלא של קייטרינג והפקת אירועים</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1A0000]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#FF0000]/10 rounded-full text-[#FF0000]">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="w-5 h-5 text-[#FF0000] ml-2" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A0000]/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF0000] mb-4">תפריט הדרומית עד הבית</h2>
            <p className="text-lg sm:text-xl text-gray-300">אותו טעם איכותי, אותה חוויה מיוחדת</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1A0000]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
              >
                <h3 className="text-2xl font-bold text-[#FF0000] mb-6">{category.category}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center text-gray-300"
                    >
                      <Star className="w-4 h-4 text-[#FF0000] ml-2" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">גלריית אירועים</h2>
            <p className="text-lg sm:text-xl text-gray-300">צפו באירועים שהפקנו</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {images.map((image, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(image)}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img 
                  src={image}
                  alt={`אירוע הדרומית עד הבית ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A0000]/40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF0000] mb-4">
              מוכנים לאירוע מושלם?
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
              צרו קשר עכשיו ונשמח לעזור לכם לתכנן את האירוע המושלם עם הטעמים של הדרומית.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.a
                href="tel:0507557055"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF0000] text-white rounded-full text-lg font-bold hover:bg-[#CC0000] transition-colors"
              >
                <Phone className="w-5 h-5" />
                הזמן עכשיו: 050-7557055
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-bold hover:bg-white/20 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  צור קשר לפרטים
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="תמונה מוגדלת"
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 bg-[#FF0000] text-white rounded-full shadow-lg hover:bg-[#CC0000] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
    </>
  );
}
