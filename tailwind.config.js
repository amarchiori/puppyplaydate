
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainGreen: "#00D09E",
        pinkLink: "#FF0970",
        blueBtn: "#3300FF",
      },
      fontFamily: {
        sans: ['Martel Sans', 'sans-serif'],
        ppd: ['Sriracha', 'cursive']
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
}

