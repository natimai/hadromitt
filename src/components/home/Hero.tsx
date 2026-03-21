
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, MapPin, Phone, Calendar, Plus, X } from 'lucide-react';
import { gtagEvent } from '../../utils/gtag';

export function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentBackground, setCurrentBackground] = useState(0);
    const [currentSubtitle, setCurrentSubtitle] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef);

    const { scrollYProgress } = useScroll();
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const scaleX = useSpring(scrollYProgress, springConfig);

    const handleCallClick = () => {
        gtagEvent('call_click', 'engagement', 'phone_call');
    };

    const handleReservationClick = () => {
        gtagEvent('reservation_click', 'conversion', 'tabit_reservation');
    };

    const subtitles = [
        "מסעדה מומלצת בבאר שבע",
        "מסעדת בשרים כשר חלק",
        "בשרים משובחים על האש",
        "המסעדה המובילה בבאר שבע"
    ];

    const backgroundImages = [
        '/gallery/BarAharon-3131 Large.jpeg',
        '/gallery/BarAharon-3402 Large.jpeg',
        '/hero.jpeg',
        '/gallery/BarAharon-3565-2 Large.jpeg',
        '/gallery/BarAharon-3345 Large.jpeg',
        '/gallery/BarAharon-3097 Large.jpeg'
    ];

    useEffect(() => {
        setIsLoaded(true);

        const subtitleInterval = setInterval(() => {
            setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
        }, 3000);

        const backgroundInterval = setInterval(() => {
            setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
        }, 7000);

        return () => {
            clearInterval(subtitleInterval);
            clearInterval(backgroundInterval);
        };
    }, []);

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 right-0 left-0 h-1 bg-black/20 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <motion.div
                    className="absolute top-0 right-0 bottom-0 left-0 bg-brand origin-right"
                    style={{ scaleX }}
                />
            </motion.div>

            <header
                ref={heroRef}
                className="relative min-h-[100vh] overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {isLoaded &&
                        <motion.div
                            key={currentBackground}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0"
                            style={{ y: heroY }}
                        >
                            <motion.div
                                key={currentBackground}
                                initial={{ scale: 1.05, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    filter: "brightness(0.95)"
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut"
                                }}
                                className="relative w-full h-full"
                            >
                                <img
                                    src={backgroundImages[currentBackground]}
                                    alt="מסעדה בבאר שבע - הדרומית מסעדת בשרים כשר חלק מומלצת"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-warmDark/30" />
                                <div className="absolute inset-0 bg-gradient-to-t from-warmDark/90 via-warmDark/20 to-transparent" />
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>


                <div className="relative min-h-[100vh] flex flex-col items-center text-white px-3 sm:px-4 lg:px-6 xl:px-8">
                    <div className="h-[120px] sm:h-[140px] md:h-[80px] lg:h-[60px]"></div>
                    <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-0 flex-grow flex flex-col justify-center items-center w-full max-w-7xl mx-auto">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isHeroInView ? "visible" : "hidden"}
                            className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 w-full"
                        >
                            <motion.div
                                className="relative"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/" aria-label="לוגו הדרומית">
                                    <div className="relative">
                                        <motion.div
                                            className="absolute -inset-6 sm:-inset-8 md:-inset-10 lg:-inset-12 bg-gradient-to-r from-[#FF0000]/30 via-[#FF6666]/20 to-[#FF0000]/30 rounded-full blur-2xl sm:blur-3xl"
                                            animate={{
                                                opacity: [0.3, 0.7, 0.3],
                                                scale: [0.8, 1.2, 0.8],
                                                rotate: [0, 360]
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                        <motion.div
                                            className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-white/20 via-[#FF0000]/30 to-white/20 rounded-full blur-xl sm:blur-2xl"
                                            animate={{
                                                opacity: [0.2, 0.6, 0.2],
                                                scale: [1.1, 0.9, 1.1],
                                                rotate: [360, 0]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />

                                        <motion.div
                                            className="relative p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-2xl rounded-[20px] sm:rounded-[30px] md:rounded-[35px] lg:rounded-[40px] border border-white/30 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.8)] sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
                                            animate={{
                                                boxShadow: [
                                                    "0_15px_35px_-8px_rgba(0,0,0,0.8), inset_0_1px_0_rgba(255,255,255,0.1)",
                                                    "0_20px_40px_-8px_rgba(255,0,0,0.3), inset_0_1px_0_rgba(255,255,255,0.2)",
                                                    "0_15px_35px_-8px_rgba(0,0,0,0.8), inset_0_1px_0_rgba(255,255,255,0.1)"
                                                ]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <motion.img
                                                src="/logo.svg"
                                                alt="לוגו מסעדת הדרומית - מסעדה מומלצת בבאר שבע מסעדת בשרים כשר חלק"
                                                className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 mx-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] sm:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                                                animate={{
                                                    scale: [1, 1.05, 1],
                                                    rotate: [0, 2, 0, -2, 0],
                                                    filter: [
                                                        "drop-shadow(0_0_20px_rgba(255,255,255,0.8))",
                                                        "drop-shadow(0_0_30px_rgba(255,0,0,0.6))",
                                                        "drop-shadow(0_0_20px_rgba(255,255,255,0.8))"
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />

                                            <motion.div
                                                className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: 0
                                                }}
                                            />
                                            <motion.div
                                                className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 w-1 h-1 bg-[#FF6666] rounded-full"
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1.5, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: 0.7
                                                }}
                                            />
                                            <motion.div
                                                className="absolute top-1/2 left-2 sm:left-3 md:left-4 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/80 rounded-full"
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: 1.4
                                                }}
                                            />
                                        </motion.div>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div
                                className="relative w-full max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl mx-auto"
                                variants={itemVariants}
                            >
                                <div className="relative">
                                    <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 bg-warmDark/40 backdrop-blur-xl rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border border-white/10 shadow-2xl">
                                        <motion.h1
                                            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-center text-white mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-md"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        >
                                            הדרומית - מסעדה בבאר שבע
                                        </motion.h1>

                                        <div className="relative">
                                            <AnimatePresence mode="wait">
                                                <motion.p
                                                    key={currentSubtitle}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -15 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-center text-warmBg/90"
                                                >
                                                    {subtitles[currentSubtitle]}
                                                </motion.p>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col items-center gap-10"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center w-full max-w-3xl mx-auto px-4">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative w-full sm:w-auto"
                                    >
                                        <Link
                                            to="/menu"
                                            className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 text-base sm:text-lg font-bold rounded-[16px] sm:rounded-[20px] border border-white/30 text-white hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                                        >
                                            <span className="tracking-wide text-center">לתפריט שלנו</span>
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative w-full sm:w-auto"
                                    >
                                        <a
                                            href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleReservationClick}
                                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-4 text-base sm:text-lg font-bold rounded-[16px] sm:rounded-[20px] bg-brand text-white shadow-[0_8px_20px_rgba(237,29,36,0.2)] hover:shadow-[0_12px_25px_rgba(237,29,36,0.4)] transition-all duration-300"
                                        >
                                            <Calendar className="w-5 h-5 ml-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                                            <span className="relative z-10 tracking-wide text-center">הזמן שולחן אונליין</span>
                                        </a>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="relative cursor-pointer group mt-4 sm:mt-8"
                                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                    whileHover={{ y: 5 }}
                                >
                                    <div className="p-4 rounded-full bg-warmDark/30 backdrop-blur-md border border-white/10 group-hover:border-brand/50 transition-colors duration-300">
                                        <ChevronDown className="w-6 h-6 text-white/70 group-hover:text-brand transition-colors duration-300" />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white/60 text-sm font-medium whitespace-nowrap">גלול למטה</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="fixed left-8 bottom-8 z-40"
                >
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mb-4 flex flex-col items-center space-y-4"
                            >
                                <motion.a
                                    href="tel:0796744711"
                                    onClick={handleCallClick}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    transition={{ delay: 0.1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand/90 transition-colors">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <span className="text-white text-sm font-semibold drop-shadow-lg">חייג אלינו</span>
                                </motion.a>
                                <motion.a
                                    href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleReservationClick}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    transition={{ delay: 0.2 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand/90 transition-colors">
                                        <Calendar className="w-7 h-7" />
                                    </div>
                                    <span className="text-white text-sm font-semibold drop-shadow-lg">הזמן מקום</span>
                                </motion.a>
                                <motion.a
                                    href="https://www.google.com/maps?q=31.22244798333614,34.80355542130626"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    transition={{ delay: 0.3 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand/90 transition-colors">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <span className="text-white text-sm font-semibold drop-shadow-lg">נווט אלינו</span>
                                </motion.a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand/90 transition-colors"
                        animate={{ rotate: isMenuOpen ? 45 : 0 }}
                    >
                        {isMenuOpen ? <X size={32} /> : <Plus size={32} />}
                    </motion.button>
                </motion.div>
            </header>
        </>
    );
}
