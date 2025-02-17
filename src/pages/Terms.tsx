import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShoppingBag, Truck, Shield, FileText, AlertCircle } from 'lucide-react';

export default function Terms(): JSX.Element {
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
      icon: <Scale className="w-6 h-6 text-[#FF0000]" />,
      title: "תנאים כלליים",
      content: `השימוש באתר הדרומית ובשירותים המוצעים בו כפוף לתנאי השימוש המפורטים להלן. גלישה באתר ו/או הזמנת מוצרים מהווה הסכמה מצדך לתנאים אלה.

אנו שומרים לעצמנו את הזכות לעדכן את תנאי השימוש מעת לעת, לפי שיקול דעתנו הבלעדי וללא הודעה מוקדמת.`
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-[#FF0000]" />,
      title: "הזמנות ותשלומים",
      content: `• המחירים באתר כוללים מע"מ
• התשלום יתבצע באמצעות כרטיס אשראי או אמצעי תשלום מאושרים אחרים
• ההזמנה תיקלט במערכת רק לאחר אישור חברת האשראי
• אנו שומרים את הזכות לבטל הזמנות במקרה של טעות מחיר או אי זמינות המוצר`
    },
    {
      icon: <Truck className="w-6 h-6 text-[#FF0000]" />,
      title: "זמני אספקה",
      content: `• זמני האספקה המצוינים באתר הם משוערים ועשויים להשתנות
• במקרה של עיכוב, נעדכן אתכם בהקדם האפשרי
• אזורי החלוקה מוגבלים לאזור באר שבע והסביבה
• משלוחים מתבצעים בימים א'-ה' בשעות הפעילות`
    },
    {
      icon: <Shield className="w-6 h-6 text-[#FF0000]" />,
      title: "אחריות והגבלות",
      content: `• האתר מסופק "כפי שהוא" (AS IS)
• איננו אחראים לנזקים עקיפים או תוצאתיים
• התמונות באתר להמחשה בלבד
• אנו שומרים את הזכות לשנות את התפריט ואת המחירים מעת לעת`
    }
  ];

  const additionalTerms = [
    {
      title: "קניין רוחני",
      content: "כל התכנים באתר, לרבות תמונות, טקסטים, סימני מסחר וכו', הם קניינה הבלעדי של הדרומית ואין לעשות בהם שימוש ללא אישור."
    },
    {
      title: "סמכות שיפוט",
      content: "על תנאי שימוש אלה יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית תהא נתונה לבתי המשפט המוסמכים בבאר שבע."
    },
    {
      title: "שינויים בשירות",
      content: "אנו שומרים את הזכות לשנות, להשעות או להפסיק את השירות בכל עת וללא הודעה מוקדמת."
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
              <FileText className="w-16 h-16 text-[#FF0000]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              תנאי שימוש
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              אנא קראו בעיון את תנאי השימוש לפני השימוש באתר
            </p>
          </motion.div>

          {/* Last Updated */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-400">
              עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
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

          {/* Additional Terms */}
          <motion.div variants={itemVariants} className="space-y-6">
            {additionalTerms.map((term) => (
              <div key={term.title} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">{term.title}</h3>
                <p className="text-gray-300">{term.content}</p>
              </div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">שאלות נוספות?</h2>
            <p className="text-gray-300 mb-4">
              אם יש לכם שאלות נוספות לגבי תנאי השימוש, אתם מוזמנים ליצור איתנו קשר:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">טלפון: 079-674-4711</p>
              <p className="text-gray-300">דוא"ל: legal@hadromit.co.il</p>
              <p className="text-gray-300">כתובת: רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants} className="text-sm text-gray-400 text-center">
            <p>
              המשך השימוש באתר מהווה הסכמה לתנאי השימוש המעודכנים.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 