// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ✅ Tambahin ini buat enable dark mode manual via class
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Warna utama
      },
      screens: {
        'xs': '475px', // Tambahan breakpoint custom
      },
    },
  },
  plugins: [],
}
