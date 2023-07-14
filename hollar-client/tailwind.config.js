/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        dshadow: '0px 1px 1px 2px rgba(130, 80, 223, 0.7)',
        dshadow2: '0px 1px 1px 1px rgba(130, 80, 223, 0.3)',
        barshadow: 'rgba(0, 0, 0, 0.16) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 1px 2px;'

        // barshadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 2px, rgba(27, 31, 35, 0.15) 0px 0px 2px 2px'
      },
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        QuickSand: ['Quicksand'],
        Raleway: ['Raleway'],
        Poppins: ['Poppins'],
        Dosis: ['Dosis']
      },
      colors: {
        base: '#8250DF',
        darks: '#313338',
        hdark: '#1E1F22'
      }
    }
  },
  plugins: []
}
