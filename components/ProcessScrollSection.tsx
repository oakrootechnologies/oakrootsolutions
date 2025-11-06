'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhaseSection from './PhaseSection';

// Process phases data
const phases = [
  {
    id: '1',
    title: '01 Discovery & Strategy',
    steps: [
      {
        title: 'Consultation',
        description: 'We start with an in-depth consultation to understand your business goals, target audience, and unique challenges. This foundational step ensures we align our strategy with your vision.',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop',
      },
      {
        title: 'Market Research',
        description: 'Our team conducts comprehensive market research to identify opportunities, analyze competitors, and understand industry trends. This data-driven approach informs every decision we make.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      },
      {
        title: 'Blueprint',
        description: 'We create a detailed strategic blueprint that outlines your path to success. This roadmap includes timelines, milestones, and key performance indicators to track progress.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop',
      },
    ],
  },
  {
    id: '2',
    title: '02 Design & Development',
    steps: [
      {
        title: 'UI/UX Design',
        description: 'Our designers create intuitive, beautiful interfaces that prioritize user experience. Every element is crafted to guide users toward your conversion goals.',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop',
      },
      {
        title: 'Agile Development',
        description: 'We build using agile methodologies, ensuring rapid iteration and continuous improvement. Our developers write clean, scalable code that performs flawlessly.',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
      },
      {
        title: 'AI Integration',
        description: 'We leverage cutting-edge AI technologies to automate processes, enhance user experiences, and provide intelligent insights that drive business growth.',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
      },
    ],
  },
  {
    id: '3',
    title: '03 Growth & Optimization',
    steps: [
      {
        title: 'Testing & Launch',
        description: 'Before launch, we conduct rigorous testing across devices and browsers. We ensure everything works perfectly, then execute a smooth launch with minimal disruption.',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
      },
      {
        title: 'Digital Marketing',
        description: 'Our marketing team creates data-driven campaigns that reach your ideal customers. We optimize for conversions and build a predictable stream of qualified leads.',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
      },
      {
        title: 'Continuous Analysis',
        description: 'We monitor performance metrics, analyze user behavior, and continuously refine our approach. This iterative process ensures sustained growth and maximum ROI.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      },
    ],
  },
];

export default function ProcessScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<string>('1');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate which phase should be active based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const relativeScroll = scrollTop - containerTop + windowHeight / 2;
      const phaseHeight = containerHeight / phases.length;

      const currentPhaseIndex = Math.min(
        Math.floor(relativeScroll / phaseHeight),
        phases.length - 1
      );

      setActivePhase(phases[Math.max(0, currentPhaseIndex)]?.id || '1');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white text-black relative flex min-h-screen"
    >
      {/* Left Column - Sticky Title */}
      <div className="w-1/4 h-screen sticky top-0 flex items-center justify-center pl-16 z-10">
        <motion.h2
          className="text-6xl font-bold uppercase whitespace-nowrap text-black"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          OUR PROCESS
        </motion.h2>
      </div>

      {/* Right Area Container - Scrollable Phases */}
      <div className="w-3/4">
        {phases.map((phase, index) => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            isActive={activePhase === phase.id}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

