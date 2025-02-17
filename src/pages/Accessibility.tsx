import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility, Check, Users, Phone, Settings, Eye } from 'lucide-react';

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
      title: "התאמות נגישות באתר",
      content: `אתר הדרומית הותאם לשימוש עבור אנשים עם מוגבלויות וכולל:
• תמיכה בתוכנות קריאת מסך
• אפשרות לניווט באמצעות מקלדת
• תיאורי תמונות חלופיים
• ניגודיות צבעים מותאמת
• אפשרות להגדלת טקסט
• מבנה אתר ברור ועקבי`
    },
    {
      icon: <Users className="w-6 h-6 text-[#FF0000]" />,
      title: "נגישות במסעדה",
      content: `המסעדה מותאמת פיזית לאנשים עם מוגבלויות:
• חניית נכים בסמוך לכניסה
• גישה נוחה לכיסאות גלגלים
• שירותים מותאמים
• תפריט בכתב ברייל (לפי בקשה)
• צוות מיומן ומודע לצרכי נגישות
• אפשרות להזמנת מקום מראש`
    },
    {
      icon: <Settings className="w-6 h-6 text-[#FF0000]" />,
      title: "כלי נגישות",
      content: `האתר מציע מגוון כלי נגישות:
• שינוי גודל טקסט
• שינוי ניגודיות צבעים
• עצירת אנימציות
• הדגשת קישורים
• מצב קריאה מונגש
• סימון כותרות`
    },
    {
      icon: <Eye className="w-6 h-6 text-[#FF0000]" />,
      title: "מחויבות לשיפור מתמיד",
      content: `אנו פועלים באופן מתמיד לשיפור הנגישות:
• בדיקות תקופתיות של הנגישות
• עדכון והתאמה לטכנולוגיות חדשות
• הדרכות צוות בנושא נגישות
• קבלת משוב מהמשתמשים
• התייעצות עם מומחי נגישות`
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
              אנו מאמינים שלכל אדם מגיעה הזכות ליהנות מהשירותים שלנו
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
              אתר הדרומית מחויב להנגשת השירותים שלו לאנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ותקנות הנגישות.
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
            <h2 className="text-2xl font-bold mb-4">צריכים עזרה?</h2>
            <p className="text-gray-300 mb-4">
              נתקלתם בבעיית נגישות? אנחנו כאן בשבילכם
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">רכז הנגישות: ישראל ישראלי</p>
              <p className="text-gray-300">טלפון: 079-674-4711</p>
              <p className="text-gray-300">דוא"ל: accessibility@hadromit.co.il</p>
              <p className="text-gray-300">כתובת: רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants} className="text-sm text-gray-400 text-center">
            <p>
              אנו ממשיכים לשפר את נגישות האתר והשירותים שלנו. אם נתקלתם בבעיה או יש לכם הצעות לשיפור, נשמח לשמוע מכם.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 