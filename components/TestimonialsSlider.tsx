'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import TestimonialSlide from './TestimonialSlide';
import SliderPagination from './SliderPagination';

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

// Mock testimonials data
const testimonials: Testimonial[] = [
  {
    id: '1',
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    ],
    quote:
      'Oakroot transformed our digital presence completely. Their creative strategy and attention to detail resulted in a 300% increase in our conversion rates.',
    author: 'Shivam Gupta, CEO at restworld mattress.',
    stats: [
      { value: '#1', description: 'in Mattress Manufacturing' },
      { value: '2X', description: 'Revenue doubled in 6 months' },
    ],
  },
  {
    id: '2',
    avatars: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    ],
    quote:
      'The team at Oakroot understood our vision from day one. Their innovative approach to branding helped us stand out in a crowded market.',
    author: 'Sanket Neekhra, CEO at IdeaAscend',
    stats: [
      { value: '95%', description: 'Customer satisfaction rate' },
      { value: '5X', description: 'Brand recognition increase' },
    ],
  },
  {
    id: '3',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-0b2d7b0b4e9b?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop',
    ],
    quote:
      'Working with Oakroot was a game-changer for our business. They delivered exceptional results and exceeded all our expectations.',
    author: 'Rahul Jain, CEO at wittywealth Financial services.',
    stats: [
      { value: '#3', description: 'Top 3 Agency in the Region' },
      { value: '150%', description: 'ROI increase in first quarter' },
    ],
  },
];

export default function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section className="w-full bg-white text-black py-12 px-4 lg:py-24 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Embla Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Embla Container */}
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
                <TestimonialSlide testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Slider Pagination */}
        <SliderPagination emblaApi={emblaApi} />
      </div>
    </section>
  );
}


