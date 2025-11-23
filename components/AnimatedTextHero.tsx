'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import OptimizedVideo from './OptimizedVideo';

const heroTextLine1 = 'We are Oakroot Solutions,';
const heroTextLine2 = 'The Best for Your Business';

// Mobile version (4 lines)
const heroTextMobile1 = 'We are Oakroot';
const heroTextMobile2 = 'Solutions,';
const heroTextMobile3 = 'The Best for Your';
const heroTextMobile4 = 'Business';

export default function AnimatedTextHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="w-full min-h-screen relative flex flex-col justify-center items-center bg-white px-4 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 overflow-x-hidden">
      {/* Text Container */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full px-4 py-8 md:py-12"
        >
          {/* Desktop/Tablet Version - 2 lines */}
          <h2 className="hidden lg:block text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center text-black leading-tight">
            <div className="flex flex-col items-center gap-2">
              <div className="whitespace-nowrap">{heroTextLine1}</div>
              <div className="whitespace-nowrap">{heroTextLine2}</div>
            </div>
          </h2>

          {/* Mobile Version - 4 lines */}
          <h2 className="lg:hidden text-2xl sm:text-3xl font-bold text-center text-black leading-tight">
            <div className="flex flex-col items-center gap-1">
              <div>{heroTextMobile1}</div>
              <div>{heroTextMobile2}</div>
              <div>{heroTextMobile3}</div>
              <div>{heroTextMobile4}</div>
            </div>
          </h2>
        </motion.div>

        {/* Video Player - Large size with margin - Using OptimizedVideo */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="w-[95%] max-w-7xl mt-8 md:mt-12 lg:mt-16"
          >
            <OptimizedVideo
              src="/videos/hero-video.mp4"
              poster="/videos/hero-video-poster.jpg"
              type="video/mp4"
              autoplay
              muted
              loop
              playsInline
              controls={false}
              preload="metadata"
              lazy={false}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
