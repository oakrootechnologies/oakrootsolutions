'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ProjectDetailsOverlay from './ProjectDetailsOverlay';

// Dynamically import the canvas to avoid SSR issues
const ProjectRingCanvas = dynamic(() => import('./ProjectRingCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-lg">Loading 3D scene...</div>
    </div>
  ),
});

interface Project {
  id: string;
  title: string;
  category: string;
  mainImageUrl: string;
  ringImageUrl: string;
}

export default function ProjectRingPage() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  // Make ring 15% bigger for projects page
  const radius = 15 * 1.15; // 17.25
  const imageScale: [number, number] = [4 * 1.15, 2 * 1.15]; // [4.6, 2.3]

  return (
    <section className="w-full h-screen relative bg-white overflow-hidden flex items-center justify-center">
      <div className="w-full h-full relative">
        <ProjectRingCanvas 
          setHoveredProject={setHoveredProject} 
          radius={radius} 
          imageScale={imageScale}
          centered={true}
        />
        <ProjectDetailsOverlay hoveredProject={hoveredProject} />
      </div>
    </section>
  );
}

