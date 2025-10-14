// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', 
      },
      screens: {
        'xs': '475px', 
      },
    },
  },
  plugins: [],
}
