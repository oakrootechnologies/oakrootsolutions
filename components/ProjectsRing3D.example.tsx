/**
 * Example usage of ProjectsRing3D component
 * 
 * This file demonstrates how to use the ProjectsRing3D component
 * with sample project data.
 */

import ProjectsRing3D from './ProjectsRing3D';

// Example project images data
const exampleProjects = [
  {
    src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    alt: 'Modern architecture project',
    link: '/projects/project-1',
    title: 'Modern Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    alt: 'Interior design project',
    link: '/projects/project-2',
    title: 'Interior Design',
  },
  {
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    alt: 'Urban planning project',
    link: '/projects/project-3',
    title: 'Urban Planning',
  },
  {
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
    alt: 'Landscape architecture project',
    link: '/projects/project-4',
    title: 'Landscape Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    alt: 'Commercial building project',
    link: '/projects/project-5',
    title: 'Commercial Building',
  },
  {
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    alt: 'Residential complex project',
    link: '/projects/project-6',
    title: 'Residential Complex',
  },
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    alt: 'Sustainable design project',
    link: '/projects/project-7',
    title: 'Sustainable Design',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    alt: 'Cultural center project',
    link: '/projects/project-8',
    title: 'Cultural Center',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    alt: 'Mixed-use development project',
    link: '/projects/project-9',
    title: 'Mixed-Use Development',
  },
  {
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8d86256?w=800&h=600&fit=crop',
    alt: 'Hospitality design project',
    link: '/projects/project-10',
    title: 'Hospitality Design',
  },
  {
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    alt: 'Educational facility project',
    link: '/projects/project-11',
    title: 'Educational Facility',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    alt: 'Retail space project',
    link: '/projects/project-12',
    title: 'Retail Space',
  },
];

export default function ProjectsRing3DExample() {
  return (
    <ProjectsRing3D
      images={exampleProjects}
      autoRotateSpeedDegPerSec={8}
      initialRotation={0}
    />
  );
}

