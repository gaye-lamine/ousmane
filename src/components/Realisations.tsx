import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon, Video } from 'lucide-react';

// ─────────────────────────────────────────────
// 📁 AJOUTE TES MÉDIAS ICI
// Pour chaque fichier dans src/assets/realisations/
// indique le nom et le type ("image" ou "video")
// ─────────────────────────────────────────────
type MediaType = 'image' | 'video';

interface MediaItem {
  id: number;
  type: MediaType;
  src: string;
  thumb?: string; // optionnel : miniature pour les vidéos
  label?: string;
}

// ─────────────────────────────────────────────
// URLs Cloudinary — ajoute / modifie ici
// ─────────────────────────────────────────────
const mediaItems: MediaItem[] = [
  { id: 1, type: 'video', src: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356215/2_loso2d.mp4',  label: 'Réalisation 1' },
  { id: 2, type: 'video', src: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356212/5_jtsrf6.mp4',  label: 'Réalisation 2' },
  { id: 3, type: 'video', src: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356202/7_rm3dsz.mp4',  label: 'Réalisation 3' },
  { id: 4, type: 'video', src: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356202/8_qdj85c.mp4',  label: 'Réalisation 4' },
  { id: 5, type: 'video', src: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356201/10_vtcf8t.mp4', label: 'Réalisation 5' },
  { id: 6, type: 'video', src: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356198/3_ldzzqr.mp4',  label: 'Réalisation 6' },
  // Pour ajouter une photo :
  // { id: 7, type: 'image', src: 'https://res.cloudinary.com/dygcctw10/image/upload/...', label: 'Réalisation 7' },
];

// ─────────────────────────────────────────────

const VideoThumb: React.FC<{ src: string; onClick: () => void; label?: string; index: number }> = ({
  src, onClick, label, index,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={onClick}
      className="group relative aspect-video bg-brand-dark rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-brand-blue/20 transition-shadow duration-300"
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
        muted
        playsInline
        preload="metadata"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
          <Play size={22} className="text-white ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white text-xs font-semibold truncate">{label}</p>
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
        <Video size={10} className="text-white/80" />
        <span className="text-[10px] text-white/80 font-medium">Vidéo</span>
      </div>
    </motion.div>
  );
};

const ImageThumb: React.FC<{ src: string; onClick: () => void; label?: string; index: number }> = ({
  src, onClick, label, index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    onClick={onClick}
    className="group relative aspect-video bg-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-brand-blue/20 transition-shadow duration-300"
  >
    <img src={src} alt={label ?? ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Zoom icon */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
        <ZoomIn size={20} className="text-white" />
      </div>
    </div>

    {label && (
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs font-semibold truncate">{label}</p>
      </div>
    )}

    {/* Type badge */}
    <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
      <ImageIcon size={10} className="text-white/80" />
      <span className="text-[10px] text-white/80 font-medium">Photo</span>
    </div>
  </motion.div>
);

// ── Modal plein écran ──
const Modal: React.FC<{
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ items, currentIndex, onClose, onPrev, onNext }) => {
  const item = items[currentIndex];

  // Fermer avec Escape, naviguer avec flèches
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  // Bloquer le scroll du body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
      >
        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Compteur */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/70 text-sm font-medium">
          {currentIndex + 1} / {items.length}
        </div>

        {/* Flèche gauche */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Précédent"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Flèche droite */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Suivant"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Contenu */}
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative max-w-5xl max-h-[85vh] w-full mx-16 flex flex-col items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <video
              src={item.src}
              controls
              autoPlay
              className="w-full max-h-[78vh] rounded-2xl object-contain shadow-2xl"
              style={{ background: '#000' }}
            />
          ) : (
            <img
              src={item.src}
              alt={item.label ?? ''}
              className="w-full max-h-[78vh] rounded-2xl object-contain shadow-2xl"
            />
          )}

          {item.label && (
            <p className="text-white/60 text-sm font-medium">{item.label}</p>
          )}
        </motion.div>

        {/* Miniatures en bas */}
        {items.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((m, i) => (
              <button
                key={m.id}
                onClick={(e) => { e.stopPropagation(); /* navigate to i */ }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Aller au média ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// ── Composant principal ──
const Realisations: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const filtered = activeFilter === 'all'
    ? mediaItems
    : mediaItems.filter((m) => m.type === activeFilter);

  const openModal = useCallback((index: number) => setModalIndex(index), []);
  const closeModal = useCallback(() => setModalIndex(null), []);
  const prevItem = useCallback(() => setModalIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0)), [filtered.length]);
  const nextItem = useCallback(() => setModalIndex((i) => (i !== null ? (i + 1) % filtered.length : 0)), [filtered.length]);

  const hasImages = mediaItems.some((m) => m.type === 'image');
  const hasVideos = mediaItems.some((m) => m.type === 'video');

  return (
    <section id="realisations" className="py-28 bg-brand-light relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/4 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-4"
          >
            Mes travaux
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-bold mb-5 leading-tight"
          >
            Mes <span className="text-brand-blue">Réalisations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-dark/55"
          >
            Des installations soignées, des dépannages réussis — la preuve en images.
          </motion.p>
        </div>

        {/* Filtres */}
        {(hasImages && hasVideos) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex justify-center gap-2 mb-10"
          >
            {(['all', 'image', 'video'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/25'
                    : 'bg-white text-brand-dark/60 border border-gray-200 hover:border-brand-blue/30 hover:text-brand-blue'
                }`}
              >
                {f === 'all' ? 'Tout voir' : f === 'image' ? '📷 Photos' : '🎬 Vidéos'}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, index) =>
            item.type === 'video' ? (
              <VideoThumb
                key={item.id}
                src={item.src}
                label={item.label}
                index={index}
                onClick={() => openModal(index)}
              />
            ) : (
              <ImageThumb
                key={item.id}
                src={item.src}
                label={item.label}
                index={index}
                onClick={() => openModal(index)}
              />
            )
          )}
        </div>

        {/* Message si vide */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-brand-dark/40">
            <p className="text-lg font-medium">Aucun média dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <Modal
          items={filtered}
          currentIndex={modalIndex}
          onClose={closeModal}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  );
};

export default Realisations;
