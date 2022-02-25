const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        inika: ['Inika', 'Inter var', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat\\ Alternates', 'Montserrat', ...defaultTheme.fontFamily.serif]
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        DEFAULT: '#387aff',
        light: '#d9dcff',
        dark: '#293c77',
      },
      cta: {
        DEFAULT: '#ff5a38',
        light: '#ffd8cb',
        dark: '#793120',
      },
      info: {
        DEFAULT: '#3ec9ff',
        light: '#daf1ff',
        dark: '#2b5f77',
      },
      warning: {
        DEFAULT: '#ecc75e',
        light: '#fef1d7',
        dark: '#6f5e31',
      },
      success: {
        DEFAULT: '#5ad775',
        light: '#daf6dc',
        dark: '#32663b',
      },
      danger: {
        DEFAULT: '#ed4869',
        light: '#ffd5d7',
        dark: '#712a35',
      },
      gray: {
        DEFAULT: '#7B7E84',
        50: '#DADBDD',
        100: '#CFD1D3',
        200: '#BABCBF',
        300: '#A5A7AB',
        400: '#909398',
        500: '#7B7E84',
        600: '#606267',
        700: '#45474A',
        800: '#2A2B2D',
        900: '#0F0F10'
      },
      blue: {
        DEFAULT: '#0F5FFF',
        50: '#C7DAFF',
        100: '#B3CCFF',
        200: '#8AB1FF',
        300: '#6196FF',
        400: '#387AFF',
        500: '#0F5FFF',
        600: '#004BE0',
        700: '#003BB3',
        800: '#002C85',
        900: '#001D57'
      },
      indigo: {
        DEFAULT: '#2a00ff',
        50: '#eae5ff',
        100: '#d4ccff',
        200: '#aa99ff',
        300: '#7f66ff',
        400: '#5533ff',
        500: '#2a00ff',
        600: '#2200cc',
        700: '#190099',
        800: '#110066',
        900: '#080033'
      },
      violet: {
        DEFAULT: '#aa00ff',
        50: '#f7e5ff',
        100: '#eeccff',
        200: '#dd99ff',
        300: '#cc66ff',
        400: '#bb33ff',
        500: '#aa00ff',
        600: '#8800cc',
        700: '#660099',
        800: '#440066',
        900: '#220033'
      },
      purple: {
        DEFAULT: '#ff00d5',
        50: '#ffe5fb',
        100: '#ffccf7',
        200: '#ff99ee',
        300: '#ff66e6',
        400: '#ff33dd',
        500: '#ff00d5',
        600: '#cc00aa',
        700: '#990080',
        800: '#660055',
        900: '#33002b'
      },
      pink: {
        DEFAULT: '#ff0055',
        50: '#ffe5ee',
        100: '#ffccdd',
        200: '#ff99bb',
        300: '#ff6699',
        400: '#ff3377',
        500: '#ff0055',
        600: '#cc0044',
        700: '#990033',
        800: '#660022',
        900: '#330011'
      },
      red: {
        DEFAULT: '#FF2A00',
        50: '#FFC3B8',
        100: '#FFB2A3',
        200: '#FF907A',
        300: '#FF6E52',
        400: '#FF4C29',
        500: '#FF2A00',
        600: '#C72100',
        700: '#8F1800',
        800: '#570E00',
        900: '#1F0500'
      },
      orange: {
        DEFAULT: '#ffaa00',
        50: '#fff7e5',
        100: '#ffeecc',
        200: '#ffdd99',
        300: '#ffcc66',
        400: '#ffbb33',
        500: '#ffaa00',
        600: '#cc8800',
        700: '#996600',
        800: '#664400',
        900: '#332200'
      },
      yellow: {
        DEFAULT: '#d5ff00',
        50: '#fbffe5',
        100: '#f7ffcc',
        200: '#eeff99',
        300: '#e6ff66',
        400: '#ddff33',
        500: '#d5ff00',
        600: '#aacc00',
        700: '#809900',
        800: '#556600',
        900: '#2b3300'
      },
      lime: {
        DEFAULT: '#55ff00',
        50: '#eeffe5',
        100: '#ddffcc',
        200: '#bbff99',
        300: '#99ff66',
        400: '#77ff33',
        500: '#55ff00',
        600: '#44cc00',
        700: '#339900',
        800: '#226600',
        900: '#113300'
      },
      'green': {
        DEFAULT: '#00FF2A',
        50: '#B8FFC3',
        100: '#A3FFB2',
        200: '#7AFF90',
        300: '#52FF6E',
        400: '#29FF4C',
        500: '#00FF2A',
        600: '#00C721',
        700: '#008F18',
        800: '#00570E',
        900: '#001F05'
      },
      teal: {
        DEFAULT: '#00ffaa',
        50: '#e5fff7',
        100: '#ccffee',
        200: '#99ffdd',
        300: '#66ffcc',
        400: '#33ffbb',
        500: '#00ffaa',
        600: '#00cc88',
        700: '#009966',
        800: '#006644',
        900: '#003322'
      },
      cyan: {
        DEFAULT: '#00d5ff',
        50: '#e5fbff',
        100: '#ccf7ff',
        200: '#99eeff',
        300: '#66e6ff',
        400: '#33ddff',
        500: '#00d5ff',
        600: '#00aacc',
        700: '#008099',
        800: '#005566',
        900: '#002b33'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
