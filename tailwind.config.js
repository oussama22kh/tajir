/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    screens: {
      sm: "420px",
      md: "900",
      lg: "1200px",
    },
    fontFamily: {
      tajir: "tajir",
    },
    extend: {},
  },
  plugins: [],
};
