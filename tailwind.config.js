/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./formkit.config.js"
  ],
  theme: {
    extend: {
      colors:{
        "vtd-primary": colors.sky,  // Light mode Datepicker color
        "vtd-secondary": colors.gray, // Dark mode Datepicker color
      },
      backgroundImage : {
        "app":"url('/img/1.jpg')"
      }
    },
  },
  plugins: [],
}

