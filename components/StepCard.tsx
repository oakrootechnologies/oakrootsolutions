'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface StepCardProps {
  step: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  stepIndex: number;
  isActive: boolean;
}

export default function StepCard({ step, stepIndex, isActive }: StepCardProps) {
  return (
    <motion.div
      className="min-h-[50vh] flex flex-col justify-center gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: stepIndex * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Image */}
      {step.imageUrl && (
        <motion.div
          className="w-full aspect-video relative overflow-hidden rounded-lg mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            delay: stepIndex * 0.1 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={step.imageUrl}
            alt={step.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            unoptimized={step.imageUrl.includes('unsplash.com')}
          />
        </motion.div>
      )}

      {/* Content */}
      <div>
        <motion.h3
          className="text-2xl lg:text-3xl font-bold mb-4 text-black"
          animate={{
            color: isActive ? '#000000' : '#737373',
          }}
          transition={{ duration: 0.3 }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="text-base lg:text-lg text-neutral-600 leading-relaxed max-w-2xl"
          animate={{
            opacity: isActive ? 1 : 0.6,
          }}
          transition={{ duration: 0.3 }}
        >
          {step.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

