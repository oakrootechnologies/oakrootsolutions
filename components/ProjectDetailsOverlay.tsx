'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  category: string;
  mainImageUrl: string;
  ringImageUrl: string;
}

interface ProjectDetailsOverlayProps {
  hoveredProject: Project | null;
}

export default function ProjectDetailsOverlay({
  hoveredProject,
}: ProjectDetailsOverlayProps) {
  return (
    <AnimatePresence>
      {hoveredProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="bg-white shadow-2xl p-6 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold text-black mb-4">
              {hoveredProject.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4 capitalize">
              {hoveredProject.category}
            </p>
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={hoveredProject.mainImageUrl}
                alt={hoveredProject.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

