'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Initialize Lenis with smooth scroll settings
    const lenis = new Lenis({
      lerp: 0.1, // Controls the 'damping' or 'hot knife' effect (lower = more dampened)
      smoothTouch: true, // Apply smooth scroll on mobile/touch devices
      smoothWheel: true, // Smooth scroll on mouse wheel
    });

    let rafId: number;
    let isRunning = true;

    // Animation loop using requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time); // Update Lenis scroll position on each frame
      if (isRunning) {
        rafId = requestAnimationFrame(raf);
      }
    }

    // Start the animation loop
    rafId = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      isRunning = false;
      // Cancel any pending animation frames
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      // Destroy Lenis instance to prevent memory leaks
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

