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
    <section className="w-full h-screen relative bg-white overflow-x-hidden">
      <div className="relative h-full w-full">
        {/* Canvas - Full width and height, allows overflow for ring visibility */}
        <div className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <ProjectRingCanvas />
        </div>

        {/* Text Column - Overlay on top */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8 lg:p-16 pointer-events-none">
          <div className="pointer-events-auto">
            {/* Top Text */}
            <p className="text-black text-3xl lg:text-4xl xl:text-5xl font-medium max-w-md">
              Our central mission: to be the all-in-one partner for elevating brands through technology.
            </p>
          </div>

          <div className="pointer-events-auto">
            {/* Bottom Text */}
            <p className="text-black text-xl lg:text-2xl max-w-md">
              Combining creative strategy with technical expertise, we take our clients&apos; challenges and transform them into conversion-focused solutions that drive real-world growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

