/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Paws on the Rock – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Cream – the background of the logo (#fcf9f2)
        cream: '#fcf9f2',
        // Oat – the soft beige behind the price list and flyers
        oat: {
          50: '#f8f2e8',
          100: '#f3eadb',
          200: '#e8dac4',
          300: '#d9cab7', // logo shadow tone
        },
        // Caramel – the golden retriever in the logo
        caramel: {
          200: '#f6dcc0',
          300: '#efc89f',
          400: '#e9b786', // logo
          500: '#d9a06a',
        },
        // Toffee – the ring, rules and paw print in the logo
        toffee: {
          400: '#c49a6c',
          500: '#a97c4f',
          600: '#8a6440', // readable on cream
        },
        // Cocoa – the dark lettering in the logo (#292825) warmed slightly
        cocoa: {
          500: '#776858', // logo brown-grey
          700: '#4a3b30',
          800: '#382c23',
          900: '#2a221c',
        },
        // Blush – the pink hearts used on their posts
        blush: {
          100: '#fbe9e5',
          300: '#f4c4bb',
          400: '#eca596',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Nunito', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(42,34,28,.05), 0 10px 30px -12px rgba(42,34,28,.18)',
        lift: '0 2px 4px rgba(42,34,28,.06), 0 22px 44px -18px rgba(42,34,28,.32)',
        pop: '4px 4px 0 0 #2a221c',
      },
      borderRadius: {
        blob: '58% 42% 46% 54% / 52% 48% 52% 48%',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-6deg)' }, '50%': { transform: 'rotate(6deg)' } },
        bob: { '0%,100%': { transform: 'translateY(0) rotate(-3deg)' }, '50%': { transform: 'translateY(-6px) rotate(3deg)' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        wiggle: 'wiggle 2.4s ease-in-out infinite',
        bob: 'bob 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
