import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbarHide],
};
