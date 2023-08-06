/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins"],
        secondary: ["Inter"],
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
