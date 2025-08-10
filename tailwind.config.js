// /** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')

// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     colors: {
//       transparent: 'transparent',
//       current: 'currentColor',
//       black: colors.black,
//       white: colors.white,
//       gray: colors.gray,
//       emerald: colors.emerald,
//       indigo: colors.indigo,
//       yellow: colors.yellow,
//       sky:colors.sky,
//       Red:colors.red,
//       Green:colors.green,
//       Blue:colors.blue,
//       Lime:colors.lime,
//       'red': '#ff0000',
//       'Orange' : '#fcd34d',
//       'basecolor' : '#0051BA',
//       'lightbasecolor' : '#196BD6',
//       'bgleft' : '#104FA1',
//       'bgright' : '#9C850F',
//     },
    
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//   ],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'red': '#ff0000',
        'Orange' : '#fcd34d',
        'basecolor' : '#0051BA',
        'lightbasecolor' : '#196BD6',
        'bgleft' : '#104FA1',
        'bgright' : '#9C850F',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
