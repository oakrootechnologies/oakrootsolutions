'use client';

import { motion } from 'framer-motion';

interface MarqueeTrackProps {
  isHovered: boolean;
}

const marqueeContent = [
  'LOOKING AHEAD',
  '+',
  'BUILDING THE FUTURE',
  '+',
  'INNOVATING TODAY',
  '+',
  'CREATING TOMORROW',
  '+',
  'ELEVATING BRANDS',
  '+',
];

export default function MarqueeTrack({ isHovered }: MarqueeTrackProps) {
  // Duplicate content for seamless loop
  const duplicatedContent = [...marqueeContent, ...marqueeContent];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: isHovered ? 60 : 20,
        }}
      >
        {duplicatedContent.map((item, index) => (
          <span
            key={index}
            className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase text-white px-4 lg:px-8"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}




