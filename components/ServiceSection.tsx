'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import StepCard from './StepCard';
import ScrollProgressLine from './ScrollProgressLine';

interface Step {
  title: string;
  description: string;
  imageUrl?: string;
}

interface Service {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  steps: Step[];
}

interface ServiceSectionProps {
  service: Service;
  isActive: boolean;
  index: number;
}

export default function ServiceSection({ service, isActive, index }: ServiceSectionProps) {
  const serviceRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: serviceRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={serviceRef} className="flex flex-col lg:flex-row w-full min-h-screen relative">
      {/* Middle Column - Sticky Service Title */}
      <div className="w-full lg:w-1/3 h-auto lg:h-screen lg:sticky top-0 flex items-start lg:items-center px-4 lg:px-12 pt-6 pb-4 lg:py-0 z-20">
        <div className="flex flex-col gap-4">
          <motion.h3
            className="text-2xl lg:text-5xl font-bold uppercase text-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isActive ? 1 : 0.3,
              x: isActive ? 0 : -20,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          >
            {service.title}
          </motion.h3>
          {service.subtitle && (
            <motion.p 
              className="text-sm lg:text-base text-neutral-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
            >
              {service.subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Scroll Progress Line Container - Sticky (hidden on mobile) */}
      <div className="hidden lg:flex h-screen sticky top-0 items-center z-10 px-4">
        <ScrollProgressLine scrollYProgress={scrollYProgress} />
      </div>

      {/* Right Column - Service Image and Scrolling Steps */}
      <div className="flex-1 py-6 lg:py-32 flex flex-col gap-8 lg:gap-32 px-4 lg:px-16">
        {/* Service Image */}
        {service.image && (
          <motion.div
            className="w-full aspect-video relative overflow-hidden rounded-lg mb-4 lg:mb-8 bg-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={85}
              unoptimized={service.image.includes('unsplash.com')}
            />
          </motion.div>
        )}

        {/* Steps */}
        {service.steps.map((step, stepIndex) => (
          <StepCard
            key={`${service.id}-${stepIndex}`}
            step={step}
            stepIndex={stepIndex}
            isActive={isActive}
            serviceIndex={index}
          />
        ))}

        {/* Start a conversation CTA */}
        <motion.div 
          className="mt-8 pt-12 border-t border-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg lg:text-xl font-medium">
            Have a project in mind?{' '}
            <Link 
              href="/contact" 
              className="text-aurora hover:underline font-bold inline-flex items-center gap-2 group"
            >
              Start a conversation 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

