'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import CausticsOverlay from './CausticsOverlay';
import CausticsGlassErrorBoundary from './CausticsGlassErrorBoundary';

const CausticsGlassSceneDynamic = dynamic(() => import('./CausticsGlassScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#f0f0f0] flex items-center justify-center">
      <div className="text-center text-gray-600">
        <p className="text-lg mb-2">Loading 3D scene...</p>
        <p className="text-sm">Note: GLB model file required</p>
      </div>
    </div>
  ),
});

interface CausticsGlassSectionProps {
  className?: string;
}

export default function CausticsGlassSection({ className = '' }: CausticsGlassSectionProps) {
  return (
    <section className={`caustics-glass-container relative ${className}`}>
      <CausticsGlassErrorBoundary>
        <Suspense
          fallback={
            <div className="w-full h-screen bg-[#f0f0f0] flex items-center justify-center">
              <div className="text-center text-gray-600">
                <p className="text-lg mb-2">Loading 3D scene...</p>
                <p className="text-sm">Note: Add glass-transformed.glb to public folder</p>
              </div>
            </div>
          }
        >
          <CausticsGlassSceneDynamic />
        </Suspense>
      </CausticsGlassErrorBoundary>
      <CausticsOverlay />
    </section>
  );
}

