'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { Group } from 'three';

interface RotatingRingProps {
  imageUrls: string[];
  radius: number;
  imageScale: [number, number];
  rotationSpeed: number;
}

export default function RotatingRing({ 
  imageUrls, 
  radius, 
  imageScale, 
  rotationSpeed 
}: RotatingRingProps) {
  const groupRef = useRef<Group>(null);

  // Overall ring rotation - ONLY rotates the entire group
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Only rotate the entire ring uniformly around Y-axis
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const count = imageUrls.length;

  return (
    <group ref={groupRef}>
      {imageUrls.map((url, index) => {
        // Angle calculation for circular positioning - full 360 degrees
        const angle = index * ((Math.PI * 2) / count);
        
        // Position calculation - circular arrangement with increased radius for spacing
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Dynamic Y offset for subtle 'bowl' effect
        // Creates a gentle wave where images at sides are slightly higher
        const y = Math.sin(angle * 2) * 0.8;
        
        return (
          <group key={`${url}-${index}`} position={[x, y, z]}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              url={url}
              rotation={[0, angle, 0]} // Tangential facing - faces viewer
              scale={imageScale}
            />
          </group>
        );
      })}
    </group>
  );
}

