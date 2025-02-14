import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const images = [
  {
    url: '/gallery/BarAharon-3565-2 Large.jpeg',
    title: 'חוויה קולינרית',
    alt: 'מנות שף מיוחדות במסעדת הדרומית - חוויה קולינרית אותנטית'
  },
  {
    url: '/gallery/BarAharon-3097 Large.jpeg',
    title: 'מנות מיוחדות',
    alt: 'מבחר מנות בשרים איכותיות במסעדת הדרומית'
  },
  {
    url: '/gallery/BarAharon-3402 Large.jpeg',
    title: 'אווירת המסעדה',
    alt: 'אווירה מיוחדת ועיצוב מודרני במסעדת הדרומית'
  },
  {
    url: '/gallery/BarAharon-3436 Large.jpeg',
    title: 'מנות השף',
    alt: 'מנות שף ייחודיות בעיצוב מרהיב במסעדת הדרומית'
  },
  {
    url: '/gallery/BarAharon-3131 Large.jpeg',
    title: 'חלל המסעדה',
    alt: 'עיצוב פנים מודרני וחמים במסעדת הדרומית'
  },
  {
    url: '/gallery/BarAharon-3055 Large.jpeg',
    title: 'מטבח המסעדה',
    alt: 'מטבח מקצועי ומודרני במסעדת הדרומית'
  },
  {
    url: '/gallery/staik or shipud.png',
    title: 'סטייק ושיפודים',
    alt: 'סטייקים ושיפודים על האש במסעדת הדרומית'
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg aspect-square cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={selectedImage}
              alt={images.find(img => img.url === selectedImage)?.alt || 'תמונה מוגדלת'}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}