import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Lock, Mail, Cookie, Eye } from 'lucide-react';

export default function Privacy(): JSX.Element {
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
      icon: <Database className="w-6 h-6 text-[#FF0000]" />,
      title: "איסוף מידע",
      content: `אנו אוספים מידע אישי כגון:
• שם, כתובת, מספר טלפון ודוא"ל,
• פרטי הזמנות והיסטוריית רכישות,
• מידע על העדפות אישיות ותזונתיות,
• מידע טכני על השימוש באתר.

המידע נאסף כאשר אתם:
• יוצרים חשבון באתר,
• מבצעים הזמנה,
• נרשמים לניוזלטר,
• יוצרים קשר עם שירות הלקוחות.`
    },
    {
      icon: <Eye className="w-6 h-6 text-[#FF0000]" />,
      title: "שימוש במידע",
      content: `אנו משתמשים במידע שנאסף כדי:
• לספק את השירותים שהזמנתם,
• לשפר את השירות והחוויה באתר,
• לשלוח עדכונים ומבצעים (בכפוף להסכמתכם),
• לנתח את דפוסי השימוש באתר,
• לעמוד בדרישות החוק והרגולציה.`
    },
    {
      icon: <Cookie className="w-6 h-6 text-[#FF0000]" />,
      title: "עוגיות ומעקב",
      content: `אנו משתמשים בעוגיות ובטכנולוגיות מעקב כדי:
• לשמור על העדפותיכם,
• לנתח את השימוש באתר,
• להתאים את חווית המשתמש,
• לשפר את האבטחה.

אתם יכולים לשלוט בהגדרות העוגיות דרך הדפדפן שלכם.`
    },
    {
      icon: <Lock className="w-6 h-6 text-[#FF0000]" />,
      title: "אבטחת מידע",
      content: `אנו נוקטים באמצעי אבטחה מתקדמים כדי להגן על המידע שלכם:
• הצפנת מידע רגיש,
• מערכות אבטחה מתקדמות,
• גישה מוגבלת למידע אישי,
• ניטור ובקרה שוטפים.

עם זאת, איננו יכולים להבטיח אבטחה מוחלטת בעת העברת מידע באינטרנט.`
    }
  ];

  const additionalSections = [
    {
      title: 'תקשורת שיווקית',
      content: 'אנו עשויים לשלוח לכם תכנים שיווקיים בדואל או ב-SMS, בכפוף להסכמתכם. תוכלו לבטל את הסכמתכם בכל עת באמצעות הקישור המצורף להודעות או באמצעות פנייה אלינו.'
    },
    {
      title: 'שיתוף מידע',
      content: 'איננו משתפים את המידע האישי שלכם עם צדדים שלישיים, למעט במקרים הכרחיים לאספקת השירות (כגון חברות משלוחים) או כנדרש על פי חוק.'
    },
    {
      title: 'זכויותיכם',
      content: 'יש לכם זכות לעיין במידע שנאסף עליכם, לתקן אותו, למחוק אותו או להתנגד לעיבודו. ניתן לממש זכויות אלו באמצעות פנייה אלינו.'
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
              <Shield className="w-16 h-16 text-[#FF0000]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              מדיניות פרטיות
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              המידע שלכם חשוב לנו. כאן תוכלו למצוא מידע על האופן בו אנו אוספים ומשתמשים במידע שלכם
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

          {/* Additional Sections */}
          <motion.div variants={itemVariants} className="space-y-6">
            {additionalSections.map((section) => (
              <div key={section.title} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                <p className="text-gray-300">{section.content}</p>
              </div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">יצירת קשר בנושאי פרטיות</h2>
            <p className="text-gray-300 mb-4">
              לכל שאלה או בקשה בנושא פרטיות, אתם מוזמנים ליצור איתנו קשר:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">טלפון: 079-674-4711</p>
              <p className="text-gray-300">דוא"ל: privacy@hadromit.co.il</p>
              <p className="text-gray-300">כתובת: רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants} className="text-sm text-gray-400 text-center">
            <p>
              אנו שומרים על הזכות לעדכן את מדיניות הפרטיות מעת לעת. שינויים מהותיים יפורסמו באתר.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 