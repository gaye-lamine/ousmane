import React from 'react';
import { Section, Container, Button } from './ui';

const About: React.FC = () => {
  const whatsappUrl = "https://wa.me/221704646450?text=" + encodeURIComponent("Bonjour Ousmane, j'aimerais en savoir plus sur vos services.");

  return (
    <Section id="about" theme="sand" spacing="default">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* 1. Visuel Portrait Serré */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="w-full max-w-sm aspect-[4/5] rounded bg-[#FAF9F5] border border-[#D8D2C0] overflow-hidden shadow-sm">
              <img
                src="/assets/portrait-ousmane-close.webp"
                alt="Portrait rapproché d'Ousmane – Plombier électricien technicien à Dakar"
                width="400"
                height="500"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* 2. Texte à la première personne */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#C8480C] mb-3 block">
              L'artisan
            </span>
            
            <h2 className="font-display text-display-xl uppercase text-[#0A1322] leading-none mb-6">
              Ousmane, technicien de terrain à Dakar.
            </h2>

            <div className="space-y-4 font-sans text-body-base text-[#1E2D4A] leading-relaxed max-w-xl">
              <p>
                Je suis technicien supérieur indépendant, intervenant directement chez les particuliers, commerces et entreprises à Dakar. Je prends en charge vos travaux d’installation et de dépannage en plomberie, pompage d’eau, climatisation, électricité et vidéosurveillance.
              </p>
              
              <p className="text-[#334155]">
                Diplômé en maintenance industrielle et électrotechnique, j'exerce depuis <strong className="text-[#0A1322] font-bold">plus de 5 ans sur le terrain à Dakar</strong> avec une méthode simple : être ponctuel, poser un diagnostic clair avant de commencer et ne jamais bâcler une finition.
              </p>

              <p className="text-[#334155]">
                Ce que je garantis sur chaque chantier : des pièces et raccordements fiables, une facture transparente sans surprise, et un suivi direct après intervention.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8">
              <Button
                variant="call"
                href="tel:+221766029637"
                className="!min-h-[48px] !py-2.5 !px-5 text-sm font-bold"
              >
                76 602 96 37
              </Button>
              <Button
                variant="whatsapp"
                href={whatsappUrl}
                target="_blank"
                className="!min-h-[48px] !py-2.5 !px-5 text-sm font-bold"
              >
                Échanger sur WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
