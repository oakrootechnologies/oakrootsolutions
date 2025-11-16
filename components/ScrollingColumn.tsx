'use client';

import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

interface CardData {
  id: string;
  title: string;
  imageUrl: string;
  href?: string;
}

interface ScrollingColumnProps {
  cards: CardData[];
  reverse?: boolean; // If true, scroll in opposite direction
}

export default function ScrollingColumn({ cards, reverse = false }: ScrollingColumnProps) {
  // Duplicate cards array multiple times to create seamless loop
  // We need at least 2 copies, using 3 for smoother transition
  const duplicatedCards = [...cards, ...cards, ...cards];

  // Calculate the exact percentage to move (one set of original cards)
  const cardCount = cards.length;
  const totalCards = duplicatedCards.length;
  const movePercentage = (cardCount / totalCards) * 100;

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ y: reverse ? `-${movePercentage}%` : 0 }}
      animate={{
        y: reverse ? 0 : `-${movePercentage}%`,
      }}
      transition={{
        repeat: Infinity,
        duration: 25,
        ease: 'linear',
      }}
    >
      {duplicatedCards.map((card, index) => {
        // For SEO: Only the first instance of each unique card should use h3
        // The first set of cards (index < cards.length) are the original instances
        const isFirstInstance = index < cards.length;
        
        return (
          <ServiceCard
            key={`${card.id}-${index}`}
            id={card.id}
            title={card.title}
            imageUrl={card.imageUrl}
            href={card.href}
            index={isFirstInstance ? 0 : 1}
          />
        );
      })}
    </motion.div>
  );
}

