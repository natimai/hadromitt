import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, Clock, MapPin, Utensils, Quote, ThumbsUp } from 'lucide-react';

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const [activeFeature, setActiveFeature] = useState(0);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleX = useSpring(scrollYProgress, springConfig);

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["rgba(26, 0, 0, 0.3)", "rgba(26, 0, 0, 0.95)"]
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      title: 'מטבח דרומי אותנטי',
      description: 'טעמים מסורתיים בגרסה מודרנית',
      icon: <Utensils className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80'
    },
    {
      title: 'אווירה ייחודית',
      description: 'חוויה קולינרית בלתי נשכחת',
      icon: <Star className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'
    },
    {
      title: 'מיקום מרכזי',
      description: 'נגיש ונוח להגעה',
      icon: <MapPin className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80'
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
      <div className="fixed top-0 right-0 left-0 h-1 bg-black/20 z-50">
        <motion.div
          className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-l from-[#FF0000] to-[#CC0000] origin-right"
          style={{ scaleX }}
        />
      </div>

      {/* Hero Section */}
      <header className="relative h-screen">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img 
                src="/hero.jpeg"
                alt="Restaurant ambiance" 
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/80 via-transparent to-[#1A0000]/80"
                style={{ backgroundColor: overlayOpacity }}
              ></motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-[#FF0000] drop-shadow-2xl">
                הדרומית
              </h1>
              <div className="absolute -inset-1 bg-[#FF0000]/20 blur-xl -z-10 rounded-full"></div>
            </motion.div>
            <motion.p 
              className="text-2xl md:text-3xl text-[#F5F5F5] drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              חוויה קולינרית דרומית אותנטית
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col items-center gap-8"
            >
              <Link 
                to="/menu"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold overflow-hidden rounded-full transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#CC0000] transition-transform"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#CC0000] to-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative text-white">לתפריט שלנו</span>
              </Link>
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
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                    activeFeature === index 
                      ? 'bg-gradient-to-r from-[#FF0000]/90 to-[#CC0000]/90 text-white' 
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
              className="relative aspect-square rounded-2xl overflow-hidden"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000]/90 via-[#1A0000]/50 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#1A0000]/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#FF0000] mb-4">הצוות שלנו</h2>
            <p className="text-xl text-[#F5F5F5]">האנשים שעושים את הקסם</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#FF0000] font-semibold mb-2">{member.role}</p>
                  <p className="text-[#F5F5F5]/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative py-24 px-6">
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

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-[#1A0000] to-black/40 p-6 rounded-2xl backdrop-blur-sm"
              >
                <div className="flex items-start mb-4">
                  <Quote className="text-[#FF0000] w-8 h-8 mt-1 ml-2" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{review.name}</h3>
                    {review.role && (
                      <p className="text-[#FF6666] text-sm">{review.role}</p>
                    )}
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FF0000] fill-[#FF0000]" />
                  ))}
                </div>
                <p className="text-[#F5F5F5]/90 mb-4 line-clamp-4">{review.content}</p>
                <p className="text-[#F5F5F5]/60 text-sm">{review.date}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="https://g.page/r/CSKtBoitSOKpEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
            >
              <ThumbsUp className="w-5 h-5" />
              <span>השאירו ביקורת</span>
            </a>
          </motion.div>
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
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}