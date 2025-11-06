'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = [
  'We are the best website development firm.',
  'We are the best social media managers.',
  'We are the best automaters.',
  'We are Oakroot Solution.The Best for Your Business',
];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [shouldExit, setShouldExit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLocalhost, setIsLocalhost] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on localhost
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.');
      setIsLocalhost(isLocal);
    setMounted(true);
      
      // If localhost, skip the preloader
      if (isLocal) {
        setIsLoading(false);
      }
    }
  }, []);

  // Cycle through text strings every 3 seconds
  // Stop cycling when we reach the last text
  useEffect(() => {
    if (isLocalhost) return; // Skip on localhost
    
    intervalRef.current = setInterval(() => {
      setTextIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= texts.length) {
          // Stop at the last text
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return texts.length - 1;
        }
        return nextIndex;
      });
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLocalhost]);

  // Progress animation - smooth progress from 0% to 100%
  useEffect(() => {
    if (!mounted || isLocalhost) return; // Skip on localhost

    const duration = 12000; // 12 seconds total
    const startTime = Date.now();
    let animationFrameId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted, isLocalhost]);

  // Hide preloader after 12 seconds (4 sentences × 3 seconds each)
  // At 12 seconds, the last text should be showing. Trigger exit animation.
  useEffect(() => {
    if (isLocalhost) return; // Skip on localhost
    
    const timer = setTimeout(() => {
      // Trigger the exit animation for the last text
      setShouldExit(true);
      setProgress(100); // Ensure progress reaches 100%
      // After the upward animation completes (0.8s), hide the preloader
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 12000);

    return () => clearTimeout(timer);
  }, [isLocalhost]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  // Skip preloader on localhost
  if (isLocalhost) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 w-screen h-screen bg-white z-[100] flex flex-col"
        >
          {/* Preloader Header */}
          <header className="w-full flex justify-between items-center p-6 sm:p-8">
            {/* Logo */}
            <div className="font-bold text-lg sm:text-xl md:text-2xl text-black">
              Oakroot
            </div>
            {/* Language */}
            <div className="text-sm sm:text-base md:text-lg text-black">
              En / हिंदी
            </div>
          </header>

          {/* Text Animator Wrapper */}
          <div className="flex-1 flex justify-center items-center px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={
                  shouldExit && textIndex === texts.length - 1
                    ? { opacity: 0, y: -100, transition: { duration: 0.8, ease: 'easeInOut' } }
                    : { opacity: 0, transition: { duration: 0.3 } }
                }
                transition={{ duration: 0.3 }}
                className="bg-black p-4 md:p-6 rounded-lg"
              >
                <h1 className="text-white font-bold text-4xl md:text-6xl text-center whitespace-nowrap sm:whitespace-normal">
                  {texts[textIndex]}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Loading Line with Percentage */}
          <div className="w-full px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="flex items-center gap-4 max-w-screen-lg mx-auto">
              {/* Progress Bar */}
              <div className="flex-1 h-0.5 bg-gray-300 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-black"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              
              {/* Percentage Display */}
              <div className="text-black text-sm sm:text-base font-medium min-w-[4rem] text-right">
                Loading ({progress})
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

