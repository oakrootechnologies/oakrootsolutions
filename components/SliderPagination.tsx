'use client';

import { useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

interface SliderPaginationProps {
  emblaApi: EmblaCarouselType | undefined;
}

export default function SliderPagination({ emblaApi }: SliderPaginationProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollSnaps = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updateScrollSnaps();
    updateSelectedIndex();

    emblaApi.on('select', updateSelectedIndex);
    emblaApi.on('reInit', updateScrollSnaps);
    emblaApi.on('resize', updateScrollSnaps);

    return () => {
      emblaApi.off('select', updateSelectedIndex);
      emblaApi.off('reInit', updateScrollSnaps);
      emblaApi.off('resize', updateScrollSnaps);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-12">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={`w-3 h-3 rounded-full transition-colors ${
            index === selectedIndex ? 'bg-black' : 'bg-neutral-300'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}


