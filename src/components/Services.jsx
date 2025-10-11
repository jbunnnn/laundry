import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useRef } from "react";

const layanan = [
  {
    title: "👕 Cuci + Setrika",
    desc: "Langsung siap pakai, anti kusut",
    price: "Rp 7.500 / kg",
    tag: "Best Seller",
  },
  {
    title: "♨️ Setrika Aja",
    desc: "Udah cuci sendiri? Tinggal setrika!",
    price: "Rp 5.000 / kg",
  },
  {
    title: "🛏️ Bed Cover / Sprei",
    desc: "Ukuran queen/king, lembut & bersih",
    price: "Rp 15.000 / pcs",
  },
  {
    title: "🟫 Karpet Rumah",
    desc: "Dibersihkan menyeluruh hingga ke serat",
    price: "Rp 25.000 / m²",
  },
];

export default function LayananHargaSection() {
  return (
    <section
      id="layanan"
      className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6"
        >
           Layanan & Harga Kami
        </motion.h2>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Semua kebutuhan laundry kamu ada di sini. Pilih layanan yang paling cocok, dan biarkan kami yang urus sisanya 
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {layanan.map((item, idx) => (
            <TiltCard key={`layanan-${idx}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-blue-100 dark:border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-blue-300 dark:hover:shadow-slate-700 transition-all duration-300 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-lg font-semibold text-gray-800 dark:text-white"
                  >
                    {item.title}
                  </motion.div>

                  {item.tag && (
                    <span
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full flex items-center gap-1 shadow-md"
                      aria-label="Highlight tag"
                    >
                      <FaStar className="text-yellow-300 text-xs" /> {item.tag}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {item.desc}
                </p>
                <p className="text-blue-700 dark:text-blue-400 text-lg font-bold">
                  {item.price}
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="transform-gpu transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}
