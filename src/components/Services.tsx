import React from 'react';
import { Section, Container, Button } from './ui';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  details: string;
  image: string;
  whatsappMessage: string;
}

const services: ServiceItem[] = [
  {
    number: '01',
    title: 'Pompes à eau & Surpresseurs',
    description: 'Vente, raccordement et remise en état de marche de pompes de surface, pompes immergées et ballons surpresseurs.',
    details: 'Diagnostic des problèmes de pression, remplacement de garnitures mécaniques et dépannage d’urgence pour l’alimentation en eau.',
    image: '/assets/service-pompe.webp',
    whatsappMessage: "Bonjour Ousmane, j'ai besoin d'un devis pour une pompe à eau ou un surpresseur.",
  },
  {
    number: '02',
    title: 'Plomberie Sanitaire & Raccordements',
    description: 'Installation complète, recherche et réparation immédiate de fuites d’eau sur circuits PVC, cuivre et multicouche.',
    details: 'Pose et remplacement de robinetterie, chauffe-eau, tuyauteries d’évacuation et équipements sanitaires.',
    image: '/assets/service-plomberie.webp',
    whatsappMessage: "Bonjour Ousmane, j'ai besoin d'un devis pour des travaux de plomberie.",
  },
  {
    number: '03',
    title: 'Climatisation & Systèmes de Froid',
    description: 'Pose soignée de climatiseurs split neufs, tirage au vide, raccordement frigorifique et électrique.',
    details: 'Recharge en gaz frigorigène, nettoyage complet des filtres et turbines, réparation de pannes de démarrage et fuites de condensats.',
    image: '/assets/service-clim.webp',
    whatsappMessage: "Bonjour Ousmane, j'ai besoin d'un devis pour un climatiseur (installation ou dépannage).",
  },
  {
    number: '04',
    title: 'Électricité Générale & Tableaux',
    description: 'Mise en conformité de tableaux électriques, remplacement de disjoncteurs différentiels et câblage sécurisé.',
    details: 'Recherche méthodique de court-circuit, résolution de surtensions, installation de prises, éclairages et alimentations dédiées.',
    image: '/assets/service-electricite.webp',
    whatsappMessage: "Bonjour Ousmane, j'ai besoin d'une intervention en électricité.",
  },
  {
    number: '05',
    title: 'Caméras & Sécurité Vidéo',
    description: 'Implantation stratégique et fixation de caméras dôme et extérieures haute définition à vision nocturne.',
    details: 'Câblage réseau propre, raccordement aux enregistreurs NVR/DVR et configuration de l’application sur votre smartphone.',
    image: '/assets/service-camera.webp',
    whatsappMessage: "Bonjour Ousmane, j'ai besoin d'un devis pour des caméras de surveillance.",
  },
];

const Services: React.FC = () => {
  return (
    <Section id="services" theme="sand" spacing="default">
      <Container>
        {/* En-tête de section sobre et éditorial */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-action-orange mb-3 block">
            Prestations techniques
          </span>
          <h2 className="font-display text-display-xl uppercase text-night-900 leading-none mb-4">
            Ce que j'installe et répare.
          </h2>
          <p className="font-sans text-body-base sm:text-body-lg text-night-600 leading-relaxed">
            Chaque intervention est effectuée avec outillage de précision, pièces certifiées et respect strict des règles de l’art.
          </p>
        </div>

        {/* 5 rangées alternées : image / texte */}
        <div className="flex flex-col gap-14 sm:gap-20">
          {services.map((item, index) => {
            const isReversed = index % 2 !== 0;
            const whatsappUrl = `https://wa.me/221704646450?text=${encodeURIComponent(item.whatsappMessage)}`;

            return (
              <div
                key={item.number}
                className={`flex flex-col ${
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                } items-center gap-8 lg:gap-14 pt-8 border-t border-sand-300 first:border-t-0 first:pt-0`}
              >
                {/* 1. Visuel haute définition */}
                <div className="w-full md:w-1/2 aspect-[4/3] rounded bg-sand-200 border border-sand-300 overflow-hidden shadow-subtle shrink-0">
                  <img
                    src={item.image}
                    alt={`Prestation technique : ${item.title} à Dakar`}
                    width="600"
                    height="450"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* 2. Texte éditorial & Action directe */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-display text-base font-bold text-night-400 tracking-wider">
                      {item.number}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-night-900">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-sans text-base text-night-900 font-medium leading-relaxed mb-2">
                    {item.description}
                  </p>
                  
                  <p className="font-sans text-sm text-night-600 leading-relaxed mb-6">
                    {item.details}
                  </p>

                  <div className="pt-2">
                    <Button
                      variant="whatsapp"
                      href={whatsappUrl}
                      target="_blank"
                      className="!min-h-[46px] !py-2.5 !px-5 text-sm w-full sm:w-auto"
                    >
                      Demander un devis pour ce service
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default Services;
