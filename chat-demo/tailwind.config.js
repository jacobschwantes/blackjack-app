module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '3/5': '60%',
       },
       spacing: {
        '18': '4.5rem'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
  ],
}
