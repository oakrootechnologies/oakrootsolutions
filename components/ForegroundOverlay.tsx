'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import IntroText from './IntroText';
import HorizontalSlider from './HorizontalSlider';
import TimelineBar from './TimelineBar';

interface ForegroundOverlayProps {
  masterProgress: MotionValue<number>;
}

export default function ForegroundOverlay({ masterProgress }: ForegroundOverlayProps) {
  // Exit animation: slide up and away after horizontal scroll finishes
  const y = useTransform(masterProgress, [0.7, 0.85], ['0%', '-100%']);

  // Calculate horizontal slider progress (0.15 to 0.7 of master progress maps to 0-1)
  const sliderProgress = useTransform(
    masterProgress,
    [0.15, 0.7],
    [0, 1]
  );

  // Control visibility of intro text (show only from 0 to 0.1)
  const introOpacity = useTransform(
    masterProgress,
    [0, 0.05, 0.1],
    [1, 1, 0]
  );

  // Control visibility of slider (show from 0.15 to 0.7)
  const sliderOpacity = useTransform(
    masterProgress,
    [0.1, 0.15, 0.7, 0.75],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 bg-white"
      style={{ y }}
    >
      {/* Intro Text - Fades out quickly (0.0 to 0.1) */}
      <motion.div style={{ opacity: introOpacity }}>
        <IntroText masterProgress={masterProgress} />
      </motion.div>

      {/* Horizontal Slider - Active from 0.15 to 0.7 */}
      <motion.div style={{ opacity: sliderOpacity }}>
        <HorizontalSlider sliderProgress={sliderProgress} />
      </motion.div>

      {/* Timeline Bar - Syncs with Horizontal Slider */}
      <motion.div style={{ opacity: sliderOpacity }}>
        <TimelineBar sliderProgress={sliderProgress} />
      </motion.div>
    </motion.div>
  );
}

