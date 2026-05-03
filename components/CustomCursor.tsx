'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Motion values for the trailing ring — no re-renders on every mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Slow, lazy spring for the trailing ring
  const trailConfig = { stiffness: 150, damping: 20 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't show on touch devices
    const isTouchDevice =
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ── SmoothCursor: the solid black directional arrow (MagicUI) ───── */}
      <SmoothCursor />

      {/* ── Trailing Ring: the large circle that lags behind ─────────────── */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
          border: '1.5px solid rgba(0,0,0,0.5)',
        }}
        animate={{
          scale: isHovered ? 2.5 : isClicked ? 0.6 : 1,
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
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
