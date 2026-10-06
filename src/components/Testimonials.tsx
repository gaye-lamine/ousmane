import React from 'react';
import { Section, Container } from './ui';
import { testimonialsData } from '../data/testimonials';

const Testimonials: React.FC = () => {
  // RÈGLE : Ne rien afficher tant qu'il n'y a pas de vrais avis clients enregistrés
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <Section id="testimonials" theme="sand" spacing="default">
      <Container>
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-action-orange mb-3 block">
            Retours de clients
          </span>
          <h2 className="font-display text-display-xl uppercase text-night-900 leading-none mb-4">
            Avis vérifiés de clients à Dakar.
          </h2>
          <p className="font-sans text-body-base text-night-600 leading-relaxed">
            Messages authentiques reçus après dépannage ou fin de chantier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded bg-sand-50 border border-sand-300 flex flex-col justify-between"
            >
              <blockquote className="font-sans text-base text-night-900 leading-relaxed mb-6 italic">
                "{item.text}"
              </blockquote>

              <div className="pt-4 border-t border-sand-300/80 flex items-center justify-between">
                <div>
                  <p className="font-display text-base uppercase tracking-tight text-night-900">
                    {item.author}
                  </p>
                  <p className="font-sans text-xs text-night-500">
                    {item.location}
                  </p>
                </div>

                {item.screenshotUrl && (
                  <a
                    href={item.screenshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-action-whatsapp font-semibold hover:underline"
                  >
                    Voir capture
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
