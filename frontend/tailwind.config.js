/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': "rgb(32 38 52)",
        'dark-soft': "rgb(41 48 68)",
      },
    },
  },
  plugins: [],
}

