'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface HorizontalSliderProps {
  sliderProgress: MotionValue<number>;
}

const historyCards = [
  {
    year: '2015',
    title: 'A Prodigy\'s Passion',
    description: 'Priyanshu discovers his love for code in the 5th grade. While others played games, he was building them, laying the foundation for a lifelong obsession with technology.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
  },
  {
    year: '2020',
    title: 'Lockdown Focus',
    description: 'When the world stopped, Priyanshu accelerated. The lockdown became a crucible for deep learning, mastering complex technologies and envisioning a future built on code.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
  },
  {
    year: '2023',
    title: 'Professional Beginnings',
    description: 'The journey turns professional. Winning hackathons, delivering freelance projects, and proving that raw talent, when honed, can solve real-world business problems.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
  },
  {
    year: 'Today',
    title: 'Your Trusted Partner',
    description: 'With 5+ years of deep industry experience, Oakroot Solutions stands as a pillar of reliability. We are the professional, trustworthy partner ready to build your future.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
  },
];

export default function HorizontalSlider({ sliderProgress }: HorizontalSliderProps) {
  // Transform slider progress to horizontal movement
  // Move from 0% (first card) to -300% (fourth card) to show all 4 cards
  // Each card is 100vw, so 4 cards = 400vw total
  // To show the 4th card, we need to move -300vw = -300% of viewport
  const x = useTransform(sliderProgress, [0, 1], ['0vw', '-300vw']);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slider Track */}
      <motion.div
        className="w-[400vw] h-full flex items-center"
        style={{ x }}
      >
        {historyCards.map((card, index) => (
          <div
            key={index}
            className="w-screen h-full flex-shrink-0 flex items-center justify-center px-4 lg:px-16 pb-16 lg:pb-32"
          >
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              {/* Large Main Image - Left Side - Horizontal Rectangle */}
              <div className="w-full lg:flex-1 aspect-[16/10] relative overflow-hidden rounded-lg">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Text Content - Right Side */}
              <div className="w-full lg:flex-1 flex flex-col justify-center">
                <h3 className="text-4xl lg:text-6xl font-bold uppercase text-black mb-6">
                  {card.title}
                </h3>
                <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed max-w-lg">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

