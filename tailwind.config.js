/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cyberpunk: ['Orbitron', 'sans-serif'], // Nome da fonte
      },
    },
  },
  plugins: [],
};
