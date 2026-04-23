'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment } from '@react-three/drei';
// @ts-ignore - maath may not have types
import { easing } from 'maath';
import '@/utils/bentCarouselUtil';

interface CardData {
  id: string;
  url: string;
  title?: string;
}

interface BentCarouselHeroProps {
  cards?: CardData[];
  className?: string;
}

// Default cards data - using service images
const defaultCards: CardData[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    title: 'App Development',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    title: 'Graphic Design',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
    title: 'Video & Photo',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    title: 'Marketing Strategy',
  },
];

function Rig(props: { rotation?: [number, number, number]; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const rotationSpeed = 0.002; // Slower auto-rotation

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Auto-rotate
    if (autoRotate) {
      ref.current.rotation.y += rotationSpeed;
    }
    
    // Mouse interaction - rotate based on pointer position
    const easingObj = easing as any;
    if (easingObj?.damp3) {
      easingObj.damp3(
        state.camera.position,
        [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
        0.3,
        delta
      );
    }
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group 
      ref={ref} 
      {...props}
      onPointerEnter={() => setAutoRotate(false)}
      onPointerLeave={() => setAutoRotate(true)}
    />
  );
}

function Carousel({
  radius = 1.4,
  count = 4,
  cards,
}: {
  radius?: number;
  count?: number;
  cards: CardData[];
}) {
  const actualCount = Math.min(count, cards.length);
  
  return (
    <>
      {Array.from({ length: actualCount }, (_, i) => (
        <Card
          key={cards[i % cards.length].id}
          url={cards[i % cards.length].url}
          position={[
            Math.sin((i / actualCount) * Math.PI * 2) * radius,
            0,
            Math.cos((i / actualCount) * Math.PI * 2) * radius,
          ]}
          rotation={[0, Math.PI + (i / actualCount) * Math.PI * 2, 0]}
        />
      ))}
    </>
  );
}

function Card({
  url,
  ...props
}: {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: any) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const easingObj = easing as any;
    if (easingObj?.damp3) {
      easingObj.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    }
    if (ref.current.material && 'radius' in ref.current.material && easingObj?.damp) {
      easingObj.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
    }
    if (ref.current.material && 'zoom' in ref.current.material && easingObj?.damp) {
      easingObj.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
    }
  });

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

export default function BentCarouselHero({
  cards = defaultCards,
  className = '',
}: BentCarouselHeroProps) {
  return (
    <div className={`w-full h-[400px] sm:h-[500px] lg:h-[800px] relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <Rig rotation={[0, 0, 0.15]}>
          <Carousel radius={1.4} count={4} cards={cards} />
        </Rig>
        <Environment preset="dawn" background={false} blur={0.5} />
      </Canvas>
    </div>
  );
}

