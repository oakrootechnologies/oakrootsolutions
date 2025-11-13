'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ForegroundOverlay from './ForegroundOverlay';
import BackgroundReveal from './BackgroundReveal';

export default function CinematicScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="h-[1200vh] relative bg-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Layer 1 (Bottom): BackgroundReveal */}
        <BackgroundReveal masterProgress={scrollYProgress} />

        {/* Layer 2 (Top): ForegroundOverlay */}
        <ForegroundOverlay masterProgress={scrollYProgress} />
      </div>
    </section>
  );
}




