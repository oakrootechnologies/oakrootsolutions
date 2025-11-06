'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ImageRing from './ImageRing';

// Mock image arrays - at least 20 images each for a full circle
const topImages = [
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1487958449943-2429e8d86256?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
];

const bottomImages = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1474071432113-67ed0c1aab0f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1495379538476-47e61b6a5c09?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504610926078-a1611febcad3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop',
];

export default function HomeProjectRingCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 60, position: [0, 0, 25] }}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={3} />

        {/* Auto-Rotation Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />

        {/* Top Ring Layer */}
        <ImageRing
          imageUrls={topImages}
          radius={10}
          yOffset={2.5}
        />

        {/* Bottom Ring Layer */}
        <ImageRing
          imageUrls={bottomImages}
          radius={10}
          yOffset={-2.5}
        />
      </Canvas>
    </div>
  );
}







