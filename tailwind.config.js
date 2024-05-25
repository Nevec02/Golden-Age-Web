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
        primary: '#E0AA23', // Example custom color
        secondary: '#33c4ff', // Example custom color
        accent: '#ff33a6', // Example custom color
        // Add more custom colors as needed
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
