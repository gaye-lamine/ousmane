import React, { useState, useRef, useEffect } from 'react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container } from './ui';
import { realisationsData, type RealisationItem } from '../data/realisations';

// ── COMPOSANT CARTE VIDÉO (POSTER AU REPOS, BOUCLE AU HOVER) ──
interface VideoCardProps {
  item: RealisationItem;
  onClick: () => void;
  aspectClass?: string;
  isLarge?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  item,
  onClick,
  aspectClass = 'aspect-[4/5]',
  isLarge = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback silencieux
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col group cursor-pointer" onClick={onClick}>
      {/* Cadre vidéo interactif */}
      <div
        className={`relative w-full ${aspectClass} rounded bg-[#0A1322] overflow-hidden border border-[#D8D2C0] shadow-sm`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 1. Poster au repos */}
        <img
          src={item.poster}
          alt={`Chantier ${item.title} à ${item.location}`}
          width="480"
          height="360"
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 2. Boucle muette au hover (desktop) */}
        <video
          ref={videoRef}
          src={item.loop}
          muted
          playsInline
          loop
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Dégradé bas pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/70 via-transparent to-transparent pointer-events-none" />

        {/* Bouton de lecture sobre */}
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded bg-[#070D18]/80 backdrop-blur-sm text-[#FAF9F5] flex items-center justify-center border border-[#1E2D4A]/80 transition-transform duration-200 group-hover:scale-105">
          <Play size={16} fill="currentColor" className="ml-0.5 text-[#FAF9F5]" />
        </div>
      </div>

      {/* Légende sous la vidéo */}
      <div className="mt-3 flex flex-col">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8480C]">
          <span>{item.category}</span>
          <span className="text-[#BFB8A1]">·</span>
          <span className="text-[#4A5F82] font-medium lowercase tracking-normal">{item.location}</span>
        </div>
        <h3
          className={`font-display uppercase text-[#0A1322] tracking-tight mt-1 group-hover:text-[#C8480C] transition-colors duration-150 ${
            isLarge ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
          }`}
        >
          {item.title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#4A5F82] leading-relaxed mt-1">
          {item.description}
        </p>
      </div>
    </div>
  );
};

// ── LIGHTBOX PLEIN ÉCRAN (ÉCHAP + SWIPE MOBILE) ──
interface LightboxProps {
  items: RealisationItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const item = items[currentIndex];
  const touchStartY = useRef<number | null>(null);

  // Clavier : Échap, flèches
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Bloquer le scroll du document
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Détection du swipe tactile mobile vers le bas pour fermer
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaY) > 70) {
      onClose();
    }
    touchStartY.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#070D18]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Lecteur vidéo plein écran"
    >
      {/* Bouton fermer */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-11 h-11 rounded bg-[#121E34] text-[#FAF9F5] hover:bg-[#1E2D4A] border border-[#1E2D4A] flex items-center justify-center transition-colors focus-visible:outline-white cursor-pointer"
        aria-label="Fermer la vidéo (Échap)"
      >
        <X size={22} />
      </button>

      {/* Compteur discret */}
      <div className="absolute top-5 left-6 z-20 font-display text-sm tracking-widest uppercase text-[#D8D2C0]">
        {currentIndex + 1} / {items.length} · {item.category}
      </div>

      {/* Navigation gauche/droite */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded bg-[#121E34]/90 text-[#FAF9F5] hover:bg-[#1E2D4A] border border-[#1E2D4A] items-center justify-center transition-colors cursor-pointer"
            aria-label="Vidéo précédente"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded bg-[#121E34]/90 text-[#FAF9F5] hover:bg-[#1E2D4A] border border-[#1E2D4A] items-center justify-center transition-colors cursor-pointer"
            aria-label="Vidéo suivante"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Conteneur vidéo complet */}
      <div
        className="relative max-w-4xl max-h-[85svh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={item.id}
          src={item.videoSrc}
          controls
          autoPlay
          playsInline
          className="max-h-[75svh] w-auto max-w-full rounded bg-black border border-[#1E2D4A] shadow-2xl"
        />

        <div className="w-full max-w-xl text-center mt-3">
          <p className="font-display text-lg uppercase text-[#FAF9F5] tracking-tight">
            {item.title}
          </p>
          <p className="font-sans text-xs text-[#D8D2C0] mt-0.5">
            {item.location} · {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── COMPOSANT PRINCIPAL RÉALISATIONS ──
const Realisations: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Séparation : 1 grande + 2 moyennes en haut, et les 3 autres en scroll-snap
  const featuredMain = realisationsData[0]; // Vidéo 1 (Pompe/Citerne)
  const featuredTwo = realisationsData.slice(1, 3); // Vidéos 5 et 3
  const carouselItems = realisationsData.slice(3); // Vidéos 6, 4, 2

  const openLightbox = (id: number) => {
    const index = realisationsData.findIndex((r) => r.id === id);
    if (index !== -1) setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + realisationsData.length) % realisationsData.length : 0
    );
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % realisationsData.length : 0
    );
  };

  // Défilement déterministe avec boucle & calcul direct de position
  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.carousel-card');
    if (!cards.length) return;

    const total = cards.length;
    const targetIdx = (index + total) % total;
    setCarouselIndex(targetIdx);

    const targetCard = cards[targetIdx];
    if (targetCard) {
      const scrollPos = targetCard.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: scrollPos,
        behavior: 'smooth',
      });
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      scrollToIndex(carouselIndex + 1);
    } else {
      scrollToIndex(carouselIndex - 1);
    }
  };

  // Synchronisation au scroll manuel (tactile / molette)
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cards = container.querySelectorAll<HTMLElement>('.carousel-card');
      let closestIdx = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        const cardPos = card.offsetLeft - container.offsetLeft;
        const diff = Math.abs(cardPos - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      setCarouselIndex(closestIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="realisations" theme="sand-warm" spacing="default">
      <Container>
        {/* En-tête éditorial */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#C8480C] mb-3 block">
            Preuves de chantier
          </span>
          <h2 className="font-display text-display-xl uppercase text-[#0A1322] leading-none mb-4">
            Travaux récents en vidéo.
          </h2>
          <p className="font-sans text-body-base sm:text-body-lg text-[#4A5F82] leading-relaxed">
            Dépannages réels et installations filmées sur place à Dakar. Cliquez pour visionner la vidéo complète.
          </p>
        </div>

        {/* ── 1. COMPOSITION ASYMÉTRIQUE EN TÊTE (1 GRANDE + 2 MOYENNES) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          {/* A. La Grande Vidéo Principale (Citerne / Pompe - Vidéo 1) */}
          <div className="lg:col-span-7">
            <VideoCard
              item={featuredMain}
              onClick={() => openLightbox(featuredMain.id)}
              aspectClass="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]"
              isLarge
            />
          </div>

          {/* B. Les 2 Vidéos Moyennes (Clim & Électricité) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {featuredTwo.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
                onClick={() => openLightbox(item.id)}
                aspectClass="aspect-[16/10] sm:aspect-[16/9]"
              />
            ))}
          </div>
        </div>

        {/* ── 2. RANGÉE HORIZONTALE SCROLL-SNAP POUR LES 3 AUTRES VIDÉOS ── */}
        <div className="pt-10 border-t border-[#D8D2C0]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl uppercase tracking-tight text-[#0A1322]">
              Autres interventions à Dakar
            </h3>
            
            {/* Contrôles de défilement (Flèches + Indicateurs) */}
            <div className="flex items-center gap-3">
              {/* Indicateurs de position cliquables */}
              <div className="flex items-center gap-1.5 mr-1">
                {carouselItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      carouselIndex === idx
                        ? 'w-6 bg-[#C8480C]'
                        : 'w-2 bg-[#D8D2C0] hover:bg-[#BFB8A1]'
                    }`}
                    aria-label={`Aller à la vidéo ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Bouton Précédent */}
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-md bg-[#FAF9F5] hover:bg-[#C8480C] hover:text-white border border-[#D8D2C0] flex items-center justify-center text-[#0A1322] transition-colors active:scale-95 shadow-sm cursor-pointer"
                aria-label="Faire défiler vers la gauche"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Bouton Suivant */}
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-md bg-[#FAF9F5] hover:bg-[#C8480C] hover:text-white border border-[#D8D2C0] flex items-center justify-center text-[#0A1322] transition-colors active:scale-95 shadow-sm cursor-pointer"
                aria-label="Faire défiler vers la droite"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carrousel natif à largeur calibrée pour garantir le débordement et le scroll */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
            }}
          >
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="carousel-card w-[290px] sm:w-[380px] lg:w-[460px] shrink-0"
                style={{ scrollSnapAlign: 'start' }}
              >
                <VideoCard
                  item={item}
                  onClick={() => openLightbox(item.id)}
                  aspectClass="aspect-[16/10] sm:aspect-[4/3]"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Lightbox plein écran */}
      {lightboxIndex !== null && (
        <Lightbox
          items={realisationsData}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </Section>
  );
};

export default Realisations;
