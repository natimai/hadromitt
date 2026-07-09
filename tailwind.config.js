/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ED1D24',
          dark: '#CC0000',
          darker: '#990000',
          soft: 'rgba(237, 29, 36, 0.15)',
        },
        warmBg: '#FDFBF7',
        warmDark: '#2A211E',
        ink: '#1A0000',
      },
      fontFamily: {
        display: ['"Frank Ruhl Libre"', 'Georgia', 'serif'],
        sans: ['Heebo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
