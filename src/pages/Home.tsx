import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Star, Clock, MapPin, Utensils, Quote, ThumbsUp, Phone, Calendar, ArrowLeft, ArrowRight, X, Menu, Plus } from 'lucide-react';

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);

  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleX = useSpring(scrollYProgress, springConfig);

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["rgba(26, 0, 0, 0.3)", "rgba(26, 0, 0, 0.95)"]
  );

  useEffect(() => {
    setIsLoaded(true);
    
    // אוטומציה לסקירת ביקורות
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
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
      description: 'טעמים מסורתיים בגרסה מודרנית',
      icon: <Utensils className="w-8 h-8" />,
      image: '/gallery/BarAharon-3565-2 Large.jpeg'
    },
    {
      title: 'אווירה ייחודית',
      description: 'חוויה קולינרית בלתי נשכחת',
      icon: <Star className="w-8 h-8" />,
      image: '/gallery/BarAharon-3097 Large.jpeg'
    },
    {
      title: 'מיקום מרכזי',
      description: 'רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע',
      icon: <MapPin className="w-8 h-8" />,
      image: '/gallery/BarAharon-3402 Large.jpeg'
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
      content: 'מקום נהדר, המנות היו טעימות, מגוון רחב של סלטים, שירות ואווירה מצויינים. אין ספק שאחזור',
      date: 'לפני 6 ימים'
    },
    {
      name: 'יוסי כהן',
      role: 'ממליץ מקומי',
      rating: 5,
      content: 'אכלנו היום לא פעם ראשונה וכמו תמיד שירות מצויין. אוכל טעים וטרי, סלטים טריים. אווירה טובה, טל לב עובר בין השולחנות ובודק אם הכל טוב כל כמה דק וגם המלצרים מוודאים שהכל טעים.',
      date: 'לפני 3 חודשים'
    },
    {
      name: 'הראל שטרן',
      rating: 5,
      content: 'הזמנו מקום וישר נכנסנו למסעדה. סלטים אליפות ממש טעמים, גם הלאפות. הזמנו סטייק,פילה בקר,פיקניה ופרגיות הגיעו במידת העשייה שביקשנו ללא עיכובים. אוכל טעים ברמה גבוהה',
      date: 'לפני 5 חודשים'
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
        className="relative h-screen overflow-hidden"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
              style={{ y: heroY }}
            >
              <img 
                src="/hero.jpeg"
                alt="Restaurant ambiance" 
                className="w-full h-full object-cover transition-all duration-1000"
                style={{ 
                  transform: isHoveringHero ? 'scale(1.05)' : 'scale(1)',
                  filter: isHoveringHero ? 'brightness(1.1)' : 'brightness(1)'
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/80 via-transparent to-[#1A0000]/80"
                style={{ backgroundColor: overlayOpacity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-[#FF0000] drop-shadow-2xl">
                הדרומית
              </h1>
              <div className="absolute -inset-1 bg-[#FF0000]/20 blur-xl -z-10 rounded-full" />
            </motion.div>

            <motion.p 
              className="text-2xl md:text-3xl text-[#F5F5F5] drop-shadow-lg"
              variants={itemVariants}
            >
              חוויה קולינרית דרומית אותנטית
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-8"
            >
              <div className="flex gap-4">
                <Link 
                  to="/menu"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold overflow-hidden rounded-full transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#CC0000] transition-transform"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#CC0000] to-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative text-white">לתפריט שלנו</span>
                </Link>

                <a 
                  href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold overflow-hidden rounded-full bg-white text-[#1A0000] hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#CC0000] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Calendar className="w-5 h-5 ml-2 relative" />
                  <span className="relative">הזמן שולחן אונליין</span>
                </a>
              </div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="cursor-pointer text-[#FF6666] hover:text-[#FF0000] transition-colors"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <ChevronDown className="w-8 h-8" />
              </motion.div>
            </motion.div>
          </motion.div>
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
                  href="https://goo.gl/maps/xxxxx"
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

      {/* Interactive Features Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/50 to-black/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 backdrop-blur-sm transform hover:scale-105 ${
                    activeFeature === index 
                      ? 'bg-gradient-to-r from-[#FF0000]/90 to-[#CC0000]/90 text-white shadow-xl' 
                      : 'bg-[#1A0000]/30 text-white hover:bg-[#1A0000]/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${
                      activeFeature === index ? 'text-white' : 'text-[#FF6666]'
                    } transition-colors duration-300`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className={
                        activeFeature === index 
                          ? 'text-white/90' 
                          : 'text-[#F5F5F5]/70'
                      }>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeFeature}
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000]/90 via-[#1A0000]/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/90 to-black/95"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#FF0000] mb-4">מה אומרים עלינו</h2>
            <p className="text-xl text-[#F5F5F5]">הלקוחות שלנו מספרים</p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gradient-to-br from-[#1A0000] to-black/40 p-8 rounded-2xl backdrop-blur-sm max-w-3xl mx-auto"
              >
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
                <p className="text-[#F5F5F5] text-xl mb-6 leading-relaxed">
                  {reviews[currentReview].content}
                </p>
                <p className="text-[#F5F5F5]/60">{reviews[currentReview].date}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
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
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/gallery/BarAharon-3565-2 Large.jpeg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/80 to-[#1A0000]/60 backdrop-blur-sm"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-[#FF0000] drop-shadow-2xl">
                רוצים להזמין שולחן?
              </h2>
              <div className="absolute -inset-1 bg-[#FF0000]/20 blur-xl -z-10 rounded-full"></div>
            </div>
            <p className="text-xl text-[#F5F5F5] drop-shadow-lg">הבטיחו את מקומכם במסעדה</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=61bf129cfa6d8c2d451c0d99&source=tabit&type=future_reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#CC0000] transition-transform"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#CC0000] to-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Clock className="relative w-5 h-5 text-white" />
                  <span className="relative text-white">להזמנת מקום</span>
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>צור קשר</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}