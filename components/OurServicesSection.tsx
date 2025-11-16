'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceItem from './ServiceItem';

// Oakroot Solution services in chronological order
const servicesList = [
  {
    id: '1',
    title: 'Branding',
    description: 'Crafting your unique brand identity and strategy.',
    href: '/services/branding',
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user experiences.',
    href: '/services/web-design', // Links to web design as it's closely related
  },
  {
    id: '3',
    title: 'Web Design',
    description: 'Building responsive, high-performance websites.',
    href: '/services/web-design',
  },
  {
    id: '4',
    title: 'Search Engine Optimization',
    description: 'Increasing your online visibility and traffic.',
    href: '/services/digital-marketing', // SEO is part of digital marketing
  },
  {
    id: '5',
    title: 'Mobile Apps',
    description: 'Creating custom mobile and web applications.',
    href: '/services/app-development',
  },
  {
    id: '6',
    title: 'AI Automations',
    description: 'Streamlining your operations with intelligent AI.',
    // No direct page for AI Automations yet
  },
  {
    id: '7',
    title: 'Digital Marketing',
    description: 'Growing your audience and driving conversions.',
    href: '/services/digital-marketing',
  },
];

export default function OurServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white text-black px-4 lg:px-16 py-12 lg:py-24 overflow-x-hidden"
    >
      {/* Section Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Left Column (Titles) */}
        <div>
          {/* Section Number */}
          <motion.h2
            variants={titleVariants}
            className="text-xl font-medium underline"
          >
            Our Services
          </motion.h2>
          
          {/* Main Heading */}
          <motion.p
            variants={headingVariants}
            className="text-4xl lg:text-8xl font-bold mt-4 lg:mt-8 leading-tight"
          >
            We build your entire digital ecosystem.
          </motion.p>
        </div>

        {/* Right Column (Services List) */}
        <div className="flex flex-col justify-center">
          {servicesList.map((service, index) => (
            <ServiceItem
              key={service.id}
              title={service.title}
              description={service.description}
              href={service.href}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

