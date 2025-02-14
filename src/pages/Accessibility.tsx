import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility as AccessibilityIcon, Check } from 'lucide-react';

export function Accessibility() {
  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-b from-[#1A0000] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <AccessibilityIcon className="w-16 h-16 text-[#FF0000]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              הצהרת נגישות
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-4xl mx-auto mb-16 text-right"
        >
          <div className="space-y-6">
            <p className="text-gray-700">
              הצהרת הנגישות עודכנה בתאריך 01.03.2024
            </p>

            <p className="text-gray-700">
              מסעדת הדרומית, מסעדת בשרים כשרה בבאר שבע. אנו פועלים רבות על מנת להנגיש את המסעדה ואת אתר האינטרנט שלנו לאנשים עם מוגבלות על מנת לקדם שוויון זכויות ושקיפות. אנו מאמינים שלכל אדם מגיעה הזכות ליהנות מחוויה קולינרית מושלמת בסביבה נגישה ונוחה.
            </p>

            <h2 className="text-2xl font-bold text-[#1A0000] mt-8">מהות אתר אינטרנט נגיש</h2>
            <p className="text-gray-700">
              אתר אינטרנט נגיש, הינו אתר המאפשר לאדם עם מוגבלות, לגלוש באותה רמת יעילות והנאה כגולשים אחרים, תוך שימוש ביכולות המערכת עליה הוא פועל ובאמצעות טכנולוגיות מסייעות לנגישות.
            </p>

            <h2 className="text-2xl font-bold text-[#1A0000] mt-8">ביצוע התאמות הנגישות באתר האינטרנט</h2>
            <p className="text-gray-700">
              התאמות הנגישות באתר בוצעו בהתאם לסימן ג': שירותי האינטרנט בתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013, לתקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.0, האתר הונגש לרמה AA ובכפוף לשינויים והתאמות שבוצעו במסמך התקן הישראלי.
            </p>

            <p className="text-gray-700">
              האתר תומך בשימוש בטכנולוגיות מסייעות כגון תוכנות הקראת מסך, בגלישה בעזרת מקלדת על ידי שימוש במקשי ה-Tab וה-Shift+Tab למעבר בין קישורים, מקשי החיצים, מקש ה-Enter לבחירה, מקש ה-Esc ליציאה מתפריטים וחלונות, לחיצה על H או על מספר למעבר בין כותרות.
            </p>

            <p className="text-gray-700">
              האתר נבדק באופן קבוע כדי להבטיח את תחזוקת נגישות האתר.
            </p>

            <h2 className="text-2xl font-bold text-[#1A0000] mt-8">ישימות מיטבית לנגישות באתר האינטרנט</h2>
            <p className="text-gray-700">
              באתר אינטרנט זה, ניתן לגלוש בצורה מיטבית ונגישה באמצעות הדפדפנים הנפוצים: Chrome, Firefox, Safari, Edge ובתוכנות קוראות מסך NVDA, Jaws, VoiceOver.
            </p>

            <h2 className="text-2xl font-bold text-[#1A0000] mt-8">הסדרי נגישות במסעדה</h2>
            <div className="text-gray-700 space-y-2">
              <p>המסעדה מציעה את הסדרי הנגישות הבאים:</p>
              <ul className="list-disc pr-6">
                <li>חניות נכים ייעודיות בסמוך לכניסה למסעדה במתחם ישפרו סנטר</li>
                <li>גישה נוחה ומותאמת לכיסאות גלגלים מהחניה ועד לשולחן</li>
                <li>דלתות רחבות המאפשרות מעבר נוח</li>
                <li>שירותי נכים מרווחים ומאובזרים נמצאים בקומת המסעדה</li>
                <li>מעברים רחבים בין השולחנות המאפשרים תנועה חופשית</li>
                <li>תפריט בכתב ברור וקריא עם אפשרות להגדלה</li>
                <li>תאורה מותאמת ונעימה בכל שטח המסעדה</li>
                <li>צוות מיומן ומודע לצרכי נגישות</li>
                <li>אפשרות להזמנת מקום מראש עם ציון צרכי נגישות מיוחדים</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-[#1A0000] mt-8">דרכי פניה לבקשות והצעות לשיפור</h2>
            <p className="text-gray-700">
              במידה ומצאתם באתר האינטרנט או במסעדה בעיה בנושא הנגישות או שהנכם זקוקים לעזרה, אתם מוזמנים לפנות אלינו דרך רכז הנגישות של המסעדה:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">שם רכז הנגישות: נתי מימון</p>
              <p className="text-gray-700 mb-2">טלפון: 054-444-5567</p>
              <p className="text-gray-700">דוא"ל: info@hadroomit.co.il</p>
              <p className="text-gray-700">כתובת: רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
            </div>

            <p className="text-gray-700 mt-8">
              אנו מתחייבים לתת מענה לפניות בנושא נגישות תוך 14 ימי עסקים.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 