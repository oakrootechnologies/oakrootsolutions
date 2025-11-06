'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface BackgroundRevealProps {
  masterProgress: MotionValue<number>;
}

export default function BackgroundReveal({ masterProgress }: BackgroundRevealProps) {
  // Zoom effect: scale from 1.0 to 1.25 as we scroll from 0.85 to 1.0
  const scale = useTransform(masterProgress, [0.85, 1.0], [1.0, 1.25]);
  
  // Fade in as overlay moves away
  const opacity = useTransform(masterProgress, [0.7, 0.85], [0, 1]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ opacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale }}
        >
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=2000&fit=crop"
            alt="Future Vision"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </motion.div>
        
        {/* Optional dark overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    </div>
  );
}

