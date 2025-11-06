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
            className={`relative w-20 h-20 rounded-full overflow-hidden border-4 border-white ${
              index === 1 ? 'scale-125 z-10' : 'z-0'
            } ${index > 0 ? '-ml-6' : ''}`}
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
      <p className="text-2xl lg:text-3xl font-medium max-w-3xl mx-auto mt-8 text-black">
        {testimonial.quote}
      </p>

      {/* Author */}
      <p className="mt-6 font-semibold text-black">{testimonial.author}</p>

      {/* Stats Row */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-12">
        {testimonial.stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Stat Value */}
            <h2 className="text-5xl font-bold text-black">{stat.value}</h2>
            {/* Stat Description */}
            <p className="text-neutral-600 max-w-[150px] mt-2">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


