const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");


module.exports = {
  darkMode: "selector", // or 'media' for system preference
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@rnr/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        fourth: "var(--color-fourth)",
        fifth: "var(--color-fifth)",
        bg: "var(--color-bg)",
        outstand: "var(--color-outstand)",
        shadingLight: "var(--color-shading-light)",
        shading: "var(--color-shading)",
        shadingDark: "var(--color-shading-dark)",
        text1: "var(--color-text1)",
        text2: "var(--color-text2)",

      },
      fontFamily: {
        poppins: ["Poppins", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
