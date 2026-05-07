import { forwardRef } from 'react';

const depthStyles = {
  flat: 'bg-transparent border-none',
  default: 'bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[var(--shadow-sm)]',
  elevated: 'bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-[var(--shadow-md)]',
  glass: 'bg-[var(--bg-glass)] border border-[var(--border-default)] backdrop-blur-md shadow-[var(--shadow-sm)]',
};

export const Card = forwardRef(
  ({ children, className = '', depth = 'default', interactive = false, ...props }, ref) => {
    const baseStyle = depthStyles[depth] || depthStyles.default;
    const interactStyle = interactive
      ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[var(--border-strong)] cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={`rounded-2xl ${baseStyle} ${interactStyle} overflow-hidden ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-5 py-4 border-b border-[var(--border-default)] ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-5 py-4 border-t border-[var(--border-default)] bg-[var(--bg-base)]/30 ${className}`}>
    {children}
  </div>
);
