
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ThumbsUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { reviews } from '../../data/reviewsData';

export function Reviews() {
    const [currentReview, setCurrentReview] = useState(0);

    return (
        <section className="relative py-24 px-6 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/90 to-black/95 backdrop-blur-sm"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#FF0000] mb-4">מה אומרים עלינו</h2>
                    <p className="text-xl text-gray-300">הלקוחות שלנו מספרים על החוויה</p>
                </motion.div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentReview}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="relative"
                        >
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                                >
                                    <img
                                        src={reviews[currentReview].image}
                                        alt={`ביקורת מאת ${reviews[currentReview].name}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/50 to-transparent"></div>
                                </motion.div>

                                <motion.div
                                    className="bg-gradient-to-br from-[#1A0000]/60 to-black/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/10 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>

                                    <div className="relative">
                                        <div className="flex items-start mb-8">
                                            <motion.div
                                                animate={{ rotate: [0, -5, 0] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            >
                                                <Quote className="text-[#FF0000] w-14 h-14 mt-1 ml-4 transform -scale-x-100 drop-shadow-lg" />
                                            </motion.div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-white mb-2">{reviews[currentReview].name}</h3>
                                                {reviews[currentReview].role && (
                                                    <p className="text-[#FF6666] text-xl font-medium">{reviews[currentReview].role}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mb-8">
                                            {[...Array(reviews[currentReview].rating)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                                                >
                                                    <Star className="w-7 h-7 text-[#FF0000] fill-[#FF0000] drop-shadow-lg" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <p className="text-gray-100 text-2xl mb-8 leading-relaxed font-light italic">
                                            "{reviews[currentReview].content}"
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-400 text-lg">{reviews[currentReview].date}</p>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-[#FF0000]/20 rounded-full">
                                                <ThumbsUp className="w-5 h-5 text-[#FF0000]" />
                                                <span className="text-white font-medium">מומלץ בחום</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
                            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <ArrowRight className="w-6 h-6 text-white" />
                        </button>
                        <div className="flex gap-2">
                            {reviews.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentReview(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentReview === index ? 'bg-[#FF0000]' : 'bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
                            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
