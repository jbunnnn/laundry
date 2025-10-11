import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function Cta() {
  return (
    <section className="bg-indigo-600 dark:bg-gray-900 py-20 px-4 text-white text-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Siap Mencoba Layanan Kami?
        </h2>

        <p className="text-base sm:text-lg mb-8 text-indigo-100 dark:text-gray-300">
          Pesan sekarang dan dapatkan pakaian bersih tanpa ribet!
        </p>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-md shadow-lg transition-all duration-300
                     bg-white text-indigo-600 hover:bg-gray-100
                     dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400"
        >
          <FaWhatsapp className="text-xl" />
          Hubungi via WhatsApp
        </a>
      </motion.div>
    </section>
  );
}
