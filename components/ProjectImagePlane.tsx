'use client';

import { Image } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Project {
  id: string;
  title: string;
  category: string;
  mainImageUrl: string;
  ringImageUrl: string;
  externalUrl?: string;
  isFeatured?: boolean;
}

interface ProjectImagePlaneProps {
  project: Project;
  index: number;
  count: number;
  setHoveredProject?: (project: Project | null) => void;
  radius?: number;
  imageScale?: [number, number];
}

export default function ProjectImagePlane({
  project,
  index,
  count,
  setHoveredProject,
  radius = 15,
  imageScale = [4, 2],
}: ProjectImagePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Circular positioning (same radius for X and Z)
  const angle = (index / count) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  // Make material double-sided
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.side = THREE.DoubleSide;
      }
    }
  }, []);

  // Make images always face the camera (face-to-face when closest to user)
  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Make the group look at the camera position
      groupRef.current.lookAt(camera.position);
    }
  });

  // Handle click to open external URL
  const handleClick = () => {
    if (project.externalUrl) {
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        ref={meshRef}
        url={project.ringImageUrl}
        scale={imageScale} // Horizontal rectangular: wider than tall
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredProject?.(project);
        }}
        onPointerOut={() => {
          setHoveredProject?.(null);
        }}
        onClick={handleClick}
        style={{ cursor: project.externalUrl ? 'pointer' : 'default' }}
      />
    </group>
  );
}
