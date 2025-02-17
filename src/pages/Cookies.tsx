import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Info, Shield, Settings, Database } from 'lucide-react';

export default function Cookies() {
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
      icon: <Info className="w-6 h-6 text-[#FF0000]" />,
      title: "מהן עוגיות?",
      content: `עוגיות (Cookies) הן קבצי טקסט קטנים המאוחסנים על המכשיר שלכם בעת הגלישה באתר. הן מסייעות לנו לספק לכם חוויית משתמש טובה יותר ולהבין כיצד אתם משתמשים באתר.`
    },
    {
      icon: <Database className="w-6 h-6 text-[#FF0000]" />,
      title: "סוגי העוגיות שבשימוש",
      content: `• עוגיות הכרחיות: נדרשות לתפעול האתר
• עוגיות ביצועים: מסייעות לנו להבין כיצד המבקרים משתמשים באתר
• עוגיות פונקציונליות: מאפשרות שמירת העדפות אישיות
• עוגיות שיווקיות: משמשות למעקב אחר פעילות המשתמשים לצורך התאמת פרסומות`
    },
    {
      icon: <Settings className="w-6 h-6 text-[#FF0000]" />,
      title: "ניהול העדפות עוגיות",
      content: `אתם יכולים לשלוט בעוגיות ולנהל אותן באמצעות הגדרות הדפדפן שלכם:
• חסימת כל העוגיות
• מחיקת עוגיות קיימות
• הגדרת התראה לפני שמירת עוגיות
• הגדרות ספציפיות לכל אתר

שימו לב: חסימת עוגיות עלולה להשפיע על תפקוד האתר.`
    },
    {
      icon: <Shield className="w-6 h-6 text-[#FF0000]" />,
      title: "אבטחה ופרטיות",
      content: `אנו מקפידים על אבטחת המידע הנאסף באמצעות עוגיות ומשתמשים בו בהתאם למדיניות הפרטיות שלנו. המידע משמש אותנו לשיפור השירות ואינו מועבר לצדדים שלישיים ללא הסכמתכם.`
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
              <Cookie className="w-16 h-16 text-[#FF0000]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              מדיניות עוגיות
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              מידע על השימוש בעוגיות באתר שלנו וכיצד הן משפרות את חווית המשתמש
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
            <p className="text-gray-300 leading-relaxed">
              אתר הדרומית משתמש בעוגיות כדי לספק לכם את החוויה הטובה ביותר. מסמך זה מפרט את מדיניות העוגיות שלנו ומסביר כיצד אנו משתמשים בהן.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="grid gap-8 md:grid-cols-2">
            {sections.map((section, index) => (
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
            <h2 className="text-2xl font-bold mb-4">שאלות נוספות?</h2>
            <p className="text-gray-300 mb-4">
              אם יש לכם שאלות נוספות לגבי השימוש בעוגיות באתר שלנו, אתם מוזמנים ליצור איתנו קשר:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">טלפון: 079-674-4711</p>
              <p className="text-gray-300">דוא"ל: privacy@hadromit.co.il</p>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants} className="text-sm text-gray-400 text-center">
            <p>
              אנו שומרים על הזכות לעדכן את מדיניות העוגיות מעת לעת. שינויים מהותיים יפורסמו באתר.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 