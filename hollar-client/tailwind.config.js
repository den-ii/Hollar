/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        QuickSand: ['Quicksand'],
        Raleway: ['Raleway'],
        Poppins: ['Poppins']
      },
      colors: {
        base: 'rgba(88, 30, 235, 0.8)'
      }
    }
  },
  plugins: []
}
