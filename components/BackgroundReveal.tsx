'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import EyesFollow from './EyesFollow';

interface BackgroundRevealProps {
  masterProgress: MotionValue<number>;
}

export default function BackgroundReveal({ masterProgress }: BackgroundRevealProps) {
  // Fade in as overlay moves away
  const opacity = useTransform(masterProgress, [0.7, 0.85], [0, 1]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ opacity }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <EyesFollow />
        </div>
        
        {/* Optional dark overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    </div>
  );
}

