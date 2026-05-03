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

  const gridClassName = "grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4 lg:gap-12 items-start w-full";

  const content = (
    <div className={gridClassName}>
      <motion.p
        className="text-xl lg:text-3xl font-medium underline leading-tight"
        animate={{
          scale: isHovered ? 1.01 : 1,
          color: isHovered ? '#000' : '#171717',
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {title}
      </motion.p>
      <motion.p
        className="text-sm lg:text-lg text-neutral-500 mt-1 lg:mt-2"
        animate={{
          opacity: isHovered ? 1 : 0.7,
          x: isHovered ? 4 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {description}
      </motion.p>
    </div>
  );

  return (
    <motion.div
      ref={itemRef}
      className={`mb-8 lg:mb-10 group ${href ? 'cursor-pointer' : 'cursor-default'}`}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {href ? (
        <Link href={href} className="block w-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
}

