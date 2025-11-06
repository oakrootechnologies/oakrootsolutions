'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import ImagePlane from './ImagePlane';

interface RingProps {
  imageUrls: string[];
  radius: number;
  yOffset: number;
  rotationSpeed: number;
  tiltAngle: number;
}

export default function Ring({ 
  imageUrls, 
  radius, 
  yOffset, 
  rotationSpeed, 
  tiltAngle 
}: RingProps) {
  const groupRef = useRef<Group>(null);

  // Group auto-rotation - ONLY the group rotates, not individual planes
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Only rotate the entire group - planes stay geostationary
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {imageUrls.map((url, index) => (
        <ImagePlane
          key={`${url}-${index}`}
          index={index}
          count={imageUrls.length}
          radius={radius}
          url={url}
          tiltAngle={tiltAngle}
        />
      ))}
    </group>
  );
}
