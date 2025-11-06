'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Spring animations for the trailing circle
  const springX = useMotionValue(0);
  const springY = useMotionValue(0);
  
  const smoothX = useSpring(springX, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(springY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Update instant mouse position
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update spring values for trailing circle
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [springX, springY, isVisible]);

  // Don't render on mobile/touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Dot - follows cursor instantly */}
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference' }}
        animate={{
          left: `${mousePosition.x - 4}px`, // Center the 8px (w-2) dot
          top: `${mousePosition.y - 4}px`,
        }}
        transition={{
          type: 'tween',
          duration: 0,
        }}
      />

      {/* Trailing Circle - follows with spring lag */}
      <motion.div
        className="fixed w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[9999]"
        style={{
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}

