import React from 'react';
import { Button } from './ui/Button';

const MobileActionBar: React.FC = () => {
  const whatsappUrl = "https://wa.me/221704646450?text=" + encodeURIComponent("Bonjour Ousmane, j'ai besoin d'une intervention technique urgente.");

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#FAF9F5]/98 backdrop-blur-md border-t border-[#D8D2C0] px-3.5 pt-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))' }}
      aria-label="Actions rapides directes"
    >
      <div className="flex items-center gap-3 w-full max-w-lg mx-auto">
        <div className="flex-1">
          <Button
            variant="call"
            href="tel:+221766029637"
            fullWidth
            className="!min-h-[52px] !py-3.5 !px-4 text-base font-bold shadow-sm"
          >
            Appeler
          </Button>
        </div>
        <div className="flex-1">
          <Button
            variant="whatsapp"
            href={whatsappUrl}
            target="_blank"
            fullWidth
            className="!min-h-[52px] !py-3.5 !px-4 text-base font-bold shadow-sm"
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default MobileActionBar;
