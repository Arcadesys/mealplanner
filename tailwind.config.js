const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cartoon-black': '#333333',
        'cartoon-white': '#FFFFFF',
      },
      fontFamily: {
        cartoon: ['Comic Sans MS', 'Comic Sans', 'sans-serif'],
      },
      boxShadow: {
        'cartoon': '0 4px 0 0 rgba(0, 0, 0, 0.2)',
        'cartoon-hover': '0 6px 0 0 rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'cartoon': '5px',
      },
      animation: {
        'bounce-slight': 'bounce-slight 1s infinite',
      },
      keyframes: {
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
}
