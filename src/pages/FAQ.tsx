import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Clock, MapPin, UtensilsCrossed, Calendar, Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // כשרות
  {
    question: 'מה רמת הכשרות במסעדה?',
    answer: 'המסעדה שלנו כשרה למהדרין חלק בהשגחת הרבנות המקומית באר שבע. אנו מקפידים על כשרות ברמה הגבוהה ביותר ומפוקחים באופן קבוע על ידי משגיח כשרות.',
    category: 'כשרות'
  },
  {
    question: 'האם יש תעודת כשרות עדכנית?',
    answer: 'כן, תעודת הכשרות שלנו מחודשת באופן קבוע ומוצגת בכניסה למסעדה. ניתן גם לראות אותה באתר באזור הכניסה.',
    category: 'כשרות'
  },
  {
    question: 'מהו "כשר חלק"?',
    answer: 'כשרות חלק היא רמת כשרות מחמירה יותר בה נבדקים החלקים הפנימיים של בהמות הכשר (ריאות בעיקר) כדי לוודא שאין בהם פגמים. זוהי רמת כשרות גבוהה שמקובלת על רוב הציבור הדתי.',
    category: 'כשרות'
  },
  
  // שעות פתיחה
  {
    question: 'מה שעות הפתיחה של המסעדה?',
    answer: 'המסעדה פתוחה בימים א\'-ד\' משעה 12:00 עד 23:00, ביום ה\' משעה 12:00 עד 00:00, ובמוצאי שבת משעה 20:00 עד 00:00. אנו סגורים בשבת.',
    category: 'שעות פתיחה'
  },
  {
    question: 'האם אפשר להזמין מקום מראש?',
    answer: 'בהחלט! אנו ממליצים בחום להזמין מקום מראש דרך מערכת ההזמנות שלנו או בטלפון 079-674-4711, במיוחד בסופי שבוע ובחגים.',
    category: 'שעות פתיחה'
  },
  {
    question: 'האם המסעדה פתוחה בחגים?',
    answer: 'בחגי ישראל אנו פועלים לפי שעות מיוחדות. מומלץ לבדוק במוקד או באתר לפני ההגעה לקבלת מידע עדכני על שעות הפעילות בחגים.',
    category: 'שעות פתיחה'
  },
  
  // חניה ונגישות
  {
    question: 'האם יש חניה במקום?',
    answer: 'כן, יש חניה מרווחת וחינמית בסמוך למסעדה במתחם ישפרו סנטר. החניה נגישה ומוארת היטב.',
    category: 'חניה ונגישות'
  },
  {
    question: 'האם המסעדה נגישה לאנשים עם מוגבלויות?',
    answer: 'כן, המסעדה מותאמת באופן מלא לאנשים עם מוגבלויות כולל כניסה נגישה, שירותים מותאמים ומקומות ישיבה נוחים.',
    category: 'חניה ונגישות'
  },
  {
    question: 'איפה בדיוק ממוקמת המסעדה?',
    answer: 'המסעדה ממוקמת ברח\' צבי טאוב, מתחם ישפרו סנטר בבאר שבע. ניתן לנווט אלינו ב-Waze או Google Maps.',
    category: 'חניה ונגישות'
  },
  
  // תפריט ואוכל
  {
    question: 'האם יש תפריט צמחוני/טבעוני?',
    answer: 'בעוד שאנו מסעדת בשרים, יש לנו מגוון רחב של סלטים טריים ומנות פתיחה צמחוניות. כמו כן, ניתן להתאים מנות מסוימות לצמחונים.',
    category: 'תפריט ואוכל'
  },
  {
    question: 'מהן המנות המומלצות ביותר?',
    answer: 'המנות הפופולריות ביותר שלנו כוללות: סטייק אנטריקוט, מדליוני פילה בקר, צלעות כבש, ו"הדרומית" - מנה מיוחדת המשלבת מגוון בשרים על האש.',
    category: 'תפריט ואוכל'
  },
  {
    question: 'האם אפשר להוריד את התפריט?',
    answer: 'כן, ניתן לצפות בתפריט המלא באתר שלנו בעמוד "תפריט" ולהוריד אותו כ-PDF.',
    category: 'תפריט ואוכל'
  },
  {
    question: 'האם יש תפריט ילדים?',
    answer: 'כן, יש לנו תפריט מיוחד לילדים הכולל שניצל, המבורגר, נקניקיות ותוספות. ילדים עד גיל 6 אוכלים חינם מסלטי הבית בהזמנת מנה עיקרית.',
    category: 'תפריט ואוכל'
  },
  
  // אירועים
  {
    question: 'האם אפשר לערוך אירועים במסעדה?',
    answer: 'כן! יש לנו חדרי VIP מפוארים המתאימים לאירועים קטנים עד 50 איש. האירועים כוללים תפריט מותאם, שירות צמוד ואווירה אינטימית.',
    category: 'אירועים'
  },
  {
    question: 'מה גודל חדרי ה-VIP?',
    answer: 'חדרי ה-VIP שלנו יכולים להכיל בין 15 ל-50 אורחים בהתאם לסידור הישיבה. ניתן להתאים את החלל לצרכים המדויקים של האירוע.',
    category: 'אירועים'
  },
  {
    question: 'האם אפשר להזמין קייטרינג?',
    answer: 'כן, אנו מספקים שירותי קייטרינג לאירועים בחוץ. צור קשר לפרטים ולהצעת מחיר מותאמת אישית.',
    category: 'אירועים'
  },
  
  // אלרגיות ותזונה
  {
    question: 'יש לי אלרגיה למזון, איך אני יכול לברר על המנות?',
    answer: 'מומלץ ליידע את המלצר על כל אלרגיה או רגישות למזון. הצוות שלנו יכול לספק מידע מפורט על רכיבי כל מנה ולהתאים המלצות בהתאם.',
    category: 'אלרגיות ותזונה'
  },
  {
    question: 'האם יש מנות ללא גלוטן?',
    answer: 'כן, יש לנו אפשרויות ללא גלוטן. אנא יידע את המלצר והוא יסייע לך לבחור מנות מתאימות.',
    category: 'אלרגיות ותזונה'
  },
  
  // תשלום
  {
    question: 'אילו אמצעי תשלום מקובלים?',
    answer: 'אנו מקבלים מזומן, כרטיסי אשראי (ויזה, מאסטרקארד, אמריקן אקספרס), ביט ותשלומים בצ\'קים.',
    category: 'תשלום'
  },
  {
    question: 'האם ניתן לפצל חשבון?',
    answer: 'כן, אנו מאפשרים לפצל חשבונות בין סועדים בקלות. המלצרים שלנו ישמחו לעזור.',
    category: 'תשלום'
  }
];

const categories = [
  { name: 'הכל', icon: <HelpCircle className="w-5 h-5" /> },
  { name: 'כשרות', icon: <Shield className="w-5 h-5" /> },
  { name: 'שעות פתיחה', icon: <Clock className="w-5 h-5" /> },
  { name: 'חניה ונגישות', icon: <MapPin className="w-5 h-5" /> },
  { name: 'תפריט ואוכל', icon: <UtensilsCrossed className="w-5 h-5" /> },
  { name: 'אירועים', icon: <Calendar className="w-5 h-5" /> },
  { name: 'אלרגיות ותזונה', icon: <Shield className="w-5 h-5" /> },
  { name: 'תשלום', icon: <Shield className="w-5 h-5" /> }
];

export default function FAQ(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === 'הכל' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>שאלות נפוצות - הדרומית מסעדת בשרים בבאר שבע</title>
        <meta name="description" content="שאלות נפוצות על מסעדת הדרומית - כשרות, שעות פתיחה, תפריט, אירועים ועוד. קבלו תשובות לכל השאלות שלכם." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block p-4 bg-[#FF0000]/20 rounded-full mb-6"
            >
              <HelpCircle className="w-16 h-16 text-[#FF0000]" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">שאלות נפוצות</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              כל מה שרציתם לדעת על מסעדת הדרומית
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="חפש שאלה..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Category Filter - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 -mx-4 px-4 md:mx-0 md:px-0"
          >
            <div className="overflow-x-auto pb-2 scrollbar-hide md:overflow-visible">
              <div className="flex md:flex-wrap md:justify-center gap-3 min-w-max md:min-w-0">
                {categories.map((category) => (
                  <motion.button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`
                      flex items-center gap-2 px-5 py-3 rounded-full 
                      transition-all duration-300 whitespace-nowrap
                      min-h-[48px] touch-manipulation flex-shrink-0
                      ${selectedCategory === category.name
                        ? 'bg-[#FF0000] text-white shadow-lg shadow-red-500/50'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 active:bg-white/30'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <AnimatePresence mode="wait">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-300"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-right min-h-[72px] touch-manipulation active:bg-white/5 transition-colors"
                      aria-expanded={openIndex === index}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {searchQuery && (
                            <span dangerouslySetInnerHTML={{
                              __html: faq.question.replace(
                                new RegExp(searchQuery, 'gi'),
                                (match) => `<mark class="bg-[#FF0000]/30 text-white">${match}</mark>`
                              )
                            }} />
                          )}
                          {!searchQuery && faq.question}
                        </h3>
                        <span className="text-sm text-[#FF6666]">{faq.category}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="mr-4"
                      >
                        <ChevronDown className="w-6 h-6 text-[#FF0000]" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-xl text-gray-400">לא נמצאו שאלות התואמות את החיפוש</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-br from-[#FF0000]/20 to-[#CC0000]/20 backdrop-blur-sm p-10 rounded-3xl border border-[#FF0000]/30"
          >
            <Mail className="w-12 h-12 text-[#FF0000] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">לא מצאת את התשובה?</h2>
            <p className="text-gray-300 mb-6">
              צוות השירות שלנו זמין לעזור לך בכל שאלה
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 inline-flex items-center gap-2"
              >
                צור קשר
              </Link>
              <a
                href="tel:0796744711"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 inline-flex items-center gap-2"
              >
                התקשר עכשיו
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
