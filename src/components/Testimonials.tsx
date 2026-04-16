import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Mamadou Diop',
    role: 'Particulier · Ouakam',
    text: "Ousmane est intervenu en moins de 30 minutes pour une fuite d'eau importante. Très professionnel et courtois. Je recommande les yeux fermés !",
    rating: 5,
    initials: 'MD',
    color: 'bg-brand-blue',
  },
  {
    name: 'Awa Ndiaye',
    role: 'Gérante de boutique · Plateau',
    text: "Installation complète de la climatisation et des caméras de surveillance. Travail soigné et explications claires. Un vrai pro.",
    rating: 5,
    initials: 'AN',
    color: 'bg-brand-orange',
  },
  {
    name: 'Cheikh Tidiane',
    role: 'Propriétaire · Almadies',
    text: "Enfin un électricien ponctuel et compétent ! Il a résolu mes pannes récurrentes que d'autres n'avaient pas réussi à fixer.",
    rating: 5,
    initials: 'CT',
    color: 'bg-emerald-600',
  },
];

const whatsappUrl = "https://wa.me/221704646450?text=Bonjour,%20j'ai%20vu%20vos%20services%20et%20j'aimerais%20un%20devis.";

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/3 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-4"
          >
            Ils me font confiance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-bold mb-5 leading-tight"
          >
            Ce que mes{' '}
            <span className="text-brand-blue">clients</span> disent.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-dark/55"
          >
            La satisfaction de mes clients est ma priorité absolue.
          </motion.p>

          {/* Star summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 px-5 py-2.5 rounded-full mt-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-bold text-amber-700">5.0 / 5</span>
            <span className="text-sm text-amber-600/70">· +100 interventions</span>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/6 hover:border-brand-blue/10 transition-all duration-400 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={32} className="text-brand-blue/10" />

              {/* Text */}
              <p className="text-brand-dark/65 leading-relaxed text-sm flex-1 italic">
                "{item.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center shrink-0`}>
                  <span className="text-white text-xs font-bold">{item.initials}</span>
                </div>
                <div>
                  <p className="font-bold text-brand-dark text-sm">{item.name}</p>
                  <p className="text-xs text-brand-dark/40 font-medium">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-brand-dark/50 text-sm mb-5">
            Rejoignez des dizaines de clients satisfaits à Dakar
          </p>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-whatsapp inline-flex text-sm px-8 py-4 font-bold shadow-xl shadow-[#25D366]/25"
          >
            <MessageCircle size={18} fill="currentColor" />
            Demander mon devis gratuit
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
