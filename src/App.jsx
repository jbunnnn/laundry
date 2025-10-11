import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import smoothscroll from 'smoothscroll-polyfill';
import './styles/globals.css';

// Komponen utama halaman
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import Services from './components/Services';
import Steps from './components/Steps';
import WhyUs from './components/WhyUs';
import PriceCalculator from './components/PriceCalculator';
import DistanceChecker from './components/DistanceChecker';
import Cta from './components/Cta';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Chatbot components
import ChatBotToggle from './components/ChatBotToggle';
import ChatBox from './components/Chatbox';

smoothscroll.polyfill();

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Navigasi dan fitur tambahan */}
      <Navbar toggleMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <ScrollToTop />

      {/* Chatbot */}
      <ChatBotToggle onClick={() => setIsChatOpen((prev) => !prev)} />
      {isChatOpen && <ChatBox onClose={() => setIsChatOpen(false)} />}

      {/* Bagian utama halaman dengan animasi */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <Hero />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
        <Services />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
        <Steps />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
        <WhyUs />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
        <PriceCalculator />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
        <DistanceChecker />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
        <Cta />
      </motion.div>

      <Footer />
    </>
  );
}
