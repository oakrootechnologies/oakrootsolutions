'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Slide1_HeroText from './Slide1_HeroText';
import Slide2_Images from './Slide2_Images';
import Slide3_Values from './Slide3_Values';
import Slide4_Team from './Slide4_Team';

export default function HorizontalStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal movement
  // Moving content 3 full screen widths to the left (400% total width)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-300%']);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Horizontal Track */}
        <motion.div
          className="flex w-[400%] h-full"
          style={{ x }}
        >
          {/* Slide 1: Hero Text */}
          <Slide1_HeroText />

          {/* Slide 2: Images */}
          <Slide2_Images />

          {/* Slide 3: Values */}
          <Slide3_Values />

          {/* Slide 4: Team */}
          <Slide4_Team />
        </motion.div>
      </div>
    </section>
  );
}

