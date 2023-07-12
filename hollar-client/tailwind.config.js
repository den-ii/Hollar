/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        QuickSand: ['Quicksand'],
        Raleway: ['Raleway'],
        Poppins: ['Poppins'],
        Dosis: ['Dosis']
      },
      colors: {
        base: '#8250DF'
      }
    }
  },
  plugins: []
}
