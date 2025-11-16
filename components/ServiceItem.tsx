'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface ServiceItemProps {
  title: string;
  description: string;
  href?: string;
  index?: number;
  isInView?: boolean;
}

export default function ServiceItem({ title, description, href, index = 0, isInView = false }: ServiceItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      },
    },
  };

  const content = (
    <>
      {/* Changed from h3 to p for SEO (duplicate headings in loop) - preserving exact className */}
      <motion.p
        className="text-xl lg:text-3xl font-medium underline relative"
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {title}
      </motion.p>
      <motion.p
        className="text-sm lg:text-lg text-neutral-600 ml-2 lg:ml-4"
        animate={{
          opacity: isHovered ? 1 : 0.8,
          x: isHovered ? 4 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {description}
      </motion.p>
    </>
  );

  return (
    <motion.div
      ref={itemRef}
      className={`flex items-baseline mb-6 group ${href ? 'cursor-pointer' : 'cursor-default'}`}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {href ? (
        <Link href={href} className="flex items-baseline w-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
}

