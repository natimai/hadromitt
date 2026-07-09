import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowRight, ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { reviews } from '../../data/reviewsData';
import { TABIT_RESERVATION_URL, WHATSAPP_RESERVE } from '../../utils/constants';
import { trackReservationClick, gtagEvent } from '../../utils/gtag';

const platforms = [
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=%D7%94%D7%93%D7%A8%D7%95%D7%9E%D7%99%D7%AA+%D7%91%D7%90%D7%A8+%D7%A9%D7%91%D7%A2',
    rating: '4.8',
    reviews: '500+',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/hadromit/?locale=he_IL',
    rating: '4.9',
    reviews: '300+',
  },
];

export function SocialProof() {
  const [currentReview, setCurrentReview] = useState(0);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-white">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-warmDark mb-4">
            מה אומרים עלינו
          </h2>
          <p className="text-xl text-warmDark/70 font-medium mb-6">
            מאות ביקורות חיוביות — וחוויה שמזמינה לחזור
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-brand/10 px-5 py-2.5 rounded-full">
              <Star className="w-5 h-5 text-brand fill-brand" />
              <span className="font-bold text-warmDark">4.8</span>
              <span className="text-warmDark/60">ממוצע בגוגל</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-warmDark/5 px-5 py-2.5 rounded-full">
              <span className="font-bold text-warmDark">800+</span>
              <span className="text-warmDark/60">ביקורות ברשת</span>
            </div>
          </div>
        </motion.div>

        <div className="relative mb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-warmDark/10">
                  <img
                    src={reviews[currentReview].image}
                    alt={`ביקורת מאת ${reviews[currentReview].name}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-warmBg p-8 sm:p-10 rounded-3xl border border-warmDark/5 relative">
                  <Quote className="absolute top-6 right-8 w-16 h-16 text-brand/10" />
                  <h3 className="font-display text-2xl font-bold text-warmDark mb-1">
                    {reviews[currentReview].name}
                  </h3>
                  {reviews[currentReview].role && (
                    <p className="text-brand font-medium mb-4">{reviews[currentReview].role}</p>
                  )}
                  <div className="flex gap-1 mb-6">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-warmDark/80 text-lg leading-relaxed mb-6">
                    &ldquo;{reviews[currentReview].content}&rdquo;
                  </p>
                  <p className="text-warmDark/45 text-sm">{reviews[currentReview].date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center flex-row-reverse items-center gap-6 mt-10">
            <button
              type="button"
              onClick={() =>
                setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
              }
              className="p-3 bg-warmDark/5 rounded-full hover:bg-warmDark/10 transition-colors text-warmDark"
              aria-label="הקודם"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="flex flex-row-reverse gap-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentReview(index)}
                  aria-label={`ביקורת ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentReview === index ? 'bg-brand scale-125' : 'bg-warmDark/20'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
              className="p-3 bg-warmDark/5 rounded-full hover:bg-warmDark/10 transition-colors text-warmDark"
              aria-label="הבא"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => gtagEvent('review_platform_click', 'engagement', p.name)}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-warmDark text-white hover:bg-ink transition-colors"
            >
              <span className="font-semibold">{p.name}</span>
              <span className="text-brand font-bold">{p.rating}</span>
              <span className="text-white/60 text-sm">({p.reviews})</span>
              <ExternalLink className="w-4 h-4 text-white/50" />
            </a>
          ))}
          <a
            href={WHATSAPP_RESERVE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gtagEvent('whatsapp_click', 'engagement', 'social_proof')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#25D366] text-white hover:brightness-110 transition-all font-semibold"
          >
            וואטסאפ
          </a>
        </div>

        <div className="text-center">
          <a
            href={TABIT_RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReservationClick('social_proof_tabit')}
            className="btn-brand"
          >
            <Calendar className="w-5 h-5" />
            הזמן שולחן עכשיו
          </a>
        </div>
      </div>
    </section>
  );
}
