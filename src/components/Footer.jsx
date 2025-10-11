import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-4 sm:px-6 py-14 transition-colors duration-300">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Store Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <FaMapMarkerAlt className="text-blue-500" />
              Casey Laundry
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Sawangan, Depok – Layanan antar jemput & cuci terpercaya sejak 2018.
            </p>
            <a
              href="https://www.google.com/maps/place/Casey+Laundry/@-6.4207689,106.7666768,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69e8fe30d578ff:0x48b63b124b28d2b5!8m2!3d-6.4207689!4d106.7692517!16s%2Fg%2F11p65qrtn9?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              <FaMapMarkerAlt />
              Lihat di Google Maps
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              📞 Kontak Kami
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp className="text-green-500 text-lg" />
                  +62 812-3456-7890
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/caseylaundry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                >
                  <FaInstagram className="text-pink-500 text-lg" />
                  @caseylaundry
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              🕒 Jam Operasional
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex justify-between">
                <span>Selasa - Minggu:</span>
                <span>06.00 - 20.00</span>
              </li>
              <li className="flex justify-between font-medium text-red-500 dark:text-red-400">
                <span>Senin & Tanggal Merah:</span>
                <span>Tutup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Casey Laundry. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
