import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Zap } from 'lucide-react';

const whatsappUrl = "https://wa.me/221704646450?text=Bonjour,%20j'ai%20vu%20vos%20services%20et%20j'aimerais%20un%20devis.";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-light pt-24 pb-12 overflow-hidden relative">
      {/* ── Final CTA Block ── */}
      <div className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-brand-blue via-[#1e4a8a] to-[#0f2a5c] rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/3 rounded-full blur-3xl" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] rounded-[2.5rem]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
              <Zap size={14} className="text-brand-orange" fill="currentColor" />
              <span className="text-sm font-semibold text-white/80">Disponible immédiatement · Intervention rapide à Dakar</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Prêt à résoudre votre{' '}
              <span className="text-brand-orange">problème</span> technique ?
            </h2>
            <p className="text-xl text-white/65 mb-12 leading-relaxed">
              Ne laissez pas une panne gâcher votre journée.
              Contactez Ousmane maintenant pour une intervention rapide.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="btn bg-[#25D366] text-white hover:bg-[#22c55e] shadow-2xl shadow-[#25D366]/40 px-10 py-5 text-lg font-bold"
              >
                <MessageCircle size={22} fill="currentColor" />
                WhatsApp — Devis Gratuit
              </motion.a>
              <motion.a
                href="tel:+221766029637"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="btn bg-white text-brand-blue hover:bg-white/95 shadow-2xl shadow-black/10 px-10 py-5 text-lg font-bold"
              >
                <Phone size={22} />
                76 602 96 37
              </motion.a>
            </div>

            <p className="mt-8 text-sm font-medium text-white/45 flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              Réponse garantie en moins de 5 minutes
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Footer Links ── */}
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 border-t border-gray-200 pt-16">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="flex items-center gap-2.5 mb-6 group">
            <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <span className="text-white font-bold text-lg font-display">O</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-display font-bold tracking-tight text-brand-dark">OUSMANE</span>
              <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-widest">Technicien Supérieur</span>
            </div>
          </a>
          <p className="text-brand-dark/45 max-w-sm leading-relaxed text-sm">
            Plomberie, électricité, climatisation, pompes et caméras de surveillance à Dakar et partout au Sénégal.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-brand-dark uppercase tracking-wider">Navigation</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Accueil', href: '#' },
              { label: 'Services', href: '#services' },
              { label: 'Réalisations', href: '#realisations' },
              { label: 'À Propos', href: '#about' },
              { label: 'Témoignages', href: '#testimonials' },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-sm text-brand-dark/45 hover:text-brand-blue transition-colors font-medium">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-brand-dark uppercase tracking-wider">Contact</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-brand-orange shrink-0 mt-0.5" />
              <span className="text-sm text-brand-dark/45">Dakar, Rue fleuriste en face Orca</span>
            </li>
            {[
              { number: '76 602 96 37', href: 'tel:+221766029637' },
              { number: '77 020 77 30', href: 'tel:+221770207730' },
              { number: '70 464 64 50', href: 'tel:+221704646450' },
            ].map((phone) => (
              <li key={phone.number}>
                <a href={phone.href} className="flex items-center gap-3 text-sm text-brand-dark/45 hover:text-brand-orange transition-colors font-medium">
                  <Phone size={14} className="text-brand-orange shrink-0" />
                  {phone.number}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-gray-200 mt-12 pt-8 text-center text-xs text-brand-dark/25">
        <p>
          Développé par{' '}
          <span className="text-brand-dark/40 font-semibold">Lamine Gaye</span>
          {' '}— Full Stack Developer
        </p>
      </div>
    </footer>
  );
};

export default Footer;
