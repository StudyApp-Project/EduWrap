import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Dropdown({ trigger, children, align = 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 w-48 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-[var(--shadow-lg)] overflow-hidden ${
              align === 'right' ? 'origin-top-right right-0' : 'origin-top-left left-0'
            }`}
          >
            <div className="py-1" onClick={() => setIsOpen(false)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({ children, onClick, icon: Icon, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-glass)] transition-colors ${className}`}
    >
      {Icon && <Icon size={16} className="text-[var(--text-muted)]" />}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="h-px bg-[var(--border-default)] my-1" />;
}
