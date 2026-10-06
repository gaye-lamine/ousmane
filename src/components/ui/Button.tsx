import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export type ButtonVariant = 'call' | 'whatsapp';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  href,
  target,
  rel,
  fullWidth = false,
  children,
  icon,
  className = '',
  disabled,
  style = {},
  ...rest
}) => {
  // Styles de base communs : hauteur min 52px, rayon 6px (rounded), typo lisible, focus accessible
  const baseClasses =
    'min-h-[52px] px-6 py-3.5 inline-flex items-center justify-center gap-2.5 rounded font-sans text-base font-semibold text-white tracking-wide transition-colors duration-150 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2';

  // Couleurs franches en hex direct Tailwind JIT + styles en ligne de secours pour garantir 100% de visibilité
  const variantClasses = {
    call: 'bg-[#C8480C] hover:bg-[#B23D08] active:bg-[#9E3406] text-white focus-visible:outline-[#C8480C]',
    whatsapp: 'bg-[#15803D] hover:bg-[#116832] active:bg-[#0D5326] text-white focus-visible:outline-[#15803D]',
  }[variant];

  const fallbackBg = variant === 'call' ? '#C8480C' : '#15803D';
  const buttonStyle: React.CSSProperties = {
    backgroundColor: fallbackBg,
    color: '#ffffff',
    ...style,
  };

  const widthClass = fullWidth ? 'w-full' : 'w-auto';
  const disabledClass = disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : '';
  const combinedClasses = `${baseClasses} ${variantClasses} ${widthClass} ${disabledClass} ${className}`.trim();

  // Icône par défaut selon la variante
  const defaultIcon =
    variant === 'call' ? (
      <Phone size={20} strokeWidth={2.2} className="shrink-0 text-white" aria-hidden="true" />
    ) : (
      <MessageCircle size={20} strokeWidth={2.2} className="shrink-0 fill-current text-white" aria-hidden="true" />
    );

  const renderedIcon = icon !== undefined ? icon : defaultIcon;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={combinedClasses}
        style={buttonStyle}
      >
        {renderedIcon}
        <span className="text-white">{children}</span>
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      style={buttonStyle}
      disabled={disabled}
      {...rest}
    >
      {renderedIcon}
      <span className="text-white">{children}</span>
    </button>
  );
};

export default Button;
