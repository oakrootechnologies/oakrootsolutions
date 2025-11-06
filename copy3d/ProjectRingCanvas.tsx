'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingRing from './RotatingRing';

export default function ProjectRingCanvas() {
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isDevelopment] = useState(process.env.NODE_ENV === 'development');

  // Mock data - single array with 24 diverse images for smooth visual curve
  const projectImageUrls = Array.from({ length: 24 }, (_, i) => 
    `https://picsum.photos/800/600?random=${i + 1}`
  );

  useEffect(() => {
    setMounted(true);
    
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-400">Loading 3D scene...</div>
      </div>
    );
  }

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-center">
          WebGL is not supported in your browser.
          <br />
          Please use a modern browser to view the 3D scene.
        </div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{
        fov: 60,
        position: [0, 0, 15], // Centered view for single ring
      }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]} // Crisp images
      onError={(error) => {
        console.error('Canvas error:', error);
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={2.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      
      {/* Optional OrbitControls for development */}
      {isDevelopment && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={5}
          maxDistance={25}
        />
      )}
      
      {/* Single rotating ring - full 360 degrees */}
      <RotatingRing
        imageUrls={projectImageUrls}
        radius={14} // Increased radius for better spacing and no overlap
        imageScale={[3.8, 2.8]} // Slightly smaller scale to prevent overlap
        rotationSpeed={0.08}
      />
    </Canvas>
  );
}
