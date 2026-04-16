import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, MessageCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappUrl = "https://wa.me/221704646450?text=Bonjour,%20j'ai%20vu%20vos%20services%20et%20j'aimerais%20un%20devis.";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: 'Accueil', href: '#' },
    { title: 'Services', href: '#services' },
    { title: 'Réalisations', href: '#realisations' },
    { title: 'À Propos', href: '#about' },
    { title: 'Témoignages', href: '#testimonials' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl py-3 shadow-sm border-b border-gray-100/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/30 group-hover:shadow-brand-blue/50 transition-shadow">
            <span className="text-white font-bold text-lg font-display">O</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-display font-bold tracking-tight text-brand-dark">OUSMANE</span>
            <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-widest">Technicien Supérieur</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-brand-dark/60 hover:text-brand-dark transition-colors relative group"
            >
              {item.title}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-brand-orange rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#22c55e] transition-all shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/35 hover:-translate-y-0.5"
          >
            <MessageCircle size={15} fill="currentColor" />
            WhatsApp
          </a>
          <a
            href="tel:+221766029637"
            className="flex items-center gap-2 bg-brand-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-orange/90 transition-all shadow-md shadow-brand-orange/25 hover:shadow-lg hover:shadow-brand-orange/35 hover:-translate-y-0.5"
          >
            <Phone size={15} />
            76 602 96 37
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 text-brand-dark shadow-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-base font-medium text-brand-dark/70 hover:text-brand-dark py-3 border-b border-gray-50 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </motion.a>
              ))}
              <div className="flex gap-3 mt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-2xl text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageCircle size={16} fill="currentColor" />
                  WhatsApp
                </a>
                <a
                  href="tel:+221766029637"
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-orange text-white font-bold py-3 rounded-2xl text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone size={16} />
                  Appeler
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
