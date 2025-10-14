import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Steps from '../components/Steps';
import WhyUs from '../components/WhyUs';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="font-sans bg-white">
      <Navbar />
      <main>
        <section id="beranda" className="scroll-section">
          <Hero />
        </section>
        
        <section id="layanan" className="scroll-section">
          <Services />
        </section>
        
        <section id="cara-kerja" className="scroll-section"> {}
          <Steps />
        </section>
        
        <section id="tentang" className="scroll-section">
          <WhyUs />
        </section>
        
        <div>
          <Cta />
        </div>
      </main>
      <Footer />
    </div>
  );
}
