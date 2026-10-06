import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type SectionTheme = 'sand' | 'sand-warm' | 'night' | 'night-deep';
export type SectionSpacing = 'default' | 'compact' | 'hero' | 'none';

export interface SectionProps {
  id?: string;
  theme?: SectionTheme;
  spacing?: SectionSpacing;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  theme = 'sand',
  spacing = 'default',
  children,
  className = '',
  animate = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const themeClasses: Record<SectionTheme, string> = {
    sand: 'bg-sand-100 text-night-900 border-b border-sand-300',
    'sand-warm': 'bg-sand-50 text-night-900 border-b border-sand-300',
    night: 'bg-night-900 text-sand-50 border-b border-night-700',
    'night-deep': 'bg-night-950 text-sand-50 border-b border-night-700',
  };

  const spacingClasses: Record<SectionSpacing, string> = {
    hero: 'pt-24 pb-16 sm:pt-32 sm:pb-24',
    default: 'py-16 sm:py-24',
    compact: 'py-12 sm:py-16',
    none: 'py-0',
  };

  const combinedClasses = `relative w-full ${themeClasses[theme]} ${spacingClasses[spacing]} ${className}`.trim();

  if (!animate || shouldReduceMotion) {
    return (
      <section id={id} className={combinedClasses}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className={combinedClasses}
    >
      {children}
    </motion.section>
  );
};

export default Section;
