/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'customBlue':'#E9AF3F',
        'primary-light': '#ffe6ba',
        'primary-dark': '#0E4D90',
        'gray-light': '#F5F4F7',
        'gray-dark': '#333333',
      }
    },
  },
  plugins: [],
}