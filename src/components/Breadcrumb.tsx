import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb(): JSX.Element {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // מיפוי עברי לעמודים
  const pageNames: { [key: string]: string } = {
    'menu': 'תפריט',
    'about': 'עלינו',
    'events': 'אירועים',
    'gallery': 'גלריה',
    'contact': 'צור קשר',
    'blog': 'בלוג',
    'order': 'הזמנות',
    'privacy': 'מדיניות פרטיות',
    'terms': 'תנאי שימוש',
    'cookies': 'מדיניות עוגיות',
    'accessibility': 'הצהרת נגישות',
    'sitemap': 'מפת האתר'
  };

  const breadcrumbItems = [
    { path: '/', name: 'בית', icon: <Home className="w-4 h-4" /> }
  ];

  // בניית breadcrumb items
  let currentPath = '';
  pathnames.forEach((pathname, index) => {
    currentPath += `/${pathname}`;
    const name = pageNames[pathname] || pathname;

    // אם זה blog post, הוסף את השם
    if (pathname === 'blog' && pathnames[index + 1]) {
      // בלוג פוסט - נצטרך להביא את השם מה-URL או מבלוג דאטה
      breadcrumbItems.push({
        path: currentPath,
        name: 'פוסט בלוג'
      });
    } else {
      breadcrumbItems.push({
        path: currentPath,
        name: name
      });
    }
  });

  // אל תציג breadcrumb אם אנחנו בעמוד הבית
  if (location.pathname === '/') {
    return <></>;
  }

  return (
    <nav aria-label="breadcrumb" className="py-3 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 space-x-reverse text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              {index === breadcrumbItems.length - 1 ? (
                // פריט אחרון - לא קליקי
                <span className="text-[#FF0000] font-medium flex items-center gap-1">
                  {item.icon}
                  {item.name}
                </span>
              ) : (
                // פריטים קליקיים
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-[#FF0000] transition-colors flex items-center gap-1"
                >
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
