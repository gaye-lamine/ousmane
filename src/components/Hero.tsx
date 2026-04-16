import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, Clock, Star, CheckCircle, Zap } from 'lucide-react';
import ousmanePhoto from '../assets/ousmane.jpeg';

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/221704646450?text=Bonjour,%20j'ai%20vu%20vos%20services%20et%20j'aimerais%20un%20devis.";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);


  const stats = [
    { value: '+100', label: 'Interventions' },
    { value: '5★', label: 'Note moyenne' },
    { value: '<5min', label: 'Réponse' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-mesh">
      {/* Ambient light blobs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-blue/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-orange/6 blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-brand-blue/4 blur-[80px]" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(26,58,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,107,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-12">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-7 relative z-10">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-green-100 px-4 py-2 rounded-full w-fit shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-brand-dark/80">Disponible maintenant · Dakar</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
              Besoin d'un dépannage urgent ?
            </p>
            <h1 className="text-5xl md:text-[4.5rem] font-display font-bold leading-[1.05] tracking-tight text-brand-dark">
              Votre technicien{' '}
              <span className="relative inline-block">
                <span className="gradient-text">de confiance</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-brand-orange origin-left rounded-full"
                />
              </span>{' '}
              à Dakar.
            </h1>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-brand-dark/55 leading-relaxed max-w-md"
          >
            Ousmane — Technicien Supérieur. Pompes, climatisation, électricité et caméras.{' '}
            <strong className="text-brand-dark/80 font-semibold">Intervention rapide, résultat garanti.</strong>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-whatsapp text-base px-8 py-4 font-bold shadow-xl shadow-[#25D366]/30"
            >
              <MessageCircle size={20} fill="currentColor" />
              WhatsApp — Devis Gratuit
            </motion.a>
            <motion.a
              href="tel:+221766029637"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-orange text-base px-8 py-4 font-bold"
            >
              <Phone size={20} />
              76 602 96 37
            </motion.a>
          </motion.div>

          {/* Micro-trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-4 text-xs text-brand-dark/40 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-green-500" />
              Réponse en moins de 5 min
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-dark/20" />
            <span className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-green-500" />
              Devis 100% gratuit
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-dark/20" />
            <span className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-green-500" />
              Garantie travaux
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex gap-8 pt-4 border-t border-gray-100"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-2xl font-display font-bold text-brand-dark">{s.value}</span>
                <span className="text-xs text-brand-dark/40 font-medium mt-0.5">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Photo card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden md:flex justify-center"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-brand-blue/15 rounded-[3rem] blur-3xl scale-90 -z-10" />

          {/* Main photo card */}
          <div className="relative w-full max-w-sm">
            <div className="aspect-[4/5] bg-gradient-to-br from-brand-blue via-[#1e4a8a] to-[#0f2a5c] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-blue/40 relative">
              <img
                src={ousmanePhoto}
                alt="Ousmane – Technicien Supérieur"
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle overlay gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
              {/* Orange accent stripe */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-orange" />

              {/* Name tag at bottom */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-lg leading-tight">Ousmane</p>
                <p className="text-white/60 text-sm">Technicien Supérieur · Dakar</p>
              </div>
            </div>

            {/* Floating badge — Disponibilité */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-8 top-10 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/10 flex items-center gap-3 border border-gray-50"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-wider">Disponibilité</p>
                <p className="text-sm font-bold text-brand-dark">7j/7 · 24h/24</p>
              </div>
            </motion.div>

            {/* Floating badge — Rating */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -left-8 bottom-24 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/10 flex items-center gap-3 border border-gray-50"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <Star size={20} className="text-amber-500" fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-wider">Satisfaction</p>
                <p className="text-sm font-bold text-brand-dark">5.0 / 5 ★</p>
              </div>
            </motion.div>

            {/* Floating badge — Urgence */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -right-6 bottom-16 bg-brand-orange rounded-2xl px-4 py-3 shadow-2xl shadow-brand-orange/30 flex items-center gap-2"
            >
              <Zap size={16} className="text-white" fill="currentColor" />
              <p className="text-sm font-bold text-white">Intervention rapide</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sticky mobile CTA — visible only on mobile */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
        className="sticky-cta md:hidden"
      >
        <div className="flex gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#25D366]/30 text-sm"
          >
            <MessageCircle size={18} fill="currentColor" />
            WhatsApp
          </a>
          <a
            href="tel:+221766029637"
            className="flex-1 flex items-center justify-center gap-2 bg-brand-orange text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-brand-orange/30 text-sm"
          >
            <Phone size={18} />
            Appeler
          </a>
        </div>
        <p className="text-center text-[10px] text-brand-dark/35 font-medium mt-2">
          Réponse garantie en moins de 5 minutes
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
