'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface ScrollProgressLineProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollProgressLine({ scrollYProgress }: ScrollProgressLineProps) {
  const dotPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="w-[1px] h-screen bg-neutral-200 relative">
      {/* Animated Fill Line */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-black origin-top"
        style={{
          scaleY: scrollYProgress,
          height: '100%',
        }}
      />
      
      {/* Progress Dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full -translate-y-1/2"
        style={{
          top: dotPosition,
        }}
      />
    </div>
  );
}

