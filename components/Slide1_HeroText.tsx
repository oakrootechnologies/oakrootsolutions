'use client';

import Image from 'next/image';

export default function Slide1_HeroText() {
  return (
    <div className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center p-4 lg:p-16 bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=2000&h=2000&fit=crop&q=80"
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
        {/* Light overlay */}
        <div className="absolute inset-0 bg-white/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-[14rem] leading-none font-bold uppercase mb-4 lg:mb-8">
          <span className="text-black">A future that honors</span>
          <br />
          <span className="text-orange-500">the past</span>
        </h1>
      </div>

      {/* Sub-text */}
      <p className="absolute bottom-4 left-4 lg:bottom-16 lg:left-16 max-w-sm text-xs lg:text-sm text-black uppercase tracking-widest z-10">
        Building tomorrow with the wisdom of yesterday
      </p>
    </div>
  );
}


