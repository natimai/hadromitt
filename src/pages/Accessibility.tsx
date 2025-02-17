import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility, Check, Users, Phone, Settings, Eye, FileText } from 'lucide-react';

export default function AccessibilityPage(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const sections = [
    {
      icon: <Check className="w-6 h-6 text-[#FF0000]" />,
      title: "סטטוס התאמות הנגישות באתר",
      content: `אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג 2013.
התאמות הנגישות בוצעו עפ"י המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.1 הבינלאומי.

ההתאמות שבוצעו כוללות:
• תמיכה בתוכנות קריאת מסך ומקלדת
• תיאורי תמונות חלופיים
• ניגודיות צבעים מותאמת
• אפשרות להגדלת טקסט
• מבנה אתר ברור ועקבי
• תפריט נגישות מלא`
    },
    {
      icon: <Users className="w-6 h-6 text-[#FF0000]" />,
      title: "נגישות במסעדה",
      content: `המסעדה מותאמת פיזית בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות למקום ציבורי שהוא בניין קיים), תשע"ב-2011:
• חניות נכים תקניות בסמוך לכניסה
• דרכי גישה נגישות ומותאמות לכיסאות גלגלים
• שירותי נכים תקניים
• תפריט בכתב ברייל (לפי בקשה)
• צוות מיומן שעבר הדרכות נגישות
• כניסה מותרת לחיות שירות`
    },
    {
      icon: <Settings className="w-6 h-6 text-[#FF0000]" />,
      title: "אמצעי נגישות באתר",
      content: `האתר מציע מגוון אמצעי נגישות בהתאם לתקן:
• שינוי גודל טקסט
• שינוי ניגודיות צבעים
• עצירת אנימציות
• הדגשת קישורים
• מצב קריאה מונגש
• ניווט מקלדת
• תפריט נגישות מלא הזמין בכל עמוד`
    },
    {
      icon: <FileText className="w-6 h-6 text-[#FF0000]" />,
      title: "הצהרת נגישות לפי החוק",
      content: `בהתאם לסעיף 35 לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013, אנו מצהירים כי:

• האתר מספק מידע אודות נגישות השירות
• ניתן לקבל מידע על אודות התאמות הנגישות בשירות
• ניתן לקבל מידע בדבר נגישות המבנה שבו ניתן השירות
• קיימת אפשרות לבקש התאמות נגישות נוספות
• ניתן להגיש תלונה בנושא נגישות ולקבל מענה`
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-6">
              <Accessibility className="w-16 h-16 text-[#FF0000]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              הצהרת נגישות
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              מסעדת הדרומית מחויבת למתן שירות שוויוני לכלל לקוחותיה
            </p>
          </motion.div>

          {/* Last Updated */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-400">
              עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-center">
              בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ותקנותיו, אתר הדרומית הונגש כדי להבטיח שירות שוויוני ונגיש לכלל הציבור, לרבות אנשים עם מוגבלויות.
            </p>
          </motion.div>

          {/* Main Sections */}
          <div className="grid gap-8 md:grid-cols-2">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-gray-300 whitespace-pre-line">{section.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">פרטי רכז הנגישות</h2>
            <p className="text-gray-300 mb-4">
              בהתאם לתקנה 35 לתקנות, פרטי רכז הנגישות של העסק:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">שם: נתי מימון</p>
              <p className="text-gray-300">טלפון: 054-4445567</p>
              <p className="text-gray-300">דוא"ל: accessibility@hadromit.co.il</p>
              <p className="text-gray-300">כתובת: רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants} className="text-sm text-gray-400 text-center">
            <p>
              במידה ונתקלתם בבעיית נגישות או שיש לכם הצעות לשיפור הנגישות, נשמח לקבל פנייתכם ונטפל בה בהקדם האפשרי ולא יאוחר מ-21 ימים.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 