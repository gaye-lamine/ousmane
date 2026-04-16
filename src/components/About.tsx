import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Clock, Phone, MessageCircle } from 'lucide-react';
import ousmanePhoto from '../assets/ousmane.jpeg';

const whatsappUrl = "https://wa.me/221704646450?text=Bonjour,%20j'ai%20vu%20vos%20services%20et%20j'aimerais%20un%20devis.";

const highlights = [
  "Intervention Rapide (Dakar & Banlieue)",
  "Devis Gratuit & Transparent",
  "Matériel Certifié & Durable",
  "Service Après-Vente Réactif",
];

const metrics = [
  { icon: Users, value: '+100', label: 'Clients satisfaits', color: 'text-brand-blue', bg: 'bg-brand-blue/8' },
  { icon: Clock, value: '24h/7', label: 'Disponibilité', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Award, value: '100%', label: 'Garantie travaux', color: 'text-brand-orange', bg: 'bg-brand-orange/8' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-brand-light overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/4 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ── LEFT — Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-brand-blue/10 rounded-[3rem] blur-3xl scale-90 -z-10" />

            <div className="relative bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-brand-dark/8">
              <div className="w-full aspect-square bg-gray-100 rounded-[2rem] overflow-hidden">
                <img
                  src={ousmanePhoto}
                  alt="Ousmane – Technicien Supérieur"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Metrics overlay */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl p-4 shadow-xl shadow-black/8 border border-gray-50 flex justify-between">
                {metrics.map((m) => (
                  <div key={m.label} className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 ${m.bg} rounded-xl flex items-center justify-center`}>
                      <m.icon size={16} className={m.color} />
                    </div>
                    <span className={`text-base font-bold font-display ${m.color}`}>{m.value}</span>
                    <span className="text-[9px] text-brand-dark/40 font-semibold uppercase tracking-wider text-center leading-tight">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — Content ── */}
          <div className="flex flex-col gap-8 mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-4">
                Qui suis-je ?
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                À propos d'<span className="text-brand-blue">Ousmane</span>.
              </h2>
              <p className="text-lg text-brand-dark/55 leading-relaxed">
                Technicien Supérieur basé à Dakar, j'ai bâti ma réputation sur la{' '}
                <strong className="text-brand-dark/80 font-semibold">rigueur, la ponctualité</strong> et la satisfaction client.
                Spécialisé en installations complexes et dépannages d'urgence, je mets mon expertise au service de votre confort et de votre sécurité.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/15 transition-all duration-300"
                >
                  <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-brand-dark/80">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-whatsapp text-sm px-6 py-3.5 font-bold"
              >
                <MessageCircle size={17} fill="currentColor" />
                Contacter via WhatsApp
              </motion.a>
              <motion.a
                href="tel:+221766029637"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-orange text-sm px-6 py-3.5 font-bold"
              >
                <Phone size={17} />
                76 602 96 37
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
