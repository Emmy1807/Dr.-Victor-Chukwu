/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf7ed",
          100: "#f7e4c3",
          200: "#f0cb8c",
          300: "#e8aa53",
          400: "#e09325",
          500: "#d1790c",
          600: "#b35e08",
          700: "#8c460b",
          800: "#713a0f",
          900: "#5f3110",
        },
      },
    },
  },
  plugins: [],
};
