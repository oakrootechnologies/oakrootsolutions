'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BackgroundCardProps {
  isActive: boolean;
  position: 'left' | 'right';
  imageUrl: string;
  number: string;
  title: string;
  description: string;
}

export default function BackgroundCard({
  isActive,
  position,
  imageUrl,
  number,
  title,
  description,
}: BackgroundCardProps) {
  return (
    <motion.div
      className="w-[45%] rounded-3xl overflow-hidden aspect-square relative"
      animate={{ opacity: isActive ? 1 : 0.4 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="50vw"
        unoptimized={imageUrl.includes('unsplash.com')}
      />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {/* Text Overlay */}
      <div className="absolute bottom-8 left-8 text-white z-10">
        <span className="text-sm text-neutral-300 mb-2 block">{number}</span>
        <h2 className="text-5xl font-bold mb-3 drop-shadow-lg">{title}</h2>
        <p className="text-base text-neutral-200 max-w-md drop-shadow-md">{description}</p>
      </div>
    </motion.div>
  );
}
