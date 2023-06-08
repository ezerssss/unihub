/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#000080',
          200: '#000066',
          300: '#000040',
          400: '#191970',
        },
        secondary: {
          100: '#FFD700',
          200: '#BFA300',
          300: '#403600',
        },
        dark: '#01010E',
        'unihub-gray': {
          100: '#BFBFBF',
          200: '#808080',
        },
        'light-yellow': '#FFFEDF',
        'pale-yellow': '#FDFDBA',
        'orange-yellow': '#EECE5E',
      },
    },
  },
  plugins: [],
};
