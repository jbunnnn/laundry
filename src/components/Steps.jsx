import {
  FaClipboardList,
  FaTruckPickup,
  FaTshirt,
  FaTruck,
  FaCogs,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    icon: <FaClipboardList size={24} />,
    title: "Pesan Layanan",
    desc: "Pilih layanan laundry yang kamu butuhkan dan isi detailnya.",
  },
  {
    icon: <FaTruckPickup size={24} />,
    title: "Penjemputan",
    desc: "Kami akan menjemput cucianmu sesuai jadwal yang ditentukan.",
  },
  {
    icon: <FaTshirt size={24} />,
    title: "Pencucian",
    desc: "Cucian akan diproses dengan peralatan modern dan ramah lingkungan.",
  },
  {
    icon: <FaTruck size={24} />,
    title: "Pengantaran",
    desc: "Kami akan mengantar cucian bersih ke lokasi kamu tepat waktu.",
  },
];

export default function Steps() {
  return (
    <section
      id="cara-kerja"
      className="bg-white dark:bg-slate-900 py-20 px-6 sm:px-10 lg:px-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Judul */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaCogs className="text-indigo-500" />
          Cara Kerja Kami
        </motion.h2>

        {/* Langkah-langkah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <TiltCard key={index}>
              <motion.div
                className="flex items-start gap-4 bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-blue-100 dark:border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-blue-300 dark:hover:shadow-slate-700 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-indigo-500 text-white rounded-full p-3 shadow-md">
                  {step.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{step.desc}</p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// 💡 Efek Tilt ringan & reusable
function TiltCard({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (-y / 15).toFixed(2);
    const rotateY = (x / 15).toFixed(2);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="transform-gpu transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}
