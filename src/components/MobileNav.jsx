// src/components/MobileNav.jsx
import {
  FaTimes,
  FaHome,
  FaTags,
  FaRoute,
  FaInfoCircle,
  FaCalculator,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Beranda", icon: <FaHome />, href: "#beranda" },
  { label: "Layanan", icon: <FaTags />, href: "#layanan" },
  { label: "Cara Kerja", icon: <FaRoute />, href: "#cara-kerja" },
  { label: "Kenapa Casey", icon: <FaInfoCircle />, href: "#kenapa-casey" },
  { label: "Estimasi Harga", icon: <FaCalculator />, href: "#estimasi-harga" },
  { label: "Cek Jarak", icon: <FaMapMarkerAlt />, href: "#cek-jarak" },
];

export default function MobileNav({ isOpen, onClose }) {
  const scrollTo = (href) => {
    setTimeout(() => {
      const el = document.querySelector(href);
      if (!el) return;
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 z-50 shadow-xl flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-2xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2 px-6">
            {navItems.map(({ label, icon, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-base py-3 transition"
              >
                <span className="text-xl text-blue-600 dark:text-blue-400 w-6 flex justify-center">
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <div className="mt-auto px-6 pb-6">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-base font-semibold py-3 px-4 rounded-lg transition"
            >
              <FaWhatsapp />
              Pesan via WhatsApp
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
