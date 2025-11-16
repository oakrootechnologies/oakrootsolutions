'use client';

import Image from 'next/image';

export default function Slide2_Images() {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 p-4 lg:p-16 bg-white">
      {/* Feature Image 1 */}
      <div className="hidden lg:block w-1/3 aspect-[4/5] relative overflow-hidden rounded-lg">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop"
          alt="Our Story"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Feature Text */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center gap-4 lg:gap-6 text-black px-4 lg:px-0">
        <h2 className="text-3xl lg:text-7xl font-bold uppercase mb-2 lg:mb-4">
          Our Story
        </h2>
        <p className="text-sm lg:text-xl text-neutral-700 leading-relaxed">
          Founded with a vision to bridge innovation and tradition, we&apos;ve built 
          a legacy of excellence that spans decades. Our journey began with a 
          simple belief: that the best solutions honor both the future and the past.
        </p>
        <p className="text-sm lg:text-xl text-neutral-700 leading-relaxed">
          Through years of dedication, we&apos;ve transformed challenges into 
          opportunities, always staying true to our core values of integrity, 
          innovation, and excellence.
        </p>
      </div>

      {/* Feature Image 2 */}
      <div className="hidden lg:block w-1/3 aspect-[4/5] relative overflow-hidden rounded-lg -mt-16">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop"
          alt="Our Journey"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}


