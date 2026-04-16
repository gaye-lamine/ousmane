import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Realisations from './components/Realisations';
import About from './components/About';
import InterventionArea from './components/InterventionArea';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-screen bg-brand-light">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Realisations />
        <About />
        <InterventionArea />
        <Testimonials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
