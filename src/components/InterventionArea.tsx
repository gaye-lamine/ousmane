import React from 'react';
import { Section, Container } from './ui';

const quartiers = [
  'Plateau',
  'Médina',
  'Almadies',
  'Ngor',
  'Yoff',
  'Ouakam',
  'Mermoz',
  'Fann',
  'Point E',
  'Grand Dakar',
  'Grand Yoff',
  'Parcelles Assainies',
  'Pikine',
  'Guédiawaye',
  'Rufisque',
  'Diamniadio',
];

const InterventionArea: React.FC = () => {
  return (
    <Section id="zone" theme="sand-warm" spacing="compact">
      <Container size="narrow">
        <div className="border-t border-sand-300 pt-12 text-center md:text-left">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-action-orange mb-3 block">
            Périmètre d'action
          </span>

          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-night-900 mb-4">
            Dakar et banlieue · Déplacement possible ailleurs au Sénégal sur devis.
          </h2>

          <p className="font-sans text-body-base text-night-700 leading-relaxed mb-6">
            J'interviens rapidement pour tout dépannage ou rendez-vous technique dans l'ensemble des quartiers de la capitale :
          </p>

          {/* Liste de quartiers en texte courant séparés par des points médians */}
          <p className="font-sans text-sm sm:text-base text-night-600 font-medium leading-loose bg-sand-100 p-5 rounded border border-sand-300">
            {quartiers.map((q, idx) => (
              <React.Fragment key={q}>
                <span className="text-night-900 font-semibold">{q}</span>
                {idx < quartiers.length - 1 && (
                  <span className="text-night-400 mx-2.5 font-normal">·</span>
                )}
              </React.Fragment>
            ))}
          </p>

          <p className="font-sans text-xs sm:text-sm text-night-500 mt-4">
            Pour les autres régions du Sénégal (Thiès, Mbour, Saly, Saint-Louis, etc.), me contacter directement pour convenir des modalités de déplacement.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default InterventionArea;
