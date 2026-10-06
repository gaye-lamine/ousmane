import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Realisations from './components/Realisations';
import About from './components/About';
import InterventionArea from './components/InterventionArea';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';

function App() {
  return (
    <div className="min-h-screen bg-sand-100 text-night-900 pb-24 md:pb-0">
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
      <MobileActionBar />
    </div>
  );
}

export default App;
