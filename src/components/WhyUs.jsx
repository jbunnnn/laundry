import { FaSmile, FaClock, FaShieldAlt, FaThumbsUp, FaStar, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const reasons = [
  {
    icon: <FaThumbsUp size={22} />,
    title: 'Pelayanan Terbaik',
    desc: 'Kami selalu mengutamakan kepuasan pelanggan dalam setiap layanan.',
  },
  {
    icon: <FaShieldAlt size={22} />,
    title: 'Keamanan Terjamin',
    desc: 'Barang pelanggan kami tangani dengan hati-hati dan sistem keamanan yang baik.',
  },
  {
    icon: <FaClock size={22} />,
    title: 'Tepat Waktu',
    desc: 'Kami menjamin layanan tepat waktu sesuai dengan jadwal yang dijanjikan.',
  },
  {
    icon: <FaSmile size={22} />,
    title: 'Harga Terjangkau',
    desc: 'Layanan profesional dengan harga yang ramah di kantong.',
  },
  {
    icon: <FaHistory size={22} />,
    title: 'Berpengalaman Sejak 2018',
    desc: 'Lebih dari 6 tahun melayani dengan sepenuh hati untuk warga Sawangan dan sekitarnya.',
  },
];

export default function WhyUs() {
  return (
    <section
      className="bg-gray-50 dark:bg-slate-900 py-20 px-6 sm:px-10 lg:px-24"
      id="kenapa-casey"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-14 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaStar className="text-indigo-500" />
          Kenapa Memilih Kami?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <TiltCard key={`reason-${index}`}>
              <motion.div
                className="flex items-start gap-4 bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-blue-100 dark:border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-blue-300 dark:hover:shadow-slate-700 hover:scale-[1.02] transition-all duration-300 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded-full p-3 shadow-sm"
                  aria-label={`Ikon ${reason.title}`}
                >
                  {reason.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {reason.desc}
                  </p>
                </div>
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
