const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '3/5': '60%',
        '9/10': '90%',
        '9/20': '45%',
        '2/5': '40%',
        'screen-xs': '300px',
       },
       height: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '3/5': '60%',
        '9/10': '90%',
        '9/20': '45%',
        '2/5': '40%'
       },
       spacing: {
        '18': '4.5rem'
       },
       colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
      },
      keyframes: {
        'fade-in-right': {
            '0%': {
                opacity: '0',
                transform: 'translateX(20rem)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateX(0)'
            },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
        },
        '100%': {
            opacity: '1',
        },
        }
    },
    animation: {
        'fade-in-right': 'fade-in-right 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out'
    }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
  ],
}
