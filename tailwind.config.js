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
          200: '#2A2ABD',
          300: '#3838FC',
          400: '#191970',
          500: '#B3B3B5',
        },
        secondary: {
          100: '#FFD700',
          200: '#BFA300',
          300: '#403600',
          400: '#FFFADA',
        },
        tertiary: {
          100: '#FF240D',
        },
        dark: '#01010E',
        'unihub-gray': {
          100: '#BFBFBF',
          200: '#808080',
          300: '#ECECEC',
          400: '#B3B3B5',
        },
        'light-yellow': '#FFFEDF',
        'pale-yellow': '#FDFDBA',
        'orange-yellow': '#EECE5E',
        'light-silver': '#D9D9D9',
        'deny-text': '#404040',
      },
    },
  },
  plugins: [],
};
