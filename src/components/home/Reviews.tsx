
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ThumbsUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { reviews } from '../../data/reviewsData';

export function Reviews() {
    const [currentReview, setCurrentReview] = useState(0);

    return (
        <section className="relative py-24 px-6 overflow-hidden bg-white">
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 sm:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-warmDark mb-4">מה אומרים עלינו</h2>
                    <p className="text-xl text-warmDark/70 font-medium">הלקוחות שלנו מספרים על החוויה</p>
                </motion.div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentReview}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-warmDark/10"
                                >
                                    <img
                                        src={reviews[currentReview].image}
                                        alt={`ביקורת מאת ${reviews[currentReview].name}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                <motion.div
                                    className="bg-warmBg p-10 sm:p-12 rounded-[2rem] shadow-xl shadow-warmDark/5 border border-warmDark/5 relative overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <div className="absolute top-6 right-8 opacity-10">
                                        <Quote className="w-24 h-24 text-brand transform -scale-x-100" />
                                    </div>

                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div>
                                                <h3 className="text-2xl sm:text-3xl font-bold text-warmDark mb-1">{reviews[currentReview].name}</h3>
                                                {reviews[currentReview].role && (
                                                    <p className="text-brand font-medium">{reviews[currentReview].role}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-1.5 mb-8">
                                            {[...Array(reviews[currentReview].rating)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                                                >
                                                    <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <p className="text-warmDark/80 text-xl sm:text-2xl mb-8 leading-relaxed font-light italic">
                                            "{reviews[currentReview].content}"
                                        </p>

                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <p className="text-warmDark/50">{reviews[currentReview].date}</p>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full">
                                                <ThumbsUp className="w-5 h-5 text-brand" />
                                                <span className="text-brand font-bold text-sm">מומלץ בחום</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center flex-row-reverse items-center gap-6 mt-12">
                        <button
                            onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
                            className="p-3 bg-warmDark/5 rounded-full hover:bg-warmDark/10 transition-colors text-warmDark flex-shrink-0"
                            aria-label="הקודם"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>
                        <div className="flex flex-row-reverse gap-3">
                            {reviews.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentReview(index)}
                                    aria-label={`ביקורת ${index + 1}`}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentReview === index ? 'bg-brand scale-125' : 'bg-warmDark/20 hover:bg-warmDark/40'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
                            className="p-3 bg-warmDark/5 rounded-full hover:bg-warmDark/10 transition-colors text-warmDark flex-shrink-0"
                            aria-label="הבא"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
