'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { Group } from 'three';

interface CurvedImageSegmentProps {
  index: number;
  totalCount: number;
  imageUrl: string;
}

export default function CurvedImageSegment({ 
  index, 
  totalCount, 
  imageUrl 
}: CurvedImageSegmentProps) {
  const groupRef = useRef<Group>(null);
  const segmentRef = useRef<Group>(null);

  // Segment positioning on the ring
  const ringRadius = 8;
  const segmentAngle = index * ((Math.PI * 2) / totalCount);

  // Calculate central position for this segment
  const centerX = Math.sin(segmentAngle) * ringRadius;
  const centerZ = Math.cos(segmentAngle) * ringRadius;

  // Segment details for curved appearance
  const numSubPlanes = 5;
  const segmentWidth = 2.5;
  const segmentHeight = 3.5;
  const subPlaneWidth = segmentWidth / numSubPlanes;

  // Subtle hover animation (optional)
  useFrame((state) => {
    if (segmentRef.current) {
      // Subtle lift effect using sine wave
      const hoverOffset = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
      segmentRef.current.position.y = hoverOffset;
    }
  });

  return (
    <group 
      ref={groupRef}
      position={[centerX, 0, centerZ]}
      rotation={[0, -segmentAngle, 0]}
    >
      <group ref={segmentRef}>
        {Array.from({ length: numSubPlanes }, (_, i) => {
          // Calculate offset for each sub-plane
          const offsetX = (i - (numSubPlanes - 1) / 2) * subPlaneWidth;
          
          // Calculate rotation for curve effect
          const rotationY = (i - (numSubPlanes - 1) / 2) * (Math.PI / 10);
          
          return (
            <group 
              key={i}
              position={[offsetX, 0, 0]}
              rotation={[0, rotationY, 0]}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                url={imageUrl}
                scale={[subPlaneWidth, segmentHeight]}
                transparent
              />
            </group>
          );
        })}
      </group>
    </group>
  );
}

