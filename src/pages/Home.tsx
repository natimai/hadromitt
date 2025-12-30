import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Star, MapPin, Utensils, Quote, ThumbsUp, Phone, Calendar, ArrowLeft, ArrowRight, X, Plus, Check, ShoppingCart } from 'lucide-react';
import { gtagEvent } from '../utils/gtag';

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

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

  // מערך תמונות רקע מהגלריה
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
    
    // אוטומציה לסקירת ביקורות
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    const subtitleInterval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 3000);

    // טיימר להחלפת תמונות רקע
    const backgroundInterval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearInterval(subtitleInterval);
      clearInterval(backgroundInterval);
    };
  }, []);

  // אפקט פראלקס לתמונת הרקע
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // אנימציית כניסה לאלמנטים
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



  const reviews = [
    {
      name: 'ניסן בן שושן',
      role: 'רימון הנדסה ושמאות',
      rating: 5,
      content: 'מקום נהדר, המנות היו טעימות מאוד! מגוון רחב של סלטים טריים, שירות מעולה ואווירה מצויינת. הסטייק היה מושלם והצוות היה אדיב במיוחד. אין ספק שאחזור',
      date: 'לפני 6 ימים',
      image: '/gallery/BarAharon-3565-2 Large.jpeg'
    },
    {
      name: 'יוסי כהן',
      role: 'ממליץ מקומי',
      rating: 5,
      content: 'אכלנו היום לא פעם ראשונה וכמו תמיד שירות מצויין. אוכל טעים וטרי, סלטים טריים ומגוונים. אווירה טובה, הצוות עובר בין השולחנות ובודק שהכל טוב. ממליץ בחום!',
      date: 'לפני 3 חודשים',
      image: '/gallery/BarAharon-3097 Large.jpeg'
    },
    {
      name: 'הראל שטרן',
      rating: 5,
      content: 'חוויה קולינרית מושלמת! הזמנו מקום וישר נכנסנו למסעדה. סלטים מעולים וטעימים, גם הלאפות נהדרות. הזמנו סטייק, פילה בקר, פיקניה ופרגיות - הכל הגיע במידת העשייה המבוקשת וללא עיכובים. אוכל טעים ברמה גבוהה',
      date: 'לפני 5 חודשים',
      image: '/gallery/BarAharon-3402 Large.jpeg'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#1A0000] to-black">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 right-0 left-0 h-1 bg-black/20 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-l from-[#FF0000] to-[#CC0000] origin-right"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Hero Section */}
      <header 
        ref={heroRef}
        className="relative min-h-[100vh] overflow-hidden"
      >
        {/* Background with multiple layers for depth */}
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
                initial={{ scale: 1.05 }}
                animate={{ 
                  scale: [1.05, 1.02, 1.05],
                  filter: ["brightness(0.85) saturate(1.1)", "brightness(0.9) saturate(1.2)", "brightness(0.85) saturate(1.1)"]
                }}
                transition={{ 
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full h-full"
              >
                <img 
                  src={backgroundImages[currentBackground]}
                  alt="מסעדה בבאר שבע - הדרומית מסעדת בשרים כשר חלק מומלצת" 
                  className="w-full h-full object-cover"
                />
                
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0000]/40 via-transparent to-[#1A0000]/40" />
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: 'radial-gradient(ellipse at center bottom, rgba(255,0,0,0.1) 0%, rgba(26,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)',
                  }}
                />
                
                {/* Animated particles overlay */}
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 80%, rgba(255,0,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,100,100,0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 60% 20%, rgba(255,0,0,0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255,100,100,0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 80%, rgba(255,0,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,100,100,0.2) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
        
        {/* Floating geometric elements - responsive */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-[#FF0000]/30 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white/40 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/5 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-[#FF6666]/20 rounded-full"
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 2
            }}
          />
          {/* Additional mobile-optimized floating elements */}
          <motion.div
            className="absolute top-1/2 right-1/5 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/30 rounded-full hidden sm:block"
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#FF0000]/40 rounded-full"
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.6, 1]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: 1.5
            }}
          />
        </div>
        
        <div className="relative min-h-[100vh] flex flex-col items-center text-white px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="h-[120px] sm:h-[140px] md:h-[80px] lg:h-[60px]"></div> {/* Responsive space for navbar */}
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
                    {/* Multiple glowing rings - responsive */}
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
                    
                    {/* Glass morphism container - responsive */}
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
                      
                      {/* Sparkle effects - responsive positioning */}
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
                  {/* Enhanced background with multiple layers - responsive */}
                  <motion.div 
                    className="absolute -inset-6 sm:-inset-8 md:-inset-10 lg:-inset-12 bg-gradient-to-r from-[#FF0000]/20 via-transparent to-[#FF0000]/20 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] lg:rounded-[45px] blur-2xl sm:blur-3xl"
                    animate={{ 
                      opacity: [0.2, 0.5, 0.2],
                      scale: [0.9, 1.1, 0.9],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="absolute -inset-3 sm:-inset-4 md:-inset-6 bg-gradient-to-br from-white/10 via-[#FF0000]/20 to-black/30 rounded-[25px] sm:rounded-[30px] md:rounded-[35px] blur-lg sm:blur-xl"
                    animate={{ 
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1.05, 0.95, 1.05]
                    }}
                    transition={{ 
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Main content container with enhanced glass effect - responsive */}
                  <motion.div 
                    className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 bg-gradient-to-br from-white/15 via-black/30 to-black/40 backdrop-blur-2xl sm:backdrop-blur-3xl rounded-[20px] sm:rounded-[25px] md:rounded-[30px] lg:rounded-[35px] border border-white/20 sm:border-2 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.9)] sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]"
                    animate={{
                      borderColor: [
                        "rgba(255,255,255,0.2)",
                        "rgba(255,0,0,0.3)",
                        "rgba(255,255,255,0.2)"
                      ],
                      boxShadow: [
                        "0_15px_35px_-8px_rgba(0,0,0,0.9), inset_0_1px_0_rgba(255,255,255,0.1)",
                        "0_20px_40px_-8px_rgba(255,0,0,0.4), inset_0_1px_0_rgba(255,255,255,0.2)",
                        "0_15px_35px_-8px_rgba(0,0,0,0.9), inset_0_1px_0_rgba(255,255,255,0.1)"
                      ]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* כותרת H1 עיקרית לSEO - responsive */}
                    <motion.h1 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-center text-white mb-4 sm:mb-6 md:mb-8 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <motion.span 
                        className="bg-gradient-to-r from-white via-[#FF6666] to-white bg-clip-text text-transparent inline-block"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          textShadow: [
                            "0_0_15px_rgba(255,255,255,0.3)",
                            "0_0_25px_rgba(255,0,0,0.5)",
                            "0_0_15px_rgba(255,255,255,0.3)"
                          ]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        הדרומית - מסעדה בבאר שבע
                      </motion.span>
                    </motion.h1>
                    
                    {/* Animated subtitle with enhanced effects - responsive */}
                    <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentSubtitle}
                          initial={{ opacity: 0, y: 30, rotateX: 90, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                            scale: 1,
                          transition: {
                              duration: 1.2,
                            ease: [0.16, 1, 0.3, 1]
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          y: -30, 
                          rotateX: -90,
                            scale: 0.8,
                          transition: {
                              duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                          }
                        }}
                          className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-center relative px-2"
                      >
                        <motion.span 
                            className="bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent inline-block relative"
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }}
                          transition={{
                              duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          {subtitles[currentSubtitle]}
                            
                            {/* Underline effect - responsive */}
                            <motion.div
                              className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF0000] to-transparent"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: [0, 1, 0] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                        </motion.span>
                      </motion.p>
                    </AnimatePresence>
                  </div>
                    
                    {/* Decorative elements - responsive positioning */}
                    <motion.div
                      className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-2 sm:w-3 h-2 sm:h-3 bg-[#FF0000]/60 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 0
                      }}
                    />
                    <motion.div
                      className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/70 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1.5
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center gap-10"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center w-full max-w-3xl mx-auto px-4">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full sm:w-auto"
                  >
                    {/* Glowing background for menu button - responsive */}
                    <motion.div
                      className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#FF0000]/50 to-[#CC0000]/50 rounded-[18px] sm:rounded-[22px] md:rounded-[25px] blur-sm sm:blur-lg"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <Link 
                      to="/menu"
                      className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 md:px-9 lg:px-10 py-4 sm:py-4 md:py-5 text-base sm:text-lg md:text-lg font-bold overflow-hidden rounded-[16px] sm:rounded-[18px] md:rounded-[20px] border border-[#FF0000]/30 sm:border-2"
                    >
                      {/* Animated background layers */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#FF0000] via-[#FF3333] to-[#CC0000]"
                        animate={{
                          background: [
                            'linear-gradient(45deg, #FF0000, #FF3333, #CC0000)',
                            'linear-gradient(135deg, #CC0000, #FF0000, #FF3333)',
                            'linear-gradient(225deg, #FF3333, #CC0000, #FF0000)',
                            'linear-gradient(315deg, #FF0000, #FF3333, #CC0000)'
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      
                      {/* Shine effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                      
                      {/* Ripple effect on hover */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{
                          scale: [0, 1.5],
                          opacity: [0.3, 0]
                        }}
                        transition={{ duration: 0.6 }}
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
                        }}
                      />
                      
                      <span className="relative text-white font-extrabold tracking-wide text-center">לתפריט שלנו</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full sm:w-auto"
                  >
                    {/* Glowing background for reservation button - responsive */}
                    <motion.div
                      className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-white/20 to-[#FF0000]/30 rounded-[18px] sm:rounded-[22px] md:rounded-[25px] blur-sm sm:blur-lg"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                    
                    <a 
                      href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleReservationClick}
                      className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 md:px-9 lg:px-10 py-4 sm:py-4 md:py-5 text-base sm:text-lg md:text-lg font-bold overflow-hidden rounded-[16px] sm:rounded-[18px] md:rounded-[20px] bg-gradient-to-br from-white/15 via-black/20 to-black/30 backdrop-blur-xl sm:backdrop-blur-2xl border border-white/30 sm:border-2 hover:border-white/50 transition-all duration-500"
                    >
                      {/* Animated background */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-white/20 via-[#FF0000]/10 to-white/20 opacity-0 group-hover:opacity-100"
                        animate={{
                          background: [
                            'linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,0,0,0.1), rgba(255,255,255,0.2))',
                            'linear-gradient(180deg, rgba(255,0,0,0.1), rgba(255,255,255,0.2), rgba(255,0,0,0.1))',
                            'linear-gradient(270deg, rgba(255,255,255,0.2), rgba(255,0,0,0.1), rgba(255,255,255,0.2))'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      {/* Moving light effect */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        animate={{
                          background: [
                            'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                            'linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)',
                            'linear-gradient(225deg, transparent, rgba(255,255,255,0.3), transparent)',
                            'linear-gradient(315deg, transparent, rgba(255,255,255,0.3), transparent)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      <Calendar className="w-5 sm:w-5 md:w-6 h-5 sm:h-5 md:h-6 ml-2 sm:ml-3 relative z-10 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                      <span className="relative z-10 text-white font-extrabold tracking-wide text-center">הזמן שולחן אונליין</span>
                    </a>
                  </motion.div>
                </div>

                <motion.div
                  className="relative cursor-pointer group mt-4 sm:mt-6 md:mt-8"
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glowing ring around the arrow - responsive */}
                  <motion.div
                    className="absolute -inset-4 sm:-inset-5 md:-inset-6 rounded-full border border-[#FF0000]/30 sm:border-2"
                  animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.8, 0.3],
                      borderColor: [
                        "rgba(255,0,0,0.3)",
                        "rgba(255,102,102,0.6)",
                        "rgba(255,0,0,0.3)"
                      ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  />
                  
                  {/* Pulsing background - responsive */}
                  <motion.div
                    className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-[#FF0000]/20 to-[#FF6666]/20 blur-md sm:blur-lg"
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  
                  {/* Main arrow container - responsive */}
                  <motion.div
                    className="relative p-3 sm:p-4 rounded-full bg-gradient-to-br from-white/10 to-black/20 backdrop-blur-xl border border-white/20 group-hover:border-[#FF0000]/50"
                    animate={{ 
                      y: [0, 8, 0],
                      boxShadow: [
                        "0_8px_20px_-4px_rgba(0,0,0,0.3)",
                        "0_12px_30px_-4px_rgba(255,0,0,0.4)",
                        "0_8px_20px_-4px_rgba(0,0,0,0.3)"
                      ]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ChevronDown 
                      className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-[#FF6666] group-hover:text-[#FF0000] transition-colors duration-300 relative z-10" 
                    />
                    
                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                          'linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)',
                          'linear-gradient(225deg, transparent, rgba(255,255,255,0.3), transparent)',
                          'linear-gradient(315deg, transparent, rgba(255,255,255,0.3), transparent)'
                        ]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                  
                  {/* Floating text hint - responsive */}
                  <motion.div
                    className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-white/80 text-xs sm:text-sm font-medium whitespace-nowrap">גלול למטה</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Quick Access Menu */}
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
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A0000]/80 text-white shadow-lg backdrop-blur-lg hover:bg-[#1A0000]/90 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-white text-sm font-medium">חייג אלינו</span>
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
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A0000]/80 text-white shadow-lg backdrop-blur-lg hover:bg-[#1A0000]/90 transition-colors">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="text-white text-sm font-medium">הזמן מקום</span>
                </motion.a>
                <Link
                  to="/order"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A0000]/80 text-white shadow-lg backdrop-blur-lg hover:bg-[#1A0000]/90 transition-colors">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <span className="text-white text-sm font-medium">הזמן עכשיו</span>
                </Link>
                <motion.a
                  href="https://www.google.com/maps?q=31.22244798333614,34.80355542130626"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A0000]/80 text-white shadow-lg backdrop-blur-lg hover:bg-[#1A0000]/90 transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-white text-sm font-medium">נווט אלינו</span>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-lg hover:bg-[#CC0000] transition-colors"
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
          >
            {isMenuOpen ? <X size={32} /> : <Plus size={32} />}
          </motion.button>
        </motion.div>
      </header>

      {/* מאפיינים מיוחדים */}
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

      {/* ביקורות */}
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
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/50 to-transparent"></div>
                  </motion.div>

                  <div className="bg-[#1A0000]/40 backdrop-blur-sm p-8 rounded-2xl">
                    <div className="flex items-start mb-6">
                      <Quote className="text-[#FF0000] w-12 h-12 mt-1 ml-4 transform -scale-x-100" />
                      <div>
                        <h3 className="text-2xl font-bold text-white">{reviews[currentReview].name}</h3>
                        {reviews[currentReview].role && (
                          <p className="text-[#FF6666] text-lg">{reviews[currentReview].role}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex mb-6">
                      {[...Array(reviews[currentReview].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-[#FF0000] fill-[#FF0000]" />
                      ))}
                    </div>
                    <p className="text-gray-200 text-xl mb-6 leading-relaxed">
                      {reviews[currentReview].content}
                    </p>
                    <p className="text-gray-400">{reviews[currentReview].date}</p>
                  </div>
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentReview === index ? 'bg-[#FF0000]' : 'bg-white/20'
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

      {/* קריאה לפעולה */}
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
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-bold hover:bg-white/20 transition-colors"
                >
                  <Utensils className="w-5 h-5" />
                  לתפריט המלא
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}