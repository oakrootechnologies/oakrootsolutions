'use client';

import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Services data with image pairs for each service
export const servicesData = [
  {
    id: 1,
    number: '01',
    title: 'Branding',
    desc: 'Crafting your unique brand identity, logo, and messaging.',
    href: '/services/branding',
    leftCard: {
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1000&h=800&fit=crop',
      title: 'Strategic Discovery',
      description: 'We dive deep into your market and vision to build a brand that truly represents you.',
    },
    rightCard: {
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1000&h=800&fit=crop',
      title: 'Your Identity',
      description: 'A clear, compelling brand that stands out and connects with your target audience.',
    },
  },
  {
    id: 2,
    number: '02',
    title: 'UI/UX Design',
    desc: 'Designing intuitive interfaces that are a pleasure to use.',
    href: '/services/web-design', // Links to web design as it's closely related
    leftCard: {
      imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&h=800&fit=crop',
      title: 'Top Talent',
      description: 'We source top creative professionals to design a beautiful and intuitive user journey.',
    },
    rightCard: {
      imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&h=800&fit=crop',
      title: 'Your Blueprint',
      description: 'A pixel-perfect, user-approved design that\'s ready for development.',
    },
  },
  {
    id: 3,
    number: '03',
    title: 'Website Development',
    desc: 'Building responsive, high-performance websites.',
    href: '/services/web-design',
    leftCard: {
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1000&h=800&fit=crop',
      title: 'Clean Code',
      description: 'Our developers use cutting-edge tech to build a fast, secure, and scalable site from the ground up.',
    },
    rightCard: {
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&h=800&fit=crop',
      title: 'Your Digital Storefront',
      description: 'A flawless website that converts visitors into customers on any device.',
    },
  },
  {
    id: 4,
    number: '04',
    title: 'App Development',
    desc: 'Creating custom mobile and web applications.',
    href: '/services/app-development',
    leftCard: {
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&h=800&fit=crop',
      title: 'Custom Architecture',
      description: 'We architect and build custom mobile and web applications to solve your unique business challenges.',
    },
    rightCard: {
      imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1000&h=800&fit=crop',
      title: 'Your Custom Tool',
      description: 'A powerful, scalable application that fits your exact needs and grows with you.',
    },
  },
  {
    id: 5,
    number: '05',
    title: 'Business AI Automations',
    desc: 'Streamlining your operations with intelligent AI.',
    // No direct page for AI Automations yet
    leftCard: {
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&h=800&fit=crop',
      title: 'Our Process Analysis',
      description: 'We analyze your repetitive tasks and build intelligent AI models to automate them.',
    },
    rightCard: {
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=800&fit=crop',
      title: 'Your Efficient Business',
      description: 'An automated workflow that saves you time and money, letting you focus on growth.',
    },
  },
  {
    id: 6,
    number: '06',
    title: 'Digital Marketing',
    desc: 'Growing your audience and driving conversions.',
    href: '/services/digital-marketing',
    leftCard: {
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&h=800&fit=crop',
      title: 'Growth Strategy',
      description: 'Our marketing team creates data-driven campaigns to find and engage your ideal customers.',
    },
    rightCard: {
      imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1000&h=800&fit=crop',
      title: 'Your Audience',
      description: 'A predictable stream of qualified leads and a loyal, growing customer base.',
    },
  },
  {
    id: 7,
    number: '07',
    title: 'Analytics & Growth',
    desc: 'Optimizing every step of the funnel for maximum ROI.',
    href: '/services/digital-marketing', // Analytics is part of digital marketing
    leftCard: {
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=800&fit=crop',
      title: 'Data-Driven Insights',
      description: 'We constantly monitor performance, analyze the data, and refine our approach for continuous improvement.',
    },
    rightCard: {
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&h=800&fit=crop',
      title: 'Your Future-Proof Brand',
      description: 'A business built on a foundation of data-driven, sustainable growth.',
    },
  },
];

export default function ServicesFlowSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const rotationDuration = 5; // 5 seconds for one full rotation

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      dragFree: true,
      containScroll: 'trimSnaps',
    }
  );

  // Update selected index when slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-advance when rotation completes
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, rotationDuration * 1000);

    return () => clearInterval(interval);
  }, [emblaApi, rotationDuration]);

  const currentService = servicesData[selectedIndex];

  return (
    <section className="w-full bg-white text-black py-12 px-4 lg:py-24 lg:px-8 relative overflow-x-hidden">
      {/* Static Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">
        <h2 className="text-3xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
          Elite Talent, Unmatched Creativity
        </h2>
        <p className="text-base lg:text-lg text-neutral-600">
          We bring together the best minds in design and development to create
          digital experiences that elevate your brand and drive results.
        </p>
      </div>

      {/* Horizontal Slider Container */}
      <div className="relative w-full overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8 lg:gap-12">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="flex-[0_0_90vw] lg:flex-[0_0_85vw] xl:flex-[0_0_75vw] flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 relative"
              >
                {/* Left Card - Horizontal Rectangular */}
                <div className="w-full lg:w-[44%] rounded-2xl lg:rounded-3xl overflow-hidden aspect-[5/4] relative">
                  <Image
                    src={service.leftCard.imageUrl}
                    alt={service.leftCard.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    unoptimized={service.leftCard.imageUrl.includes('unsplash.com')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 text-white z-10">
                    <span className="text-xs lg:text-sm text-neutral-300 mb-1 lg:mb-2 block">{service.number}</span>
                    <h2 className="text-2xl lg:text-5xl font-bold mb-2 lg:mb-3 drop-shadow-lg leading-tight">
                      {service.leftCard.title}
                    </h2>
                    <p className="text-xs lg:text-base text-neutral-200 max-w-md drop-shadow-md">
                      {service.leftCard.description}
                    </p>
                  </div>
                </div>

                {/* Central Circle - Overlapping both cards */}
                {service.href ? (
                  <Link href={service.href} className="absolute left-1/2 -translate-x-1/2 w-40 h-40 lg:w-72 lg:h-72 flex-shrink-0 z-30 cursor-pointer">
                    {/* Yellow rotating half circumference SVG */}
                    <motion.svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 320 320"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: rotationDuration,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {/* Half circle (upper half) */}
                      <path
                        d="M 160,20 A 140,140 0 0,1 300,160"
                        fill="none"
                        stroke="#FACC15"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      {/* Arrow head at the end */}
                      <polygon
                        points="300,160 290,145 295,150 285,150 295,170 290,175 300,160"
                        fill="#FACC15"
                      />
                    </motion.svg>
                    
                    {/* White circle container */}
                    <div className="absolute inset-[3px] bg-white rounded-full shadow-2xl flex flex-col justify-center items-center text-center p-4 lg:p-8 hover:bg-neutral-50 transition-colors">
                      <h3 className="text-sm lg:text-2xl font-bold uppercase mb-1 lg:mb-2 leading-tight">
                        {service.number} {service.title}
                      </h3>
                      <p className="text-[10px] lg:text-sm text-neutral-600">{service.desc}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="absolute left-1/2 -translate-x-1/2 w-40 h-40 lg:w-72 lg:h-72 flex-shrink-0 z-30">
                    {/* Yellow rotating half circumference SVG */}
                    <motion.svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 320 320"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: rotationDuration,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {/* Half circle (upper half) */}
                      <path
                        d="M 160,20 A 140,140 0 0,1 300,160"
                        fill="none"
                        stroke="#FACC15"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      {/* Arrow head at the end */}
                      <polygon
                        points="300,160 290,145 295,150 285,150 295,170 290,175 300,160"
                        fill="#FACC15"
                      />
                    </motion.svg>
                    
                    {/* White circle container */}
                    <div className="absolute inset-[3px] bg-white rounded-full shadow-2xl flex flex-col justify-center items-center text-center p-6 lg:p-8">
                      <h3 className="text-xl lg:text-2xl font-bold uppercase mb-2">
                        {service.number} {service.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-neutral-600">{service.desc}</p>
                    </div>
                  </div>
                )}

                {/* Right Card - Horizontal Rectangular */}
                <div className="hidden lg:block w-[44%] rounded-3xl overflow-hidden aspect-[5/4] relative">
                  <Image
                    src={service.rightCard.imageUrl}
                    alt={service.rightCard.title}
                    fill
                    className="object-cover"
                    sizes="40vw"
                    unoptimized={service.rightCard.imageUrl.includes('unsplash.com')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-20 text-white z-10">
                    <span className="text-sm text-neutral-300 mb-2 block">{service.number}</span>
                    <h2 className="text-5xl font-bold mb-3 drop-shadow-lg">
                      {service.rightCard.title}
                    </h2>
                    <p className="text-base text-neutral-200 max-w-md drop-shadow-md">
                      {service.rightCard.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
