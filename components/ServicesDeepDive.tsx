'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ServiceSection from './ServiceSection';

// Services data
const services = [
  {
    id: '01',
    title: '01 CUSTOM SOFTWARE & WEB DEVELOPMENT',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
    subtitle: 'Next.js, React, production-grade. Built to last.',
    steps: [
      {
        title: 'We scope it precisely',
        description:
          'No discovery theatre. We understand your operations first, then we architect — so what we build fits how you actually work, not how we assume you work.',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop',
      },
      {
        title: 'We build it to production standard',
        description:
          'Clean, modular code on modern stack. Fast load times, Core Web Vitals optimized, built to scale without rebuilding from scratch in 18 months.',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
      },
      {
        title: 'We deploy and hand over with zero ambiguity',
        description:
          'Full documentation. You own everything — code, domain, data. No lock-in, no dependency.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop',
      },
    ],
  },
  {
    id: '02',
    title: '02 SEO & ONGOING MAINTENANCE',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    subtitle: "Most agencies disappear after launch. We don't.",
    steps: [
      {
        title: 'Technical SEO from the ground up',
        description:
          "We build sites that rank because the foundation is right — not because we're gaming shortcuts that expire in six months.",
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
      },
      {
        title: 'Monthly retainers that compound',
        description:
          "SEO is not a one-time project. Our retainer clients see consistent month-on-month growth because we treat your site like it's ours.",
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
      },
      {
        title: 'Maintenance that prevents, not just fixes',
        description:
          'Updates, security patches, performance monitoring, uptime tracking. You focus on your business. We make sure your site never becomes the reason a client leaves.',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop',
      },
    ],
  },
  {
    id: '03',
    title: '03 AI & OPERATIONS AUTOMATION',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    subtitle: 'If your team does it manually every week, we can probably eliminate it.',
    steps: [
      {
        title: 'Workflow audit first',
        description:
          'We map your repetitive processes before touching a single tool. Most clients are surprised how much is automatable once it is written down.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      },
      {
        title: 'Built for your stack, not ours',
        description:
          'We don’t sell you a platform. We build automation that embeds into what you already use — your CRM, your reporting tools, your existing software.',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
      },
      {
        title: 'Runs quietly in the background',
        description:
          'No dashboards to check, no prompts to write. It works. You move on.',
        imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=800&fit=crop',
      },
    ],
  },
  {
    id: '04',
    title: '04 FINTECH & FINANCIAL SYSTEMS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    subtitle: 'Expert engineering for high-stakes financial operations.',
    steps: [
      {
        title: 'Commission & payout management',
        description:
          'Multi-tier agent hierarchies, automated calculations, audit trails. Built for NBFCs and lending businesses that have outgrown spreadsheets.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      },
      {
        title: 'Lending operations tooling',
        description:
          'Client-facing portals, document management, pipeline tracking — built around how UK and Indian lending businesses actually operate.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      },
      {
        title: 'Compliance-adjacent architecture',
        description:
          'We build with data sensitivity in mind. Role-based access, encrypted storage, structured audit logs — without you having to ask for it.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      },
    ],
  },
];

export default function ServicesDeepDive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string>('01');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate which service should be active based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const relativeScroll = scrollTop - containerTop + windowHeight / 2;
      const serviceHeight = containerHeight / services.length;

      const currentServiceIndex = Math.min(
        Math.floor(relativeScroll / serviceHeight),
        services.length - 1
      );

      setActiveService(services[Math.max(0, currentServiceIndex)]?.id || '01');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white text-black relative flex flex-col lg:flex-row min-h-screen"
    >
      {/* Left Column - Sticky Title */}
      <div className="w-full lg:w-1/4 h-auto lg:h-screen lg:sticky top-0 flex items-center justify-center px-4 lg:pl-16 py-4 lg:py-0 z-10">
        <motion.h2
          className="text-3xl lg:text-6xl font-bold uppercase whitespace-nowrap text-black lg:[transform:rotate(-90deg)]"
          style={{
            transformOrigin: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          OUR SERVICES
        </motion.h2>
      </div>

      {/* Right Area Container - Scrollable Services */}
      <div className="w-full lg:w-3/4">
        {services.map((service, index) => (
          <ServiceSection
            key={service.id}
            service={service}
            isActive={activeService === service.id}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
