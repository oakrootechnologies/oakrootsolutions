'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Slide4_Team() {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-4 lg:p-16 bg-white">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        {/* Left Side - Text */}
        <div className="flex-1 text-black px-4 lg:px-0">
          <h2 className="text-3xl lg:text-7xl font-bold uppercase mb-4 lg:mb-6">
            Join Us
          </h2>
          <p className="text-base lg:text-2xl text-neutral-700 mb-4 lg:mb-8 leading-relaxed">
            We&apos;re always looking for talented individuals who share our passion 
            for innovation and excellence. Join a team that values creativity, 
            collaboration, and continuous growth.
          </p>
          <p className="text-sm lg:text-lg text-neutral-600 mb-6 lg:mb-8">
            Together, we&apos;re building a future that honors the past while 
            embracing the possibilities of tomorrow.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-black text-white font-semibold rounded-full py-3 px-6 lg:py-4 lg:px-8 hover:bg-neutral-800 transition-colors text-sm lg:text-lg"
          >
            View Careers
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 aspect-[4/5] relative overflow-hidden rounded-lg w-full lg:w-auto">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=1000&fit=crop"
            alt="Join Our Team"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}


