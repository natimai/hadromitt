import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Flame, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import fbq from '../utils/fbq';

import { SEO } from '../components/SEO';
import { menuCategories } from '../data/menuData';
import { TABIT_RESERVATION_URL } from '../utils/constants';
import { trackReservationClick } from '../utils/gtag';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(menuCategories[0].name);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    <div className="min-h-screen bg-neutral-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <SEO
        title="תפריט - הדרומית מסעדה בבאר שבע | מסעדת בשרים כשר חלק מומלצת"
        description="תפריט מסעדת הדרומית - מסעדה מומלצת בבאר שבע. מסעדת בשרים כשר חלק עם תפריט עשיר: סטייקים, שיפודים, עסקיות ומנות מיוחדות. מחירים אטרקטיביים ומנות טעימות במסעדה הטובה ביותר בבאר שבע."
        keywords="תפריט הדרומית, מסעדה בבאר שבע תפריט, מסעדת בשרים תפריט, סטייקים באר שבע, שיפודים באר שבע, עסקיות באר שבע"
        canonicalUrl="/menu"
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-brand">תפריט הדרומית - מסעדה בבאר שבע</h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">מסעדת בשרים כשר חלק מומלצת - תפריט עשיר ומגוון</p>

          {/* כפתורי הזמנה ואירועים */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a
              href={TABIT_RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackReservationClick('menu_tabit')}
              className="inline-flex items-center justify-center px-6 py-2.5 font-bold rounded-full bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/30 transition-colors"
            >
              להזמנת מקום
            </a>
            <Link
              to="/events"
              className="inline-flex items-center justify-center px-6 py-2.5 font-medium rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
            >
              לאירועים מיוחדים
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
                className="w-full px-5 py-2.5 bg-[#1A0000]/60 border border-brand/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </motion.div>
          </div>

          {/* כפתור פתיחת תפריט קטגוריות במובייל */}
          <div className="md:hidden mb-4">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-between w-full px-4 py-3 bg-brand rounded-lg text-white font-bold"
            >
              <span>{selectedCategory || 'בחר קטגוריה'}</span>
              <ChevronDown className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} size={20} />
            </motion.button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-[#1A0000] rounded-b-lg border border-brand/20 shadow-xl z-20"
                >
                  <div className="flex flex-col p-2 max-h-60 overflow-y-auto">
                    {menuCategories.map((category) => (
                      <motion.button
                        key={`mobile-${category.name}`}
                        onClick={() => toggleCategory(category.name)}
                        className={`px-4 py-3 text-right rounded-lg mb-1 transition-all ${selectedCategory === category.name
                            ? 'bg-brand/20 text-white font-bold'
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
                  className={`relative px-5 py-3 rounded-full transition-all duration-300 ${selectedCategory === category.name
                      ? 'bg-brand text-white font-bold'
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
                      className={`relative group p-3 sm:p-4 rounded-xl transition-all duration-300 border border-transparent ${expandedItems.includes(item.name) ? 'bg-white/5 shadow-lg backdrop-blur-sm border-white/10' : 'hover:bg-white/5'
                        }`}
                      onClick={() => toggleItemExpansion(item.name)}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            <h3 className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${expandedItems.includes(item.name) ? 'text-brand' : 'text-white'}`}>
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
                            className="bg-gradient-to-r from-brand to-brand-dark text-white font-bold px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base"
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
                className="bg-brand text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronUp size={24} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* אינדיקטור לקטגוריה נוכחית במובייל */}
        <div className="fixed top-16 left-0 z-10 md:hidden p-2 bg-gradient-to-r from-brand to-transparent">
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
            <div className="p-1 sm:p-2 bg-brand/10 rounded-full">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-white">הקש לפרטים</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}