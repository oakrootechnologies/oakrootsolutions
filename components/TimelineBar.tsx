'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TimelineBarProps {
  sliderProgress: MotionValue<number>;
}

const years = ['2015', '2020', '2023', 'Today'];

export default function TimelineBar({ sliderProgress }: TimelineBarProps) {
  const [currentYear, setCurrentYear] = useState(years[0]);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Calculate position for the orange-red indicator (0 to 100%)
  const indicatorPosition = useTransform(sliderProgress, [0, 1], ['0%', '100%']);

  // Update current year and progress based on slider
  useEffect(() => {
    const unsubscribe = sliderProgress.on('change', (latest) => {
      setCurrentProgress(latest);
      const index = Math.min(Math.floor(latest * 4), 3);
      setCurrentYear(years[index]);
    });
    return () => unsubscribe();
  }, [sliderProgress]);

  // Generate 19 vertical lines with gradient effect
  const lineCount = 19;
  const lines = Array.from({ length: lineCount }, (_, i) => i);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 pb-8 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Year Display */}
        <motion.div
          className="text-center mb-6"
          key={currentYear}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-6xl lg:text-8xl font-bold text-black">
            {currentYear}
          </div>
        </motion.div>

        {/* Timeline Lines Container */}
        <div className="relative h-16 flex items-end justify-between">
          {/* Vertical Lines with Gradient */}
          {lines.map((index) => {
            // Calculate distance from center (0 = center, 9 = edge)
            const distanceFromCenter = Math.abs(index - (lineCount - 1) / 2);
            const maxDistance = (lineCount - 1) / 2;
            
            // Gradient: lighter on edges, darker in center
            const opacity = 1 - (distanceFromCenter / maxDistance) * 0.7;
            
            // Determine if this line should be orange-red based on slider progress
            const linePosition = (index / (lineCount - 1)) * 100;
            const currentPosition = currentProgress * 100;
            const isActive = Math.abs(linePosition - currentPosition) < 3;

            return (
              <div
                key={index}
                className="w-[1px] h-12 relative"
                style={{
                  backgroundColor: isActive 
                    ? '#ff4500' 
                    : `rgba(0, 0, 0, ${Math.max(0.1, opacity)})`,
                }}
              />
            );
          })}

          {/* Orange-Red Indicator Line */}
          <motion.div
            className="absolute bottom-0 w-[2px] h-12 bg-orange-500"
            style={{
              left: indicatorPosition,
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

