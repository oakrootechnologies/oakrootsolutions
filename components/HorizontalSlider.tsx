'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface HorizontalSliderProps {
  sliderProgress: MotionValue<number>;
}

const historyCards = [
  {
    year: 'The Rule',
    title: 'Own The Outcome',
    description: "We started with one rule: don't take a project unless we can own the outcome. Oakroot was built out of frustration with how most agencies operate — big promises, clean handoffs, zero accountability after launch. We decided to work differently.",
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
  },
  {
    year: 'The Model',
    title: 'Built to Retain',
    description: 'We take on a small number of clients at a time. We scope carefully. We build to production standard. And when the project ships, we stay — on retainer, maintaining and growing what we built together.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
  },
  {
    year: 'The Results',
    title: '100% Satisfaction',
    description: "That approach has meant we've never lost a client to dissatisfaction. Every retainer we run today started as a one-time project. That's not a coincidence — it's the model.",
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
  },
  {
    year: 'The Expertise',
    title: 'Deep Understanding',
    description: "We've built commission management platforms for lending businesses, SEO systems for financial services firms, and operations tooling for companies in India and the UK. Oakroot is founder-led. You're working with the person who will actually build your system — not a junior handed your brief on day three.",
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

