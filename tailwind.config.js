import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E0AA23', // Dorado golden age
        secondary: '#1F1F1F', // Gris
        accent: '#ff33a6', // 
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
