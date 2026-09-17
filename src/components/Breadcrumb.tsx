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
    'outdoor-events': 'אירועי חוץ',
    'gallery': 'גלריה',
    'contact': 'צור קשר',
    'blog': 'בלוג',
    'order': 'הזמנות',
    'privacy': 'מדיניות פרטיות',
    'terms': 'תנאי שימוש',
    'cookies': 'מדיניות עוגיות',
    'accessibility': 'הצהרת נגישות',
    'sitemap': 'מפת האתר',
    'faq': 'שאלות נפוצות'
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

  const overlayPages = ['/events', '/outdoor-events', '/gallery', '/menu', '/about'];
  const isOverlay = overlayPages.includes(location.pathname);

  return (
    <nav
      aria-label="breadcrumb"
      className={
        isOverlay
          ? 'absolute top-20 inset-x-0 z-30 py-3 px-4 bg-gradient-to-b from-black/50 to-transparent'
          : 'py-3 px-4 bg-gray-50 dark:bg-gray-900'
      }
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 space-x-reverse text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className={`w-4 h-4 mx-2 ${isOverlay ? 'text-white/50' : 'text-gray-400'}`} />
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className={`font-medium flex items-center gap-1 ${isOverlay ? 'text-white' : 'text-brand'}`}>
                  {item.icon}
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors flex items-center gap-1 ${
                    isOverlay ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-brand'
                  }`}
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
