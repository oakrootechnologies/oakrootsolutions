'use client';

import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

interface CardData {
  id: string;
  title: string;
  imageUrl: string;
  href?: string;
}

// Mock data for service cards
const serviceCards: CardData[] = [
  {
    id: '1',
    title: 'Video & Photo',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop',
    href: '/services/video-photo',
  },
  {
    id: '2',
    title: 'Graphic Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop',
    href: '/services/graphic-design',
  },
  {
    id: '3',
    title: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop',
    href: '/services/branding',
  },
  {
    id: '4',
    title: 'App Development',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop',
    href: '/services/app-development',
  },
  {
    id: '5',
    title: 'Digital Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=500&fit=crop',
    href: '/services/digital-marketing',
  },
  {
    id: '6',
    title: 'Marketing Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop',
    href: '/services/digital-marketing', // Marketing Strategy links to Digital Marketing
  },
  {
    id: '7',
    title: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=500&fit=crop',
    href: '/services/web-design',
  },
  {
    id: '8',
    title: 'AI Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=500&fit=crop',
    // No direct page for AI Strategy yet
  },
];

export default function ScrollingMarquee() {
  // Duplicate the array to create seamless loop
  const duplicatedCards = [...serviceCards, ...serviceCards];

  return (
    <div className="w-full overflow-hidden relative">
      {/* Masked container with fade effect on left and right edges */}
      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <motion.div
          className="flex"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            duration: 40,
            repeat: Infinity,
          }}
        >
          {/* Render the cards twice for seamless loop */}
          {duplicatedCards.map((card, index) => (
            <div key={`${card.id}-${index}`} className="flex-shrink-0 mx-2 sm:mx-4">
              <ServiceCard
                id={card.id}
                title={card.title}
                imageUrl={card.imageUrl}
                horizontal={true}
                href={card.href}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

