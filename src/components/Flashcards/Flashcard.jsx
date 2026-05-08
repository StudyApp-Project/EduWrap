import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-full cursor-pointer relative [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] will-change-transform transform-gpu"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white dark:bg-[#1A1B2E] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] border border-black/5 dark:border-white/10 flex items-center justify-center p-8 text-center hover:shadow-[0_8px_32px_0_var(--accent-glow)] transition-all duration-300 will-change-transform transform-gpu">
          <h3 className="text-3xl md:text-4xl font-sora text-(--text-primary) font-semibold tracking-tight drop-shadow-sm leading-tight">{front}</h3>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white dark:bg-[#1A1B2E] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] border-2 border-(--accent)/40 flex items-center justify-center p-8 text-center will-change-transform transform-gpu relative overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* Subtle accent glow inside the back of the card to differentiate it */}
          <div className="absolute inset-0 bg-(--accent)/5 pointer-events-none" />
          <p className="text-2xl md:text-3xl text-(--text-secondary) font-inter leading-relaxed drop-shadow-sm relative z-10">{back}</p>
        </div>
      </motion.div>
    </div>
  );
}
