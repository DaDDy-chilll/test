/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#2E9648",
        secondaryColor: "#F0C300",
        additionalBackgroundColor: "#F2F5FB",
        secondaryBackgroundColor: "#F8F7EE",
        tertiaryBackgroundColor: "#888888",
        bgcolor: "#F2F5FB",
        primary: "#285DBD",
        textBlue: "#3083FF"
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '0rem',
        xl: '3rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
});