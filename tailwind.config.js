/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,vue,js,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      white: "#FFFFFF",
      gray: {
        highlight: "#C5C5C5",
        light: "#D9D9D9",
        medium: "#787878",
      },
      green: "#E2F7D8",
      lime: "#9EE37D",
      orange: "#FFAE64",
      red: "#FC6060",
      blue: "#B3D8FA",

      // For Dark Mode
      purple: '#5E43F3',
      dark: {
        hard: '#040404',
        medium: '#202020',
        soft: '#373737',
        light: '#868686',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    fontFamily: {
      comfortaa: ['Comfortaa', 'cursive'],
      rubik: ['Rubik', 'sans-serif'],
    },
    keyframes: {
      discoverTile: {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '50%': { transform: 'scale(0.5)', borderRadius: '50%', opacity: '0.7' },
        '100%': { transform: 'scale(1)', borderRadius: '3px', opacity: '1' },
      },
      discoverPath: {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '50%': { borderRadius: '50%', transform: 'scale(0.2)', opacity: '0.7' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
    animation: {
      discoverTile: 'discoverTile 1s ease-out forwards',
      discoverPath: 'discoverPath 0.5s ease-out forwards',
    },
  },
  plugins: [],
}
