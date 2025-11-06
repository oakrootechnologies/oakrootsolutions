import dynamic from 'next/dynamic';

// Dynamically import Canvas component with SSR disabled to prevent hydration errors
const ProjectRingCanvas = dynamic(() => import('./ProjectRingCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-gray-400">Loading 3D scene...</div>
    </div>
  ),
});

export default function ProjectRingSection() {
  return (
    <section className="w-full h-screen relative bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Text Column */}
        <div className="flex flex-col justify-between p-8 lg:p-16 z-10">
          {/* Top Text */}
          <p className="text-black text-2xl lg:text-3xl font-medium max-w-md">
            •central mission: to design the best social spaces in the world.
          </p>

          {/* Bottom Text */}
          <p className="text-black text-lg max-w-md">
            Combining smart creativity with commercial savvy, we take our clients&apos; challenges and transform them into innovative solutions that elevate spaces and experiences.
          </p>
        </div>

        {/* Canvas Column */}
        <div className="w-full h-full relative">
          <ProjectRingCanvas />
        </div>
      </div>
    </section>
  );
}

