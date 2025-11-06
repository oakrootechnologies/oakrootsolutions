'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from './ServicesFlowSection';

interface CentralServiceSliderProps {
  onServiceChange: (index: number) => void;
}

export default function CentralServiceSlider({ onServiceChange }: CentralServiceSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
      onServiceChange(newIndex);
    };

    updateSelectedIndex();
    emblaApi.on('select', updateSelectedIndex);

    return () => {
      emblaApi.off('select', updateSelectedIndex);
    };
  }, [emblaApi, onServiceChange]);

  const currentService = servicesData[selectedIndex];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-30">
      {/* Yellow rotating circumference SVG on the border */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 320"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle
          cx="160"
          cy="160"
          r="154"
          fill="none"
          stroke="#FACC15"
          strokeWidth="8"
        />
      </motion.svg>
      
      {/* White circle container */}
      <div className="absolute inset-[3px] bg-white rounded-full shadow-2xl flex flex-col justify-center items-center text-center p-8 overflow-hidden">
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex w-full h-full">
            {servicesData.map((service, index) => (
              <div key={service.id} className="flex-[0_0_100%] min-w-0 flex items-center justify-center h-full">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="px-6"
                    >
                      <h3 className="text-2xl font-bold uppercase mb-2">
                        {service.number} {service.title}
                      </h3>
                      <p className="text-sm text-neutral-600">{service.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
