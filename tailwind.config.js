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
      // Your theme extensions
      colors: {
        monday: '#FFD1DC',    // Light Pink
        tuesday: '#BAFFC9',   // Light Green
        wednesday: '#BAE1FF', // Light Blue
        thursday: '#FFFFBA',  // Light Yellow
        friday: '#FFB3BA',    // Light Red
        saturday: '#BAFFC9',  // Light Green (repeat)
        sunday: '#E6E6FA',    // Lavender
      },
    },
  },
  safelist: [
    'bg-monday',
    'bg-tuesday',
    'bg-wednesday',
    'bg-thursday',
    'bg-friday',
    'bg-saturday',
    'bg-sunday',
    'dark:bg-monday/50',
    'dark:bg-tuesday/50',
    'dark:bg-wednesday/50',
    'dark:bg-thursday/50',
    'dark:bg-friday/50',
    'dark:bg-saturday/50',
    'dark:bg-sunday/50',
  ],
  plugins: [],
}
