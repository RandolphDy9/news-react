/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ECE1D7',
        primary: '#2b2d42',
        accent: '#FF9169',
      },
      fontFamily: {
        'main': ['Merriweather'],
        'secondary': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

