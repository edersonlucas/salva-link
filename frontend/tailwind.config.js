/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        min: "480px",
      },
      fontFamily: {
        sans: '"roboto", sans-serif',
      },
      colors: {
        blue: {
          600: "#04A4F6",
          700: "#0386C9",
          900: "#2047CA",
        },
        white: {
          900: "#fff",
        },
        zinc: {
          300: "#F3F5F7",
          500: "#EBEEF1",
          600: "#D9D9D9",
          700: "#4D4D4D",
          900: "#343434",
        },
        black: {
          900: "#000000",
        },
        green: {
          700: "#0DD859",
        },
        orange: {
          700: "#FF9166",
        },
        red: {
          700: "#E0224E",
        },
      },
    },
  },
  plugins: [],
};
