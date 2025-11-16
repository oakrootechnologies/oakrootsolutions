'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ProjectImagePlane from './ProjectImagePlane';
import CategoryLabel from './CategoryLabel';
import CameraController from './CameraController';

interface Project {
  id: string;
  title: string;
  category: string;
  mainImageUrl: string;
  ringImageUrl: string;
  externalUrl?: string;
  isFeatured?: boolean;
}

interface Category {
  name: string;
  count: number;
  position: [number, number, number];
}

interface ProjectRingCanvasProps {
  setHoveredProject?: (project: Project | null) => void;
  radius?: number;
  imageScale?: [number, number];
  centered?: boolean; // If true, center the canvas; if false, allow left shift for homepage
}

// Featured projects with live URLs
const featuredProjects: Project[] = [
  {
    id: 'restworld',
    title: 'Restworld',
    category: 'E-commerce',
    isFeatured: true,
    mainImageUrl: 'https://picsum.photos/seed/restworld/800/600',
    ringImageUrl: 'https://picsum.photos/seed/restworld-ring/800/400',
    externalUrl: 'https://restworld.in/',
  },
  {
    id: 'wittywealth',
    title: 'Witty Wealth',
    category: 'Fintech',
    isFeatured: true,
    mainImageUrl: 'https://picsum.photos/seed/wittywealth/800/600',
    ringImageUrl: 'https://picsum.photos/seed/wittywealth-ring/800/400',
    externalUrl: 'https://wittywealth.org/',
  },
  {
    id: 'ideaascend',
    title: 'Idea Ascend',
    category: 'Startup Platform',
    isFeatured: true,
    mainImageUrl: 'https://picsum.photos/seed/ideaascend/800/600',
    ringImageUrl: 'https://picsum.photos/seed/ideaascend-ring/800/400',
    externalUrl: 'https://ideaascend.in/',
  },
  {
    id: 'oksingreen',
    title: 'Oksingreen',
    category: 'Horticulture',
    isFeatured: true,
    mainImageUrl: 'https://picsum.photos/seed/oksingreen/800/600',
    ringImageUrl: 'https://picsum.photos/seed/oksingreen-ring/800/400',
    externalUrl: 'https://oksingreen.com/',
  },
];

// Generate additional mock project data to fill the ring (19 more items to total 23)
const generateAdditionalProjects = (): Project[] => {
  const categories = ['Architecture', 'Interior', 'Landscape', 'Urban', 'Residential', 'Commercial'];
  const projects: Project[] = [];
  
  for (let i = 0; i < 19; i++) {
    const category = categories[i % categories.length];
    projects.push({
      id: `project-${i}`,
      title: `${category} Project ${i + 1}`,
      category,
      mainImageUrl: `https://picsum.photos/seed/project-${i}/800/600`,
      ringImageUrl: `https://picsum.photos/seed/ring-${i}/800/400`, // Horizontal rectangular images
    });
  }
  
  return projects;
};

// Combine featured and additional projects
const generateMockProjects = (): Project[] => {
  return [...featuredProjects, ...generateAdditionalProjects()];
};

// Mock category data with 3D positions
const categories: Category[] = [
  { name: 'Architecture', count: 35, position: [0, 8, -15] },
  { name: 'Interior', count: 32, position: [-12, 6, -10] },
  { name: 'Landscape', count: 28, position: [12, 4, -10] },
  { name: 'Urban', count: 25, position: [-15, 2, 8] },
  { name: 'Residential', count: 40, position: [15, 0, 8] },
  { name: 'Commercial', count: 30, position: [0, -2, 12] },
];

export default function ProjectRingCanvas({ setHoveredProject, radius = 15, imageScale = [4, 2], centered = false }: ProjectRingCanvasProps) {
  const projects = generateMockProjects();

  const containerStyle = centered 
    ? { width: '100%', height: '100%' }
    : { width: '200%', left: '-75%', overflow: 'visible' };

  return (
    <div className="absolute inset-0 h-full" style={containerStyle}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 70, position: [0, 30, 0] }}
        style={{ width: '100%', height: '100%' }}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
        }}
      >
        <ambientLight intensity={3} />
        
        <CameraController />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />

        {/* Map over projects to create the ring */}
        {projects.map((project, index) => (
          <ProjectImagePlane
            key={project.id}
            project={project}
            index={index}
            count={projects.length}
            setHoveredProject={setHoveredProject}
            radius={radius}
            imageScale={imageScale}
          />
        ))}

        {/* Map over categories to create labels */}
        {categories.map((category, index) => (
          <CategoryLabel
            key={`${category.name}-${index}`}
            category={category}
          />
        ))}
      </Canvas>
    </div>
  );
}
