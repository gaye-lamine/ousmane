import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = "https://wa.me/221704646450?text=Bonjour,%20j'ai%20vu%20vos%20services%20et%20j'aimerais%20un%20devis.";
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show tooltip after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <div className="fixed bottom-24 md:bottom-8 right-5 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/12 border border-gray-100 max-w-[220px]"
          >
            {/* Close */}
            <button
              onClick={() => { setShowTooltip(false); setDismissed(true); }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              aria-label="Fermer"
            >
              <X size={10} className="text-gray-600" />
            </button>

            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />

            <p className="text-xs font-bold text-brand-dark mb-0.5">Besoin d'aide ?</p>
            <p className="text-xs text-brand-dark/55 leading-snug">
              Réponse en moins de 5 min via WhatsApp
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setShowTooltip(false)}
        className="relative w-15 h-15 w-[60px] h-[60px] bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#25D366]/50"
        style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }}
        aria-label="Contacter via WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" />

        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ring-pulse" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ring-pulse" style={{ animationDelay: '0.6s' }} />
      </motion.a>

      {/* Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-wider"
      >
        Réponse rapide
      </motion.span>
    </div>
  );
};

export default FloatingWhatsApp;
