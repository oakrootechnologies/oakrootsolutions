'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface IntroTextProps {
  masterProgress: MotionValue<number>;
}

export default function IntroText({ masterProgress }: IntroTextProps) {
  // Fade out quickly from 0.0 to 0.1
  const opacity = useTransform(masterProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(masterProgress, [0, 0.1], [1, 0.9]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-20"
      style={{ opacity }}
    >
      <motion.h1
        className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold uppercase text-black leading-none text-center px-8"
        style={{ scale }}
      >
        BUILDING THE FUTURE
      </motion.h1>
    </motion.div>
  );
}

