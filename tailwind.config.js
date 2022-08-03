/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      midnight: "#333",
      black: "#000",
      dark: "#1c3140",
      light: "#59888e",
      egg: "#f1c40f",
      cream: "#fffeee",
      warning: "#f96900",
      textColor: "#444",
      pureWhite: "#fff",
      offWhite: "#f7f7f7",
    },
    fontFamily: {
      sans: ["Nunito Sans", "Open Sans", "sans-serif"],
      serif: ["Montserrat", "serif"],
    },
    extend: {
      fontFamily: {
        titleFont: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
