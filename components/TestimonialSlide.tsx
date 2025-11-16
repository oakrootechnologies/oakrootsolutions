'use client';

import Image from 'next/image';

interface Stat {
  value: string;
  description: string;
}

interface Testimonial {
  id: string;
  avatars: string[];
  quote: string;
  author: string;
  stats: Stat[];
}

interface TestimonialSlideProps {
  testimonial: Testimonial;
}

export default function TestimonialSlide({ testimonial }: TestimonialSlideProps) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      {/* Avatar Stack */}
      <div className="flex justify-center items-center">
        {testimonial.avatars.map((avatar, index) => (
          <div
            key={index}
            className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 lg:border-4 border-white ${
              index === 1 ? 'scale-125 z-10' : 'z-0'
            } ${index > 0 ? '-ml-4 lg:-ml-6' : ''}`}
          >
            <Image
              src={avatar}
              alt={`Avatar ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Quote */}
      <p className="text-lg lg:text-3xl font-medium max-w-3xl mx-auto mt-6 lg:mt-8 text-black leading-relaxed">
        {testimonial.quote}
      </p>

      {/* Author */}
      <p className="mt-4 lg:mt-6 font-semibold text-black text-sm lg:text-base">{testimonial.author}</p>

      {/* Stats Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-16 mt-8 lg:mt-12">
        {testimonial.stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Stat Value - Changed from h2 to p for SEO (duplicate headings in loop) */}
            <p className="text-3xl lg:text-5xl font-bold text-black">{stat.value}</p>
            {/* Stat Description */}
            <p className="text-neutral-600 max-w-[150px] mt-1 lg:mt-2 text-sm lg:text-base text-center">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


