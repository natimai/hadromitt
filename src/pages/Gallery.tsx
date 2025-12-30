import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProgressiveImage } from '../components/ProgressiveImage';

interface GalleryImage {
  url: string;
  title: string;
  alt: string;
  category: 'הכל' | 'מנות עיקריות' | 'אווירה' | 'אירועים' | 'מטבח';
}

const images: GalleryImage[] = [
  {
    url: '/gallery/BarAharon-3565-2 Large.jpeg',
    title: 'חוויה קולינרית',
    alt: 'מנות שף מיוחדות במסעדת הדרומית - חוויה קולינרית אותנטית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3097 Large.jpeg',
    title: 'מנות מיוחדות',
    alt: 'מבחר מנות בשרים איכותיות במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3402 Large.jpeg',
    title: 'אווירת המסעדה',
    alt: 'אווירה מיוחדת ועיצוב מודרני במסעדת הדרומית',
    category: 'אווירה'
  },
  {
    url: '/gallery/BarAharon-3436 Large.jpeg',
    title: 'מנות השף',
    alt: 'מנות שף ייחודיות בעיצוב מרהיב במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3131 Large.jpeg',
    title: 'חלל המסעדה',
    alt: 'עיצוב פנים מודרני וחמים במסעדת הדרומית',
    category: 'אווירה'
  },
  {
    url: '/gallery/BarAharon-3055 Large.jpeg',
    title: 'מטבח המסעדה',
    alt: 'מטבח מקצועי ומודרני במסעדת הדרומית',
    category: 'מטבח'
  },
  {
    url: '/gallery/BarAharon-2973 Large.jpeg',
    title: 'אווירה ייחודית',
    alt: 'אווירה ייחודית במסעדת הדרומית',
    category: 'אווירה'
  },
  {
    url: '/gallery/BarAharon-2994 Large.jpeg',
    title: 'מנות בשרים',
    alt: 'מנות בשרים איכותיות במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3008 Large.jpeg',
    title: 'סטייקים מיוחדים',
    alt: 'סטייקים מיוחדים במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3016 Large.jpeg',
    title: 'מנות פתיחה',
    alt: 'מנות פתיחה מיוחדות במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3044 Large.jpeg',
    title: 'עיצוב המסעדה',
    alt: 'עיצוב מודרני במסעדת הדרומית',
    category: 'אווירה'
  },
  {
    url: '/gallery/BarAharon-3049 Large.jpeg',
    title: 'אווירת ערב',
    alt: 'אווירת ערב רומנטית במסעדת הדרומית',
    category: 'אווירה'
  },
  {
    url: '/gallery/BarAharon-3064 Large.jpeg',
    title: 'מנות דגל',
    alt: 'מנות דגל מיוחדות במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3068 Large.jpeg',
    title: 'סלטים טריים',
    alt: 'סלטים טריים ומיוחדים במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3077 Large.jpeg',
    title: 'מנות בשריות',
    alt: 'מנות בשריות מיוחדות במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3080 Large.jpeg',
    title: 'תפריט מגוון',
    alt: 'תפריט מגוון במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3085 Large.jpeg',
    title: 'חדרי VIP',
    alt: 'חדרי VIP מפוארים במסעדת הדרומית',
    category: 'אירועים'
  },
  {
    url: '/gallery/BarAharon-3087 Large.jpeg',
    title: 'אירועים מיוחדים',
    alt: 'אירועים מיוחדים במסעדת הדרומית',
    category: 'אירועים'
  },
  {
    url: '/gallery/BarAharon-3095 Large.jpeg',
    title: 'מנות מיוחדות',
    alt: 'מנות מיוחדות במסעדת הדרומית',
    category: 'מנות עיקריות'
  },
  {
    url: '/gallery/BarAharon-3098 Large.jpeg',
    title: 'אווירה חמה',
    alt: 'אווירה חמה ומזמינה במסעדת הדרומית',
    category: 'אווירה'
  }
];

const categories = ['הכל', 'מנות עיקריות', 'אווירה', 'אירועים', 'מטבח'] as const;

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('הכל');
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const filteredImages = selectedCategory === 'הכל' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const getCurrentImageIndex = () => {
    return filteredImages.findIndex(img => img.url === selectedImage);
  };

  const showNextImage = () => {
    const currentIndex = getCurrentImageIndex();
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1].url);
      x.set(0);
    }
  };

  const showPrevImage = () => {
    const currentIndex = getCurrentImageIndex();
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1].url);
      x.set(0);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (offset > 100 || velocity > 500) {
      showPrevImage();
    } else if (offset < -100 || velocity < -500) {
      showNextImage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF0000]">הגלריה שלנו</h1>
          <p className="text-xl text-gray-300">רגעים מיוחדים במסעדה</p>
          <div className="mt-6">
            <Link 
              to="/menu" 
              className="text-[#FF0000] hover:text-[#CC0000] transition-colors underline"
            >
              צפו בתפריט שלנו
            </Link>
            <span className="mx-2 text-gray-300">|</span>
            <Link 
              to="/events" 
              className="text-[#FF0000] hover:text-[#CC0000] transition-colors underline"
            >
              מידע על אירועים
            </Link>
          </div>
        </motion.div>

        {/* Category Filter - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#FF0000]" />
            <span className="text-gray-300 font-medium">סינון:</span>
          </div>
          
          {/* Mobile: Horizontal scrollable */}
          <div className="md:flex md:flex-wrap md:justify-center md:gap-3">
            <div className="flex md:hidden overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide -mx-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-3 rounded-full transition-all duration-300 
                    whitespace-nowrap min-h-[48px] flex-shrink-0
                    touch-manipulation
                    ${selectedCategory === category
                      ? 'bg-[#FF0000] text-white shadow-lg shadow-red-500/50 scale-105'
                      : 'bg-white/10 text-gray-300 active:bg-white/20'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            
            {/* Desktop: Flex wrap */}
            <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#FF0000] text-white shadow-lg shadow-red-500/50 scale-105'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid - Responsive Grid Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl shadow-2xl cursor-pointer aspect-square transform-gpu"
                onClick={() => setSelectedImage(image.url)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <ProgressiveImage
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 md:p-6">
                    <h3 className="text-white text-lg md:text-xl font-bold mb-2">{image.title}</h3>
                    <span className="text-xs md:text-sm text-gray-300 px-3 py-1 bg-[#FF0000]/80 rounded-full">
                      {image.category}
                    </span>
                  </div>
                  {/* Zoom Indicator - Desktop only */}
                  <div className="hidden md:block absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-400">אין תמונות בקטגוריה זו כרגע</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox with Swipe Support */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 text-white p-3 hover:bg-white/10 active:scale-95 rounded-full transition-all backdrop-blur-sm bg-black/30 z-10 touch-manipulation"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="סגור תמונה"
            >
              <X size={28} />
            </motion.button>

            {/* Previous Button */}
            {getCurrentImageIndex() > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 md:p-4 hover:bg-white/10 active:scale-95 rounded-full transition-all backdrop-blur-sm bg-black/30 z-10 touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevImage();
                }}
                aria-label="תמונה הקודמת"
              >
                <ChevronRight size={32} />
              </motion.button>
            )}

            {/* Next Button */}
            {getCurrentImageIndex() < filteredImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 md:p-4 hover:bg-white/10 active:scale-95 rounded-full transition-all backdrop-blur-sm bg-black/30 z-10 touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                aria-label="תמונה הבאה"
              >
                <ChevronLeft size={32} />
              </motion.button>
            )}

            {/* Swipeable Image */}
            <motion.img
              key={selectedImage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              style={{ x, opacity }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedImage}
              alt={filteredImages.find(img => img.url === selectedImage)?.alt || 'תמונה מוגדלת'}
              className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing touch-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info & Counter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-4"
            >
              <p className="text-white text-center font-medium">
                {filteredImages.find(img => img.url === selectedImage)?.title}
              </p>
              <span className="text-gray-400 text-sm">
                {getCurrentImageIndex() + 1} / {filteredImages.length}
              </span>
            </motion.div>

            {/* Swipe Hint (mobile only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white/50 text-sm md:hidden"
            >
              החלק לשינוי תמונה
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}