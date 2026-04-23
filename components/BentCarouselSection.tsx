'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, ScrollControls, useScroll } from '@react-three/drei';
// @ts-ignore - maath may not have types
import { easing } from 'maath';
import '@/utils/bentCarouselUtil';


interface CardData {
  id: string;
  url: string;
  title?: string;
}

interface BentCarouselSectionProps {
  cards?: CardData[];
  className?: string;
}

// Default cards data
const defaultCards: CardData[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    title: 'Project 1',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    title: 'Project 2',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    title: 'Project 3',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
    title: 'Project 4',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    title: 'Project 5',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    title: 'Project 6',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    title: 'Project 7',
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    title: 'Project 8',
  },
];

function Rig(props: { rotation?: [number, number, number]; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    // @ts-ignore - events.update may not be in types
    if (state.events && typeof state.events.update === 'function') {
      state.events.update(); // Raycasts every frame rather than on pointer-move
    }
    const easingObj = easing as any;
    if (easingObj?.damp3) {
      easingObj.damp3(
        state.camera.position,
        [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
        0.3,
        delta
      ); // Move camera
    }
    state.camera.lookAt(0, 0, 0); // Look at center
  });

  return <group ref={ref} {...props} />;
}

function Carousel({
  radius = 1.4,
  count = 8,
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

export default function BentCarouselSection({
  cards = defaultCards,
  className = '',
}: BentCarouselSectionProps) {
  return (
    <section className={`w-full h-screen relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel radius={1.4} count={8} cards={cards} />
          </Rig>
        </ScrollControls>
        <Environment preset="dawn" background blur={0.5} />
      </Canvas>
    </section>
  );
}
