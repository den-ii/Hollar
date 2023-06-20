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
        base: '#581eeb'
      }
    }
  },
  plugins: []
}
