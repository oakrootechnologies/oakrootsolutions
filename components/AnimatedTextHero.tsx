'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import OptimizedVideo from './OptimizedVideo';

export default function AnimatedTextHero() {
  const [mounted, setMounted] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const hasLockedScroll = useRef(false);

  useEffect(() => {
    setMounted(true);
    
    // Only lock scroll once when the component initially mounts
    if (!hasLockedScroll.current && typeof window !== 'undefined') {
      // Force scroll to top immediately
      window.scrollTo(0, 0);
      
      hasLockedScroll.current = true;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // If Lenis is ready, stop it
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      } else {
        // Fallback: keep checking for Lenis until it's injected
        const checkLenis = setInterval(() => {
          if ((window as any).lenis) {
            (window as any).lenis.stop();
            clearInterval(checkLenis);
          }
        }, 100);
        setTimeout(() => clearInterval(checkLenis), 2000); // Stop checking after 2s
      }
    }

    // Cleanup: Ensure scroll is unlocked if the component unmounts unexpectedly
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, []);

  const handleVideoEnded = () => {
    setIsVideoFinished(true);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if ((window as any).lenis) {
      (window as any).lenis.start();
    }
  };

  return (
    <section className="w-full min-h-screen relative flex flex-col justify-center items-center bg-white px-4 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 overflow-x-hidden">
      {/* Video Container */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl">
        {/* Video Player - Large size with margin - Using OptimizedVideo */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="w-[95%] max-w-7xl"
          >
            <OptimizedVideo
              src="/videos/hero-video.mp4"
              poster="/videos/hero-video-poster.jpg"
              type="video/mp4"
              autoplay={true}
              muted={true}
              loop={false}   // Prevent looping so onEnded fires
              playsInline
              controls={false}
              preload="auto"
              lazy={false}
              onEnded={handleVideoEnded}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
