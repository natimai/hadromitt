
import { motion } from 'framer-motion';
import { Utensils, Star, ThumbsUp, Check } from 'lucide-react';

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
        <section className="relative py-24 px-6">
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
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">למה הדרומית?</h2>
                    <p className="text-xl text-gray-300">חוויה קולינרית שלא תשכחו</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative overflow-hidden rounded-2xl bg-[#1A0000]/40 backdrop-blur-sm w-full max-w-md"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/60 to-transparent"></div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-col items-center text-center gap-3 mb-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="p-3 bg-[#FF0000]/10 rounded-full text-[#FF0000]">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6 text-center">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.highlights.map((highlight, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * i }}
                                            className="flex items-center justify-center text-gray-300"
                                        >
                                            <Check className="w-5 h-5 text-[#FF0000] ml-2" />
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
