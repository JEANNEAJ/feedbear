module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'greenBtn': '#BBE1C6',
        'redBtn': '#F98C7F',
        'yellowBtn': '#FFE3AA',
        'blueBtn': '#9ADCFF',
        'neutralBtn': '#DAD7D7',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
