import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Zap, Wind, Camera, ArrowUpRight, Wrench, MessageCircle } from 'lucide-react';

const services = [
  {
    title: 'Pompes à Eau',
    description: 'Vente, installation et réparation de pompes immergées, de surface, surpresseurs et forages. Dépannage urgent.',
    icon: Droplets,
    accent: 'from-blue-600 to-blue-700',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    tag: 'Service Phare',
    featured: true,
  },
  {
    title: 'Électricité',
    description: 'Installation électrique, dépannage en urgence, mise aux normes et maintenance complète.',
    icon: Zap,
    accent: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    featured: false,
  },
  {
    title: 'Climatisation',
    description: 'Installation, recharge de gaz, nettoyage et réparation de tous types de climatiseurs.',
    icon: Wind,
    accent: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    featured: false,
  },
  {
    title: 'Caméras & Sécurité',
    description: 'Installation de caméras de surveillance, systèmes de sécurité et configuration mobile.',
    icon: Camera,
    accent: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    featured: false,
  },
  {
    title: 'Plomberie Générale',
    description: 'Réparation de fuites, installation sanitaire, remplacement de robinetterie et tuyauterie.',
    icon: Wrench,
    accent: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    featured: false,
  },
];

const whatsappUrl = "https://wa.me/221704646450?text=Bonjour,%20j'ai%20vu%20vos%20services%20et%20j'aimerais%20un%20devis.";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const Services: React.FC = () => {
  const [featured, ...rest] = services;

  return (
    <section id="services" className="py-28 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/3 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-4"
            >
              Ce que je fais
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-display font-bold mb-5 leading-tight"
            >
              Services{' '}
              <span className="text-brand-blue">Professionnels</span>{' '}
              à votre disposition.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-brand-dark/55 leading-relaxed"
            >
              Une expertise polyvalente pour tous vos besoins — un seul interlocuteur de confiance.
            </motion.p>
          </div>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ gap: '12px' }}
            className="flex items-center gap-2 font-bold text-brand-blue hover:text-brand-blue/80 transition-all whitespace-nowrap group"
          >
            <MessageCircle size={18} className="text-[#25D366]" />
            Demander un devis gratuit
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Featured card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="lg:col-span-1 lg:row-span-2 group relative bg-gradient-to-br from-brand-blue via-[#1e4a8a] to-[#0f2a5c] rounded-3xl p-8 flex flex-col justify-between overflow-hidden min-h-[340px] cursor-pointer shadow-2xl shadow-brand-blue/30"
          >
            {/* Decorative circles */}
            <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-white/5 rounded-full" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 right-8 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/25 transition-colors">
                <featured.icon size={28} className="text-white" />
              </div>
              <span className="inline-block bg-brand-orange text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                {featured.tag}
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">{featured.title}</h3>
              <p className="text-white/65 leading-relaxed text-sm">{featured.description}</p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-all group-hover:gap-3"
            >
              Contacter maintenant <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* Regular cards */}
          {rest.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group p-7 rounded-3xl border border-gray-100 bg-white hover:border-brand-blue/15 hover:shadow-2xl hover:shadow-brand-blue/6 transition-all duration-400 cursor-pointer"
            >
              <div className={`w-13 h-13 w-12 h-12 ${service.bg} ${service.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2.5 text-brand-dark">{service.title}</h3>
              <p className="text-brand-dark/55 leading-relaxed text-sm mb-6">{service.description}</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Réserver <ArrowUpRight size={13} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
