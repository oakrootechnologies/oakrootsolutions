'use client';

import { Image } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ImagePlaneProps {
  index: number;
  count: number;
  radius: number;
  url: string;
  yOffset: number;
}

export default function ImagePlane({
  index,
  count,
  radius,
  url,
  yOffset,
}: ImagePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Calculate circular position (full 360-degree circle)
  const angle = (index / count) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  // Tangent rotation - makes images tangent to the circle (geostationary fix)
  // The rotation is -angle to orient the plane along the circular path
  const rotation: [number, number, number] = [0, -angle, 0];

  // Make material double-sided
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.side = THREE.DoubleSide;
      }
    }
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      ref={meshRef}
      url={url}
      position={[x, yOffset, z]}
      rotation={rotation}
      scale={[4, 3]} // Wider than tall
    />
  );
}
