import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Star, Clock, MapPin, Utensils, Quote, ThumbsUp, Phone, Calendar, ArrowLeft, ArrowRight, X, Menu, Plus, Check } from 'lucide-react';

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleX = useSpring(scrollYProgress, springConfig);

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["rgba(26, 0, 0, 0.3)", "rgba(26, 0, 0, 0.95)"]
  );

  const subtitles = [
    "חוויה קולינרית דרומית אותנטית",
    "בשרים משובחים על האש",
    "אווירה ייחודית ושירות מעולה",
    "טעם של דרום בכל ביס"
  ];

  // מערך תמונות רקע מהגלריה
  const backgroundImages = [
    '/hero.jpeg',
    '/gallery/BarAharon-3565-2 Large.jpeg',
    '/gallery/BarAharon-3097 Large.jpeg',
    '/gallery/BarAharon-3402 Large.jpeg'
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
      title: 'מטבח דרומי אותנטי',
      description: 'חוויה קולינרית ייחודית המשלבת מסורת וחדשנות. בשרים איכותיים על האש, תבלינים מיוחדים וטעמים מהדרום',
      icon: <Utensils className="w-8 h-8" />,
      image: '/gallery/BarAharon-3565-2 Large.jpeg',
      highlights: ['בשר טרי ואיכותי', 'תבלינים מיוחדים', 'מתכונים מסורתיים']
    },
    {
      title: 'אווירה ייחודית',
      description: 'עיצוב מודרני המשלב אלמנטים דרומיים מסורתיים. תאורה אינטימית, מוזיקה נעימה ואווירה חמה ומזמינה',
      icon: <Star className="w-8 h-8" />,
      image: '/gallery/BarAharon-3097 Large.jpeg',
      highlights: ['עיצוב מודרני', 'אווירה אינטימית', 'ישיבה נוחה']
    },
    {
      title: 'שירות מצוין',
      description: 'צוות מקצועי ואדיב שישמח להמליץ ולהתאים את החוויה הקולינרית המושלמת עבורכם',
      icon: <ThumbsUp className="w-8 h-8" />,
      image: '/gallery/BarAharon-3402 Large.jpeg',
      highlights: ['צוות מקצועי', 'שירות אישי', 'המלצות מותאמות']
    }
  ];

  const team = [
    {
      name: 'אור לוי',
      role: 'מנהל המסעדה',
      image: '/about/or.jpeg',
      description: 'האגדה מספרת שהוא הביס צבאות שלמים בעזרת כיסא כתר בודד. האיש שלא ידע פחד מימיו, מסוגל לנהל את המסעדה בעיניים עצומות תוך כדי להכין סלט ירקות בשיניים. אומרים שכשהוא מחייך, הסטייקים מתהפכים מעצמם על הגריל.'
    },
    {
      name: 'צחי פיטקרים',
      role: 'שף ראשי',
      image: '/about/tzahi.jpeg',
      description: 'המלך של הגריל, מומחה בבשרים ובמיוחד בנקניקיות. הטעם המיוחד שלו מביא את הקסם לכל מנה.'
    },
    {
      name: 'נדב',
      role: 'איש מסתורין',
      image: '/about/nadav.jpeg',
      description: 'לא ברור מה הוא עושה במסעדה, אבל בלעדיו משהו היה חסר.'
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
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        <AnimatePresence mode="wait">
          {isLoaded &&
            <motion.div
              key={currentBackground}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
              style={{ y: heroY }}
            >
              <motion.div 
                initial={{ scale: 1.05 }}
                animate={{ 
                  scale: 1.02,
                  filter: "brightness(0.85) saturate(1.1)"
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="relative w-full h-full"
              >
                <img 
                  src={backgroundImages[currentBackground]}
                  alt="מסעדת הדרומית - חוויה קולינרית דרומית אותנטית בבאר שבע" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: 'radial-gradient(circle at center, rgba(26,0,0,0.4) 0%, rgba(26,0,0,0.8) 100%)',
                    mixBlendMode: 'multiply'
                  }}
                />
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
        
        <div className="relative min-h-[100vh] flex flex-col items-center text-white px-4">
          <div className="h-[150px] md:h-[60px]"></div> {/* Fixed space for navbar */}
          <div className="mt-10 sm:mt-0 flex-grow flex flex-col justify-center items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="space-y-8 md:space-y-16"
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
                      className="absolute -inset-8 bg-gradient-to-r from-[#FF0000]/20 via-white/10 to-[#FF0000]/20 rounded-[40px] blur-2xl"
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative p-8 bg-black/30 backdrop-blur-xl rounded-[30px] border border-white/20 shadow-2xl">
                      <motion.img 
                        src="/logo.svg" 
                        alt="לוגו מסעדת הדרומית - מסעדת בשרים כשרה בבאר שבע" 
                        className="h-40 mx-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                        animate={{
                          scale: [1, 1.02, 1],
                          rotate: [0, 1, 0, -1, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div 
                className="relative max-w-4xl mx-auto"
                variants={itemVariants}
              >
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-12 bg-gradient-to-r from-[#FF0000]/10 via-black/40 to-[#FF0000]/10 rounded-[40px] blur-2xl"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative px-10 py-8 bg-black/40 backdrop-blur-xl rounded-[30px] border border-white/20 shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentSubtitle}
                        initial={{ opacity: 0, y: 30, rotateX: 90 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                          transition: {
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1]
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          y: -30, 
                          rotateX: -90,
                          transition: {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1]
                          }
                        }}
                        className="text-4xl md:text-6xl font-bold"
                      >
                        <motion.span 
                          className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent inline-block"
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          {subtitles[currentSubtitle]}
                        </motion.span>
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center gap-10"
              >
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/menu"
                      className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold overflow-hidden rounded-[20px]"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#CC0000]"
                        animate={{
                          background: [
                            'linear-gradient(to right, #FF0000, #CC0000)',
                            'linear-gradient(to right, #CC0000, #FF0000)',
                            'linear-gradient(to right, #FF0000, #CC0000)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
                        }}
                      />
                      <span className="relative text-white">לתפריט שלנו</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold overflow-hidden rounded-[20px] bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{
                          x: ['0%', '100%', '0%']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <Calendar className="w-6 h-6 ml-3 relative" />
                      <span className="relative text-white">הזמן שולחן אונליין</span>
                    </a>
                  </motion.div>
                </div>

                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="cursor-pointer text-[#FF6666] hover:text-[#FF0000] transition-colors"
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                  <ChevronDown className="w-10 h-10" />
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
                <motion.a
                  href="https://www.google.com/maps?q=31.22244798333614,34.80355542130626"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ delay: 0.3 }}
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

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-2xl bg-[#1A0000]/40 backdrop-blur-sm"
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#FF0000]/10 rounded-full text-[#FF0000]">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center text-gray-300"
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
            alt="אווירה מיוחדת במסעדת הדרומית"
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