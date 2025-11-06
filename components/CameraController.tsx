'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

export default function CameraController() {
  const { camera } = useThree();
  const startTime = useRef<number | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Set initial camera position (top-down, 90 degrees)
    if (camera) {
      camera.position.set(0, 30, 0);
      camera.lookAt(0, 0, 0);
      startTime.current = Date.now();
      isAnimating.current = true;
    }
  }, [camera]);

  useFrame(() => {
    if (!isAnimating.current || !startTime.current || !camera) return;

    const elapsed = (Date.now() - startTime.current) / 1000; // Convert to seconds
    const duration = 2.5; // Animation duration in seconds

    if (elapsed < duration) {
      // Ease out cubic for smooth cinematic feel
      const progress = elapsed / duration;
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Start position: top-down (Y: 30, looking straight down)
      // End position: angled view at 30-35 degrees (Y: ~8, Z: ~26) - moved back slightly for better visibility
      const startY = 30;
      const endY = 8;
      const startZ = 0;
      const endZ = 26;
      
      const currentY = startY + (endY - startY) * easedProgress;
      const currentZ = startZ + (endZ - startZ) * easedProgress;

      camera.position.set(0, currentY, currentZ);
      camera.lookAt(0, 0, 0);
    } else {
      // Animation complete
      if (camera) {
        camera.position.set(0, 8, 26);
        camera.lookAt(0, 0, 0);
      }
      isAnimating.current = false;
    }
  });

  return null;
}
