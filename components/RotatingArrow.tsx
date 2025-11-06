'use client';

import { motion } from 'framer-motion';

interface RotatingArrowProps {
  activeSide: 'left' | 'right';
}

export default function RotatingArrow({ activeSide }: RotatingArrowProps) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[500px] h-[500px] pointer-events-none"
      animate={{
        rotate: activeSide === 'left' ? 0 : 180,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Yellow curved arrow connecting cards */}
        <path
          d="M 20,100 Q 100,50 180,100"
          stroke="#FFD700"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Arrow head pointing to the active side */}
        {activeSide === 'left' ? (
          <polygon
            points="20,100 35,90 35,85 25,85 25,115 35,115 35,110 20,100"
            fill="#FFD700"
          />
        ) : (
          <polygon
            points="180,100 165,90 165,85 175,85 175,115 165,115 165,110 180,100"
            fill="#FFD700"
          />
        )}
      </svg>
    </motion.div>
  );
}

