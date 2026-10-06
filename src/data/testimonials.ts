export interface TestimonialItem {
  id: string | number;
  text: string;
  author: string;          // Prénom du client
  location: string;        // Quartier (ex: Ouakam, Almadies)
  screenshotUrl?: string;  // Optionnel : capture d'écran du message WhatsApp
  date?: string;           // Optionnel
}

/**
 * Liste des témoignages clients réels.
 * RÈGLE : Si ce tableau est vide, la section Témoignages ne s'affiche pas sur le site.
 * Remplir uniquement avec de vrais messages reçus par WhatsApp ou SMS.
 */
export const testimonialsData: TestimonialItem[] = [
  // Exemple prêt à être décommenté dès réception d'avis réels :
  // {
  //   id: 1,
  //   text: "Intervention rapide pour ma pompe de surpresseur qui ne démarrait plus. Travail propre et prix convenu respecté.",
  //   author: "Amadou",
  //   location: "Ouakam",
  // },
];
