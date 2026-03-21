/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#ED1D24',
        warmBg: '#FDFBF7',
        warmDark: '#2A211E'
      }
    },
  },
  plugins: [],
};
