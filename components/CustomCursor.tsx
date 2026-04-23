'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Motion values for high performance (no re-renders on every mouse move)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configurations for smooth trailing effect
  const springConfig = { stiffness: 400, damping: 30 };
  const trailConfig = { stiffness: 150, damping: 20 };

  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);
  
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if it's a touch device - don't show custom cursor on mobile
    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('data-cursor') === 'hover';
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    // Handle initial state if mouse is already in window
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Dot - follows cursor with slight spring */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isClicked ? 0.8 : 1,
        }}
      />

      {/* Trailing Circle - broad interaction point */}
      <motion.div
        className="fixed w-8 h-8 border border-white rounded-full pointer-events-none z-[9999]"
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovered ? 2.5 : isClicked ? 0.6 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          borderWidth: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
        }}
      />
    </>
  );
}
