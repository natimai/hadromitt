import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// הוספת קוד לזיהוי מכשירים ניידים ואופטימיזציה
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// הוספת קלאס למסמך HTML בהתאם לסוג המכשיר
if (isMobile) {
  document.documentElement.classList.add('is-mobile');
} else {
  document.documentElement.classList.add('is-desktop');
}

// הוספת טיפול באירועי מגע למובייל
if (isMobile) {
  // מניעת זום בהקשה כפולה
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });
  
  // מניעת התנהגות גלילה לא רצויה
  document.addEventListener('touchmove', (event) => {
    // אם האלמנט או אבות שלו מסומנים עם קלאס מיוחד, אפשר גלילה
    if (!(event.target as HTMLElement).closest('.allow-scroll')) {
      // אחרת, בדוק אם צריך למנוע גלילה במקרים מסוימים
      if ((event.target as HTMLElement).closest('.prevent-scroll')) {
        event.preventDefault();
      }
    }
  }, { passive: false });
}

// הגדרת דגלי עתיד של React Router
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter {...router}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);