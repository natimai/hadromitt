
import { motion } from 'framer-motion';
import { Utensils, Star, ThumbsUp } from 'lucide-react';

export function Features() {
    const features = [
        {
            title: 'מסעדת בשרים מובילה בבאר שבע',
            description: 'מסעדה מומלצת המציעה חוויה קולינרית ייחודית. בשרים כשר חלק איכותיים על האש, סטייקים מעולים ושיפודים טעימים במסעדה הטובה ביותר בבאר שבע',
            icon: <Utensils className="w-8 h-8" />,
            image: '/gallery/BarAharon-3565-2 Large.jpeg',
            highlights: ['בשר כשר חלק איכותי', 'סטייקים מעולים', 'שיפודים על האש']
        },
        {
            title: 'מסעדה מומלצת לאירועים',
            description: 'המסעדה המושלמת בבאר שבע לאירועים משפחתיים ועסקיים. חדרי VIP פרטיים, אווירה יוקרתית ושירות מעולה למסעדת בשרים מומלצת',
            icon: <Star className="w-8 h-8" />,
            image: '/gallery/BarAharon-3097 Large.jpeg',
            highlights: ['חדרי VIP פרטיים', 'אירועים משפחתיים', 'מפגשים עסקיים']
        },
        {
            title: 'שירות מעולה במסעדה בבאר שבע',
            description: 'צוות מקצועי ומנוסה במסעדה המומלצת בבאר שבע. שירות אישי ומותאם אישית, המלצות מקצועיות והכנת מנות ברמה הגבוהה ביותר',
            icon: <ThumbsUp className="w-8 h-8" />,
            image: '/gallery/BarAharon-3402 Large.jpeg',
            highlights: ['צוות מקצועי', 'שירות אישי מותאם', 'המלצות מקצועיות']
        }
    ];

    return (
        <section className="relative py-24 px-6 bg-warmBg">
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 sm:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-warmDark mb-4">למה הדרומית?</h2>
                    <p className="text-xl text-warmDark/70 font-medium">חוויה קולינרית שלא תשכחו</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-items-center">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-warmDark/5 hover:shadow-2xl hover:shadow-warmDark/10 transition-shadow duration-500 w-full max-w-md ${index === 1 ? 'lg:mt-12' : ''}`}
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-warmDark/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="p-8 sm:p-10 relative bg-white">
                                <div className="absolute -top-12 right-8 p-4 bg-white rounded-2xl shadow-lg border border-warmBg text-brand transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                                    {feature.icon}
                                </div>
                                
                                <h3 className="text-2xl font-bold text-warmDark mb-4 mt-2">{feature.title}</h3>
                                <p className="text-warmDark/70 leading-relaxed mb-6">{feature.description}</p>
                                
                                <ul className="space-y-3">
                                    {feature.highlights.map((highlight, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + (0.1 * i) }}
                                            className="flex items-center text-warmDark/80 font-medium"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand ml-3 opacity-70"></div>
                                            {highlight}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
