'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EyesFollowProps {
  className?: string;
}

export const EyesFollow = ({ className = '' }: EyesFollowProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasReadText, setHasReadText] = useState(false);
  const [hoveredWordIndices, setHoveredWordIndices] = useState<Set<number>>(new Set());
  const readingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Text to display - split into words for individual hover effects
  // Split into 2 lines: "Keep a eye at oakroot Solutions" and "latest blogs"
  const line1Words = "Keep a eye at oakroot Solutions".split(' ');
  const line2Words = "latest blogs".split(' ');
  const allWords = [...line1Words, ...line2Words];

  // Track when user hovers over words
  const handleWordHover = (index: number) => {
    setHoveredWordIndices((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  // Show popup after all words have been unblurred (hovered) and reading time has passed
  useEffect(() => {
    if (hoveredWordIndices.size === allWords.length && !hasReadText && !showPopup) {
      // Clear any existing timer
      if (readingTimerRef.current) {
        clearTimeout(readingTimerRef.current);
      }

      // Wait a moment after all words are unblurred, then show popup
      // This gives user time to read the fully unblurred text
      const readingTime = 2000; // 2 seconds after all words are unblurred
      
      readingTimerRef.current = setTimeout(() => {
        setHasReadText(true);
        setShowPopup(true);
      }, readingTime);
    }

    return () => {
      if (readingTimerRef.current) {
        clearTimeout(readingTimerRef.current);
      }
    };
  }, [hoveredWordIndices.size, allWords.length, hasReadText, showPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`w-full h-full min-h-[400px] bg-black flex flex-col items-center justify-center gap-8 relative ${className}`}>
      {/* Eyes */}
      <div className="flex items-center justify-center gap-4 z-10">
        <Eye />
        <Eye />
      </div>

      {/* Text behind eyes - positioned at top and bottom */}
      <div className="absolute inset-0 z-0">
        {/* Top Text */}
        <div className="absolute top-8 lg:top-16 left-0 right-0 flex flex-wrap items-center justify-center gap-3 lg:gap-4 px-4 lg:px-8">
          {line1Words.map((word, index) => (
            <HoverableWord
              key={`top-${index}`}
              word={word}
              index={index}
              onHover={() => handleWordHover(index)}
            />
          ))}
        </div>
        
        {/* Bottom Text */}
        <div className="absolute bottom-8 lg:bottom-16 left-0 right-0 flex flex-wrap items-center justify-center gap-3 lg:gap-4 px-4 lg:px-8">
          {line2Words.map((word, index) => (
            <HoverableWord
              key={`bottom-${index}`}
              word={word}
              index={line1Words.length + index}
              onHover={() => handleWordHover(line1Words.length + index)}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Popup */}
      <AnimatePresence>
        {showPopup && (
          <NewsletterPopup onClose={handleClosePopup} />
        )}
      </AnimatePresence>
    </div>
  );
};

interface HoverableWordProps {
  word: string;
  index: number;
  onHover: () => void;
}

const HoverableWord = ({ word, index, onHover }: HoverableWordProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnblurred, setIsUnblurred] = useState(false);

  return (
    <motion.span
      className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold cursor-pointer inline-block"
      onMouseEnter={() => {
        setIsHovered(true);
        if (!isUnblurred) {
          setIsUnblurred(true);
          onHover();
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        filter: isUnblurred ? 'blur(0px)' : 'blur(3px)',
        opacity: isUnblurred ? 1 : 0.9,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        textShadow: isUnblurred ? 'none' : '0 0 8px rgba(255, 255, 255, 0.3)',
      }}
    >
      {word}
    </motion.span>
  );
};

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup = ({ onClose }: NewsletterPopupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-2xl p-6 max-w-md w-[90%] border border-gray-200"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-black">Subscribe to Newsletter</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        Stay updated with Oakroot Solutions&apos; latest blogs and insights.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle newsletter subscription here
          const formData = new FormData(e.currentTarget);
          const email = formData.get('email');
          console.log('Subscribe:', email);
          // Add your newsletter subscription logic here
          onClose();
        }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  );
};

const Eye = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      // 1. Get the center position of the Eye element
      const { left, top, width, height } = eyeRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // 2. Calculate vector from Eye center to Mouse
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // 3. Calculate the angle
      const angle = Math.atan2(dy, dx);

      // 4. Calculate distance, but clamp it so the pupil stays inside
      // The pupil can move up to 20px from the center
      const maxDistance = 20;
      const distance = Math.min(maxDistance, Math.hypot(dx, dy));

      // 5. Convert polar coordinates back to Cartesian (x, y)
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      setPosition({ x: pupilX, y: pupilY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // The Sclera (White part)
    <div
      ref={eyeRef}
      className="w-24 h-32 bg-white rounded-full flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
    >
      {/* The Pupil (Black part) */}
      <motion.div
        className="w-10 h-12 bg-black rounded-full"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </div>
  );
};

export default EyesFollow;
