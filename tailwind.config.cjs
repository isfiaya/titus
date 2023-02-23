/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { left: '-100%' },
          '100%': { left: '1rem' },
        },
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out ',
      }
    },
  },
  plugins: [],
}
