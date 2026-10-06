export interface RealisationItem {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  poster: string;
  loop: string;
  videoSrc: string;
}

export const realisationsData: RealisationItem[] = [
  // ── TOP 3 EN TÊTE ──
  {
    id: 1,
    title: "Raccordement citerne d'eau & pompe surpresseur",
    category: "Pompe & Plomberie",
    location: "Ouakam",
    description: "Installation d'un réservoir d'eau tampon en toiture-terrasse avec clapet anti-retour et circuit de distribution sous pression.",
    poster: "/assets/video-1-poster.webp",
    loop: "/assets/video-1-loop.mp4",
    videoSrc: "https://res.cloudinary.com/dygcctw10/video/upload/v1776356215/2_loso2d.mp4",
  },
  {
    id: 5,
    title: "Installation d'équipement mural en hauteur",
    category: "Climatisation & Froid",
    location: "Almadies",
    description: "Fixation renforcée, raccordement frigorifique étanche et mise en service d'une unité murale en hauteur.",
    poster: "/assets/video-5-poster.webp",
    loop: "/assets/video-5-loop.mp4",
    videoSrc: "https://res.cloudinary.com/dygcctw10/video/upload/v1776356201/10_vtcf8t.mp4",
  },
  {
    id: 3,
    title: "Câblage minutieux et protection coffret électrique",
    category: "Électricité",
    location: "Plateau",
    description: "Raccordement de condensateur et peigne d'alimentation dans un boîtier étanche pour sécuriser l'installation.",
    poster: "/assets/video-3-poster.webp",
    loop: "/assets/video-3-loop.mp4",
    videoSrc: "https://res.cloudinary.com/dygcctw10/video/upload/v1776356202/7_rm3dsz.mp4",
  },

  // ── RANGÉE HORIZONTALE SCROLL-SNAP (3 AUTRES) ──
  {
    id: 6,
    title: "Raccordement et diagnostic coffret de commande",
    category: "Électricité",
    location: "Mermoz",
    description: "Identification de court-circuit, réorganisation des fils de phase/neutre et test de continuité.",
    poster: "/assets/video-6-poster.webp",
    loop: "/assets/video-6-loop.mp4",
    videoSrc: "https://res.cloudinary.com/dygcctw10/video/upload/v1776356198/3_ldzzqr.mp4",
  },
  {
    id: 4,
    title: "Plomberie sanitaire et finition salle de bain",
    category: "Plomberie",
    location: "Ngor",
    description: "Raccordement eau chaude/froide, robinetterie chromée et vérification d'étanchéité post-chantier.",
    poster: "/assets/video-4-poster.webp",
    loop: "/assets/video-4-loop.mp4",
    videoSrc: "https://res.cloudinary.com/dygcctw10/video/upload/v1776356202/8_qdj85c.mp4",
  },
  {
    id: 2,
    title: "Passage de gaines techniques et gros œuvre",
    category: "Électricité & Chantier",
    location: "Diamniadio",
    description: "Passage sous dalle et encastrement de gaines ICTA avant coulage de chape.",
    poster: "/assets/video-2-poster.webp",
    loop: "/assets/video-2-loop.mp4",
    videoSrc: "https://res.cloudinary.com/dygcctw10/video/upload/v1776356212/5_jtsrf6.mp4",
  },
];
