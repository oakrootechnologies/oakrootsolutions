'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import StepCard from './StepCard';
import ScrollProgressLine from './ScrollProgressLine';

interface Step {
  title: string;
  description: string;
  imageUrl?: string;
}

interface Phase {
  id: string;
  title: string;
  steps: Step[];
}

interface PhaseSectionProps {
  phase: Phase;
  isActive: boolean;
  index: number;
}

export default function PhaseSection({ phase, isActive, index }: PhaseSectionProps) {
  const phaseRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: phaseRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={phaseRef} className="flex flex-col lg:flex-row w-full min-h-screen relative">
      {/* Middle Column - Sticky Phase Title */}
      <div className="w-full lg:w-1/3 h-auto lg:h-screen lg:sticky top-0 flex items-start lg:items-center px-4 lg:px-12 pt-6 pb-4 lg:py-0 z-20">
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
          {phase.title}
        </motion.h3>
      </div>

      {/* Scroll Progress Line Container - Sticky (hidden on mobile) */}
      <div className="hidden lg:flex h-screen sticky top-0 items-center z-10 px-4">
        <ScrollProgressLine scrollYProgress={scrollYProgress} />
      </div>

      {/* Right Column - Scrolling Steps */}
      <div className="flex-1 py-6 lg:py-32 flex flex-col gap-8 lg:gap-32 px-4 lg:px-16">
        {phase.steps.map((step, stepIndex) => (
          <StepCard
            key={`${phase.id}-${stepIndex}`}
            step={step}
            stepIndex={stepIndex}
            isActive={isActive}
          />
        ))}
      </div>
    </div>
  );
}

