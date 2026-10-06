import React from 'react';
import { Button } from './ui/Button';

const domains = [
  { label: 'Pompes à eau', img: '/assets/service-pompe.webp' },
  { label: 'Plomberie', img: '/assets/service-plomberie.webp' },
  { label: 'Climatisation', img: '/assets/service-clim.webp' },
  { label: 'Électricité', img: '/assets/service-electricite.webp' },
  { label: 'Sécurité Caméras', img: '/assets/service-camera.webp' },
];

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/221704646450?text=" + encodeURIComponent("Bonjour Ousmane, j'ai besoin d'une intervention technique.");

  return (
    <section className="relative min-h-[100svh] w-full bg-[#FAF9F5] text-[#0A1322] overflow-hidden flex flex-col justify-between pt-24 pb-4 md:pt-28 md:pb-6">
      {/* ── MOBILE ONLY : Ousmane en fond estompé pour lisibilité parfaite ── */}
      <div className="absolute inset-0 z-0 pointer-events-none md:hidden overflow-hidden">
        <img
          src="/assets/portrait-ousmane.webp"
          alt="Ousmane – Plombier électricien technicien à Dakar"
          width="400"
          height="480"
          decoding="async"
          className="w-full h-[65%] object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/90 to-transparent" />
      </div>

      {/* ── ZONE CENTRALE (GRILLE 2 COLONNES SUR DESKTOP) ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-end flex-1 min-h-0">
          
          {/* Colonne gauche (7/12) : Titre, sous-titre & boutons */}
          <div className="md:col-span-7 flex flex-col justify-center py-6 md:py-10">
            {/* Titre court en display impactant */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] uppercase tracking-tight text-[#0A1322] mb-4 leading-[1.05] font-bold">
              Plomberie, électricité, clim.
              <span className="block text-[#4A5F82]">Ousmane intervient à Dakar.</span>
            </h1>

            {/* Sous-titre direct et concret */}
            <p className="font-sans text-base sm:text-lg text-[#334155] max-w-lg mb-8 leading-relaxed">
              Dépannage d'urgence et installations soignées 24h/24. Un seul artisan de confiance pour toute la maison et l'entreprise.
            </p>

            {/* Deux boutons d'action exclusifs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Button
                variant="call"
                href="tel:+221766029637"
                className="text-base font-bold shadow-sm"
              >
                Appeler · 76 602 96 37
              </Button>
              <Button
                variant="whatsapp"
                href={whatsappUrl}
                target="_blank"
                className="text-base font-bold shadow-sm"
              >
                WhatsApp · Devis Gratuit
              </Button>
            </div>
          </div>

          {/* Colonne droite (5/12) : Ousmane détouré, cantonné à sa colonne et au-dessus de la ligne */}
          <div className="hidden md:flex md:col-span-5 h-full items-end justify-center overflow-hidden self-end">
            <img
              src="/assets/portrait-ousmane.webp"
              alt="Ousmane – Plombier électricien technicien à Dakar"
              width="540"
              height="720"
              decoding="async"
              className="max-h-[calc(100svh-220px)] w-auto max-w-full object-contain object-bottom drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* ── DOMAINES / OBJETS EN BAS DU HERO (ZONE SÉPARÉE, AUCUNE SUPERPOSITION) ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto pt-4 pb-2 border-t border-[#D8D2C0]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {domains.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 py-1 group"
            >
              <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded bg-[#FAF9F5] border border-[#E9E5D8]/80 p-1">
                <img
                  src={item.img}
                  alt={`Prestation ${item.label} à Dakar`}
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                  className="max-h-8 max-w-8 object-contain"
                />
              </div>
              <span className="font-display text-sm font-semibold tracking-wide uppercase text-[#1E2D4A] group-hover:text-[#C8480C] transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
