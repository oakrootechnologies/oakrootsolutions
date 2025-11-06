'use client';

import ScrollingColumn from './ScrollingColumn';

// Mock data for service cards
const mockServiceCards = [
  {
    id: '1',
    title: 'App Development',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop',
    href: '/services/app-development',
  },
  {
    id: '2',
    title: 'Graphic Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop',
    href: '/services/graphic-design',
  },
  {
    id: '3',
    title: 'Video & Photo',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop',
    href: '/services/video-photo',
  },
  {
    id: '4',
    title: 'Marketing Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop',
    href: '/services/digital-marketing', // Marketing Strategy links to Digital Marketing
  },
  {
    id: '5',
    title: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=500&fit=crop',
    href: '/services/web-design',
  },
  {
    id: '6',
    title: 'Digital Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=500&fit=crop',
    href: '/services/digital-marketing',
  },
];

export default function VisualColumn() {
  // Split cards into two columns for staggered effect
  // First column: cards 0, 2, 4 (odd positions)
  // Second column: cards 1, 3, 5 (even positions) - creates visual interest
  const firstColumn = [mockServiceCards[0], mockServiceCards[2], mockServiceCards[4]];
  const secondColumn = [mockServiceCards[1], mockServiceCards[3], mockServiceCards[5]];

  return (
    <div className="relative h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Mask gradient for fade effect at top and bottom */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      />
      
      {/* Grid Container */}
      <div className="grid grid-cols-2 gap-4 h-full relative">
        {/* First Scrolling Column - Scrolls upward */}
        <div className="overflow-hidden h-full">
          <ScrollingColumn cards={firstColumn} reverse={false} />
        </div>

        {/* Second Scrolling Column - Scrolls downward (opposite direction) */}
        <div className="overflow-hidden h-full">
          <ScrollingColumn cards={secondColumn} reverse={true} />
        </div>
      </div>
    </div>
  );
}

