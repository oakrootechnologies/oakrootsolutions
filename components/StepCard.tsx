'use client';

import { useState } from 'react';
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
  serviceIndex?: number;
}

export default function StepCard({ step, stepIndex, isActive, serviceIndex = 0 }: StepCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Priority loading: first service's first step, or first step of any service
  const isPriority = (serviceIndex === 0 && stepIndex === 0);
  
  // Lazy load: only load images that are not priority
  const loading: 'lazy' | 'eager' = isPriority ? 'eager' : 'lazy';

  return (
    <motion.div
      className="min-h-[50vh] flex flex-col justify-center gap-4 lg:gap-6"
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
          className="w-full aspect-video relative overflow-hidden rounded-lg mb-2 lg:mb-4 bg-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            delay: stepIndex * 0.1 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}
          
          <Image
            src={step.imageUrl}
            alt={step.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
            loading={loading}
            priority={isPriority}
            onLoad={() => setImageLoaded(true)}
            unoptimized={step.imageUrl.includes('unsplash.com')}
            quality={85}
          />
        </motion.div>
      )}

      {/* Content */}
      <div>
        <motion.h3
          className="text-xl lg:text-3xl font-bold mb-2 lg:mb-4 text-black"
          animate={{
            color: isActive ? '#000000' : '#737373',
          }}
          transition={{ duration: 0.3 }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="text-sm lg:text-lg text-neutral-600 leading-relaxed max-w-2xl"
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

