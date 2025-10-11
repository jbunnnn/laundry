// src/components/Hero.jsx
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden text-gray-800 dark:text-gray-100"
    >
      {/* Kontainer Utama */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* KONTEN KIRI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center md:text-left max-w-2xl"
        >
          {/* Badge Testimoni */}
          <div className="inline-block bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300 px-3 py-1 text-sm font-semibold rounded-full mb-4 shadow-sm">
            ⭐ Terpercaya oleh 100+ pelanggan
          </div>

          {/* Judul Besar */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Laundry Praktis,
            </span>{" "}
            Cepat, & Terjangkau
          </h1>
          
          {/* Deskripsi */}
           <p className="mt-4 text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
           Cuma tinggal klik, cucian kamu langsung dijemput dan diantar. Nikmati hidup bersih tanpa ribet!
          </p>


          {/* Tombol Aksi */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="https://wa.me/6281234567890"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-base font-medium px-6 py-3 rounded-lg shadow-md transition"
            >
              <FaWhatsapp className="text-xl" />
              Pesan Sekarang
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 border border-blue-500 text-blue-500 dark:text-white dark:border-white hover:bg-blue-50 dark:hover:bg-white/10 text-base font-medium px-6 py-3 rounded-lg shadow-sm transition"
            >
              Telusuri Layanan
            </a>
          </motion.div>
        </motion.div>

        {/* GAMBAR ILUSTRASI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-0 relative flex-1 flex justify-center"
        >
          <img
            src="/logo.png"
            alt="Laundry Illustration"
            className="max-w-full w-[280px] md:w-[380px] lg:w-[420px] mx-auto drop-shadow-xl rounded-2xl"
          />

          {/* BUBBLE 1 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-0 right-0 w-6 h-6 bg-blue-300 dark:bg-blue-600 rounded-full opacity-30 blur-lg"
          />

          {/* BUBBLE 2 */}
          <motion.div
            animate={{ x: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute bottom-8 left-12 w-4 h-4 bg-blue-300 dark:bg-blue-600 rounded-full opacity-30 blur-md"
          />
        </motion.div>
      </div>

      {/* WAVE SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-[#f0f9ff] dark:fill-gray-900"
            d="M0,96L60,101.3C120,107,240,117,360,106.7C480,96,600,64,720,58.7C840,53,960,75,1080,101.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
