'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const heroTextLine1 = 'We are Oakroot Solutions,';
const heroTextLine2 = 'The Best for Your Business';

// Mobile version (4 lines)
const heroTextMobile1 = 'We are Oakroot';
const heroTextMobile2 = 'Solutions,';
const heroTextMobile3 = 'The Best for Your';
const heroTextMobile4 = 'Business';

export default function AnimatedTextHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if at least 60% of the video is visible
          const visibleRatio = entry.intersectionRatio;
          if (visibleRatio >= 0.6) {
            setIsVideoVisible(true);
            if (video.paused) {
              video.play().catch((error) => {
                // Handle autoplay restrictions
                console.log('Video autoplay failed:', error);
              });
            }
          } else {
            setIsVideoVisible(false);
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: [0, 0.3, 0.6, 0.9, 1.0], // Multiple thresholds for smoother transitions
        rootMargin: '0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [mounted]);
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
          <h1 className="hidden md:block text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center text-black leading-tight">
            <div className="flex flex-col items-center gap-2">
              <div className="whitespace-nowrap">{heroTextLine1}</div>
              <div className="whitespace-nowrap">{heroTextLine2}</div>
            </div>
          </h1>

          {/* Mobile Version - 4 lines */}
          <h1 className="md:hidden text-2xl sm:text-3xl font-bold text-center text-black leading-tight">
            <div className="flex flex-col items-center gap-1">
              <div>{heroTextMobile1}</div>
              <div>{heroTextMobile2}</div>
              <div>{heroTextMobile3}</div>
              <div>{heroTextMobile4}</div>
            </div>
          </h1>
        </motion.div>

        {/* Video Player - Large size with margin */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="w-[95%] max-w-7xl mt-8 md:mt-12 lg:mt-16"
          >
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg shadow-2xl"
              loop
              muted
              playsInline
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </div>
    </section>
  );
}
