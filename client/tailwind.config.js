const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        80: '20rem',
        100: '25rem',
        120: '30rem',
      },
    },
    spinner: (theme) => {
      return {
        default: {
          color: theme('colors.green.500'),
          size: '1em',
          border: '2px',
          speed: '500ms',
        },
        defaultLarge: {
          color: theme('colors.green.500'),
          size: '2em',
          border: '4px',
          speed: '500ms',
        },
        light: {
          color: theme('colors.white'),
          size: '1em',
          border: '2px',
          speed: '500ms',
        },
        lightLarge: {
          color: theme('colors.white'),
          size: '2em',
          border: '4px',
          speed: '500ms',
        },
      }
    },
  },
  variants: [
    'responsive',
    'group-hover',
    'group-focus',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ],
  plugins: [require('@tailwindcss/ui'), require('tailwindcss-spinner')],
}
