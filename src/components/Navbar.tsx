import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Réalisations', href: '#realisations' },
    { label: 'À Propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E9E5D8] shadow-sm'
          : 'bg-[#FAF9F5]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none group focus-visible:outline-[#C8480C]">
          <span className="font-display text-2xl font-bold tracking-tight text-[#0A1322] uppercase">
            OUSMANE
          </span>
          <span className="font-sans text-[11px] font-semibold tracking-widest text-[#4A5F82] uppercase mt-0.5">
            Technicien · Dakar
          </span>
        </a>

        {/* Desktop Nav : 4 liens */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-semibold text-[#1E2D4A] hover:text-[#C8480C] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA : UN SEUL bouton Appeler */}
        <div className="hidden md:block">
          <Button
            variant="call"
            href="tel:+221766029637"
            className="!min-h-[44px] !py-2.5 !px-5 text-sm font-bold"
          >
            76 602 96 37
          </Button>
        </div>

        {/* Mobile Toggle & Direct Call */}
        <div className="flex items-center gap-3 md:hidden">
          <Button
            variant="call"
            href="tel:+221766029637"
            className="!min-h-[40px] !py-2 !px-3.5 text-xs font-bold"
          >
            Appeler
          </Button>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded text-[#0A1322] hover:bg-[#E9E5D8] transition-colors border border-[#D8D2C0]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[#E9E5D8] px-6 py-6 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col gap-4 mb-6" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-xl tracking-wide text-[#0A1322] hover:text-[#C8480C] py-1 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            variant="call"
            href="tel:+221766029637"
            fullWidth
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Appeler le 76 602 96 37
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
