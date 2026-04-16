import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap } from 'lucide-react';

const areas = [
  { name: 'Plateau / Médina', delay: 0 },
  { name: 'Almadies / Ngor / Yoff', delay: 0.05 },
  { name: 'Ouakam / Mermoz', delay: 0.1 },
  { name: 'Grand Yoff / Parcelles', delay: 0.15 },
  { name: 'Pikine / Guediawaye', delay: 0.2 },
  { name: 'Rufisque / Diamniadio', delay: 0.25 },
];

const InterventionArea: React.FC = () => {
  return (
    <section className="py-28 bg-brand-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-brand-blue/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-blue/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-brand-blue/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand-blue/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-blue/25"
          >
            <MapPin size={26} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-4"
          >
            Zone d'intervention
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-bold mb-5 leading-tight"
          >
            Intervention partout au{' '}
            <span className="text-brand-blue">Sénégal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-dark/55 leading-relaxed"
          >
            Basé à Dakar, j'interviens dans tous les quartiers de la capitale et sa banlieue.
            Déplacement possible partout au Sénégal.
          </motion.p>
        </div>

        {/* Areas grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {areas.map((area) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: area.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 group hover:bg-brand-blue hover:border-brand-blue hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand-blue group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                <MapPin size={18} />
              </div>
              <span className="font-semibold text-brand-dark group-hover:text-white transition-colors text-sm">{area.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-2xl mx-auto bg-brand-blue/5 border border-brand-blue/10 rounded-2xl px-6 py-4 flex items-center justify-center gap-3 text-center"
        >
          <Zap size={18} className="text-brand-orange shrink-0" fill="currentColor" />
          <p className="text-sm font-semibold text-brand-dark/70">
            Déplacement possible <strong className="text-brand-dark">partout au Sénégal</strong> selon les besoins — contactez-moi pour un devis.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InterventionArea;
