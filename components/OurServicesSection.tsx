'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceItem from './ServiceItem';

// Oakroot Solution services
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
    description: 'Your repetitive work, systematized.',
    href: '/ai',
  },
  {
    id: '4',
    title: 'Fintech & Financial Systems',
    description: 'Built for lending businesses in India and the UK.',
  },
];

export default function OurServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-black px-4 lg:px-[150px] py-12 lg:py-24 overflow-x-hidden"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Section Label — full width, sits above the grid */}
        <motion.h2
          variants={fadeUp(0)}
          className="text-xl font-medium underline mb-10 lg:mb-16"
        >
          Our Services
        </motion.h2>

        {/* Two-column grid with vertical centering */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left — Heading + Tagline */}
          <div>
            <motion.p
              variants={fadeUp(0.1)}
              className="text-4xl lg:text-7xl font-bold leading-tight"
            >
              We build software your business depends on.
            </motion.p>
            <motion.p
              variants={fadeUp(0.25)}
              className="text-lg lg:text-2xl text-neutral-400 font-medium mt-4 lg:mt-6"
            >
              Our tech. Your growth.
            </motion.p>
          </div>

          {/* Right — Services List */}
          <div className="flex flex-col">
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

        </div>
      </motion.div>
    </section>
  );
}
