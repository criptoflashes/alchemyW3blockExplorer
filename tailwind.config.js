/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js"],
  
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/img/blockBg.svg')",
      
      },
      fontFamily: {
        sans: ["Electrolize", "sans-serif"],
        raleway:["Raleway", "sans-serif"],
        londrina: ['Londrina Outline', 'cursive'],
        monofett: ['Monofett', 'monospace'],
        nabla: ['Nabla', 'cursive'],
        rubik: ['Rubik Vinyl', 'cursive']

      },
    
    },
  },
  plugins: [require("tailwindcss-animated")],
};


