'use client';

import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

interface Category {
  name: string;
  count: number;
  position: [number, number, number];
}

interface CategoryLabelProps {
  category: Category;
}

export default function CategoryLabel({ category }: CategoryLabelProps) {
  const groupRef = useRef<Group>(null);

  // Make text always face the camera
  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef} position={category.position}>
      <Text
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {`${category.name} (${category.count})`}
      </Text>
    </group>
  );
}

