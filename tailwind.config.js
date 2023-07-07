/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,vue,js,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      gray: {
        light: "#D9D9D9",
        medium: "#787878",
      },
      green: "#E2F7D8",
      lime: "#9EE37D",
      orange: "#FFAE64",
      red: "#FC6060",
      blue: "#B3D8FA",
    },
  },
  plugins: [],
}
