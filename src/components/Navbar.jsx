// src/components/Navbar.jsx

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ toggleMobileMenu }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.theme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved === "dark" || (!saved && prefersDark);

    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleNavClick = (id) => {
    setTimeout(() => {
      const el = document.querySelector(id);
      if (!el) return;
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }, 100);
  };

  const navItems = [
    { id: "#layanan", label: "Layanan" },
    { id: "#cara-kerja", label: "Cara Kerja" },
    { id: "#kenapa-casey", label: "Kenapa Casey?" },
    { id: "#estimasi-harga", label: "Estimasi Harga" },
    { id: "#antar-jemput", label: "Cek Jarak" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wide cursor-pointer"
          onClick={() => handleNavClick("#beranda")}
        >
          Casey Laundry
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <div
            onClick={toggleDarkMode}
            className={`w-14 h-7 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${
              isDark ? "bg-blue-600" : "bg-yellow-400"
            }`}
          >
            <motion.div
              layout
              className="w-5 h-5 rounded-full flex items-center justify-center shadow-md text-white"
              animate={{
                x: isDark ? 30 : 0,
                backgroundColor: isDark ? "#60a5fa" : "#facc15",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "moon" : "sun"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <FaMoon size={12} /> : <FaSun size={12} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
