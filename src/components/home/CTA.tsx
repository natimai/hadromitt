
import { motion } from 'framer-motion';
import { Calendar, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gtagEvent } from '../../utils/gtag';

export function CTA() {
    const handleReservationClick = () => {
        gtagEvent('reservation_click', 'conversion', 'tabit_reservation');
    };

    return (
        <section className="relative py-24 px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="/gallery/BarAharon-3565-2 Large.jpeg"
                    alt="אווירה מיוחדת במסעדת הדרומית - מסעדה מומלצת בבאר שבע"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/80 to-[#1A0000]/60 backdrop-blur-sm"></div>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#FF0000] mb-4">
                        בואו לגלות את הטעמים האותנטיים שלנו
                    </h2>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        מחכים לכם בהדרומית לחוויה קולינרית בלתי נשכחת.
                        <br />
                        הזמינו מקום או צפו בתפריט העשיר שלנו.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a
                                href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleReservationClick}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF0000] text-white rounded-full text-lg font-bold hover:bg-[#CC0000] transition-colors"
                            >
                                <Calendar className="w-5 h-5" />
                                הזמן שולחן
                            </a>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/menu"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[56px] bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-bold hover:bg-white/20 active:scale-95 transition-all touch-manipulation"
                            >
                                <Utensils className="w-6 h-6" />
                                לתפריט המלא
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
