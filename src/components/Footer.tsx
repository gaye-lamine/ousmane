import React from 'react';
import { Container, Button } from './ui';

const Footer: React.FC = () => {
  const whatsappUrl = "https://wa.me/221704646450?text=" + encodeURIComponent("Bonjour Ousmane, j'ai besoin d'une intervention en urgence.");

  const phoneNumbers = [
    { display: '76 602 96 37', href: 'tel:+221766029637', label: 'Ligne directe' },
    { display: '77 020 77 30', href: 'tel:+221770207730', label: 'Second contact' },
    { display: '70 464 64 50', href: 'tel:+221704646450', label: 'WhatsApp & Appel' },
  ];

  const navLinks = [
    { label: 'Accueil', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Réalisations', href: '#realisations' },
    { label: 'À Propos', href: '#about' },
  ];

  return (
    <footer id="contact" className="w-full">
      {/* ── 1. BANDEAU CTA FINAL (BLEU NUIT UNI, SANS GRILLE, SANS DÉGRADÉ) ── */}
      <section className="bg-night-900 text-sand-50 py-20 sm:py-28 border-b border-night-700">
        <Container size="narrow">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-display text-display-xl sm:text-display-2xl uppercase tracking-tight text-sand-50 mb-4 max-w-2xl leading-none">
              Besoin d'un dépannage ou d'un devis à Dakar ?
            </h2>

            <p className="font-sans text-body-base sm:text-body-lg text-sand-300 max-w-md mb-10 leading-relaxed">
              Contactez Ousmane directement par téléphone ou WhatsApp pour convenir d'un passage.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                variant="call"
                href="tel:+221766029637"
                className="text-base font-bold"
              >
                Appeler le 76 602 96 37
              </Button>
              <Button
                variant="whatsapp"
                href={whatsappUrl}
                target="_blank"
                className="text-base font-bold"
              >
                WhatsApp (Message direct)
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. FOOTER TECHNIQUE & COORDONNÉES ── */}
      <div className="bg-night-950 text-sand-50 py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-night-800">
            {/* Colonne 1 : Identité */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-sand-50 uppercase block">
                  OUSMANE
                </span>
                <span className="font-sans text-xs font-semibold tracking-widest text-sand-400 uppercase block mb-4">
                  Technicien Supérieur
                </span>
                <p className="font-sans text-sm text-sand-300 max-w-sm leading-relaxed">
                  Intervention en plomberie, pompes à eau, climatisation, électricité et vidéosurveillance à Dakar et sur l'ensemble du territoire sénégalais.
                </p>
              </div>
            </div>

            {/* Colonne 2 : Coordonnées (3 numéros + adresse) */}
            <div className="md:col-span-4 flex flex-col">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-action-orange mb-4 block">
                Téléphones & Adresse
              </span>

              <ul className="space-y-3 font-sans text-sm">
                {phoneNumbers.map((p) => (
                  <li key={p.display}>
                    <a
                      href={p.href}
                      className="text-sand-100 hover:text-action-orange transition-colors font-medium flex items-center gap-2"
                    >
                      <span className="font-bold">{p.display}</span>
                      <span className="text-sand-400 text-xs font-normal">({p.label})</span>
                    </a>
                  </li>
                ))}
                <li className="pt-2 text-sand-300">
                  <span className="block font-medium text-sand-100">Atelier / Base :</span>
                  Dakar, Rue fleuriste en face Orca
                </li>
              </ul>
            </div>

            {/* Colonne 3 : Navigation */}
            <div className="md:col-span-3 flex flex-col">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-sand-400 mb-4 block">
                Plan du site
              </span>
              <ul className="space-y-2.5 font-sans text-sm">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sand-300 hover:text-sand-50 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mentions légales sobres */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-400 gap-4">
            <p>© {new Date().getFullYear()} Ousmane – Technicien Supérieur · Dakar, Sénégal.</p>
            <p>Tous droits réservés.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
