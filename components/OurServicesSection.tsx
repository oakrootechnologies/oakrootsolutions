'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceItem from './ServiceItem';

// Oakroot Solution services in chronological order
const servicesList = [
  {
    id: '1',
    title: 'Custom Software & Web Development',
    description: 'Built around your operations. Not templates.',
    href: '/services/web-design',
  },
  {
    id: '2',
    title: 'SEO & Ongoing Maintenance',
    description: "We don't disappear after launch.",
    href: '/services/digital-marketing',
  },
  {
    id: '3',
    title: 'AI & Operations Automation',
    description: "Your repetitive work, systematized.",
  },
  {
    id: '4',
    title: 'Fintech & Financial Systems',
    description: "Built for lending businesses in India and the UK.",
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
      className="w-full bg-white text-black px-4 lg:px-[150px] py-12 lg:py-24 overflow-x-hidden"
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
            className="text-4xl lg:text-7xl font-bold mt-4 lg:mt-8 leading-tight"
          >
            We build software your business depends on.<br />
            <span className="text-neutral-400">Then we make sure it keeps working.</span>
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

