'use client';

import { useState } from 'react';
import MarqueeTrack from './MarqueeTrack';

export default function TiltedMarquee() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full py-12 lg:py-24 bg-white overflow-hidden flex justify-center items-center">
      {/* Tilted Wrapper */}
      <div
        className="w-[120%] -rotate-3 bg-neutral-200 py-4 lg:py-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MarqueeTrack isHovered={isHovered} />
      </div>
    </section>
  );
}




