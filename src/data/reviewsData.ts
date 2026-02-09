
export interface Review {
    name: string;
    role?: string;
    rating: number;
    content: string;
    date: string;
    image: string;
}

export const reviews: Review[] = [
    {
        name: 'ניסן בן שושן',
        role: 'רימון הנדסה ושמאות',
        rating: 5,
        content: 'מקום נהדר, המנות היו טעימות מאוד! מגוון רחב של סלטים טריים, שירות מעולה ואווירה מצויינת. הסטייק היה מושלם והצוות היה אדיב במיוחד. אין ספק שאחזור',
        date: 'לפני 6 ימים',
        image: '/gallery/BarAharon-3565-2 Large.jpeg'
    },
    {
        name: 'יוסי כהן',
        role: 'ממליץ מקומי',
        rating: 5,
        content: 'אכלנו היום לא פעם ראשונה וכמו תמיד שירות מצויין. אוכל טעים וטרי, סלטים טריים ומגוונים. אווירה טובה, הצוות עובר בין השולחנות ובודק שהכל טוב. ממליץ בחום!',
        date: 'לפני 3 חודשים',
        image: '/gallery/BarAharon-3097 Large.jpeg'
    },
    {
        name: 'הראל שטרן',
        rating: 5,
        content: 'חוויה קולינרית מושלמת! הזמנו מקום וישר נכנסנו למסעדה. סלטים מעולים וטעימים, גם הלאפות נהדרות. הזמנו סטייק, פילה בקר, פיקניה ופרגיות - הכל הגיע במידת העשייה המבוקשת וללא עיכובים. אוכל טעים ברמה גבוהה',
        date: 'לפני 5 חודשים',
        image: '/gallery/BarAharon-3402 Large.jpeg'
    }
];
