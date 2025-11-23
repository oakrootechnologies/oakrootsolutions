'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { computeCylinderRadius } from '@/utils/computeCylinderRadius';

interface PosterImage {
  id: string;
  src: string;
  srcSet?: string;
  alt: string;
  link?: string;
}

interface CylinderPostersProps {
  images: PosterImage[];
  numPanels?: number;
  panelWidthPx?: number;
  panelRatio?: number;
  autoRotateDegPerSec?: number;
  spacingFactor?: number;
  maxBendDeg?: number;
  initialRotationDeg?: number;
  className?: string;
}

// Re-export for convenience
export { computeCylinderRadius };

export default function CylinderPosters({
  images,
  numPanels = 20,
  panelWidthPx = 320,
  panelRatio = 0.75,
  autoRotateDegPerSec = 8,
  spacingFactor = 0.995,
  maxBendDeg = 6,
  initialRotationDeg = 0,
  className = '',
}: CylinderPostersProps) {
  const rotatorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [containerRotation, setContainerRotation] = useState(initialRotationDeg);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, rotation: 0 });
  const lastTimeRef = useRef<number>(Date.now());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Prepare panels array - replicate images if needed to reach numPanels
  const N = Math.max(numPanels, images.length);
  const panels: PosterImage[] = [];
  for (let i = 0; i < N; i++) {
    panels.push(images[i % images.length]);
  }

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsAutoRotating(false);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Calculate geometry
  const W = panelWidthPx;
  const H = Math.round(W * panelRatio);
  const theta = (2 * Math.PI) / N; // Central angle per panel in radians
  const angleStepDeg = 360 / N;
  const radius = computeCylinderRadius(N, W, spacingFactor);

  // Auto-rotate animation
  useEffect(() => {
    if (!isAutoRotating || isPaused || isDragging || prefersReducedMotion || !isVisible) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const tick = () => {
      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = now;

      setContainerRotation((prev) => prev + autoRotateDegPerSec * deltaTime);
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoRotating, isPaused, isDragging, autoRotateDegPerSec, prefersReducedMotion, isVisible]);

  // Apply rotation to rotator container
  useEffect(() => {
    if (rotatorRef.current) {
      rotatorRef.current.style.transform = `rotateX(-4deg) rotateY(${containerRotation}deg)`;
    }
  }, [containerRotation]);

  // Pointer drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    e.preventDefault();
    setIsDragging(true);
    setIsPaused(true);
    dragStartRef.current = {
      x: e.clientX,
      rotation: containerRotation,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [containerRotation, prefersReducedMotion]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || prefersReducedMotion) return;
    e.preventDefault();
    const deltaX = e.clientX - dragStartRef.current.x;
    const sensitivity = 0.35; // degrees per px
    const deltaRotation = deltaX * sensitivity;
    setContainerRotation(dragStartRef.current.rotation + deltaRotation);
  }, [isDragging, prefersReducedMotion]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    // Resume auto-rotate after a short delay
    setTimeout(() => {
      setIsPaused(false);
    }, 800);
  }, [isDragging]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (prefersReducedMotion) return;
    if (e.key === 'ArrowLeft') {
      setContainerRotation((prev) => prev - angleStepDeg);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 2000);
    } else if (e.key === 'ArrowRight') {
      setContainerRotation((prev) => prev + angleStepDeg);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 2000);
    }
  }, [angleStepDeg, prefersReducedMotion]);

  // Pause on hover/focus
  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion) {
      setIsPaused(true);
    }
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (!prefersReducedMotion && !isDragging) {
      setIsPaused(false);
    }
  }, [prefersReducedMotion, isDragging]);

  return (
    <section
      className={`cylinder-posters-region py-12 lg:py-24 ${className}`}
      aria-label="Project posters (cylindrical band)"
    >
      {/* Desktop 3D Cylinder - Hidden on mobile */}
      <div
        className="cylinder-scene hidden lg:block"
        style={{ perspective: 1400 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="3D cylindrical poster band"
      >
        <div className="cylinder-stage w-full h-[380px] lg:h-[520px] relative flex items-center justify-center">
          <div
            ref={rotatorRef}
            className="cylinder-rotator relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 400ms cubic-bezier(0.2, 0.9, 0.2, 1)',
              willChange: isAutoRotating && !isPaused ? 'transform' : 'auto',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {panels.map((img, i) => {
              const angle = i * angleStepDeg;
              // Calculate bend: maxBendDeg * cos(2*PI*i/N) for smooth curve
              const bendDeg = maxBendDeg * Math.cos((2 * Math.PI * i) / N);
              const ariaLabel = `Project poster ${i + 1} — ${img.alt}`;
              
              return (
                <a
                  key={img.id || i}
                  href={img.link || '#'}
                  className="cylinder-panel absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '50% 50%',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%)`,
                    backfaceVisibility: 'hidden',
                    '--panel-w': `${W}px`,
                    '--panel-h': `${H}px`,
                  } as React.CSSProperties}
                  aria-label={ariaLabel}
                  role="link"
                >
                  <div
                    className="panel-inner"
                    style={{
                      transform: `rotateY(${-angle}deg) rotateX(${bendDeg}deg)`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={W * 2}
                      height={H * 2}
                      className="w-full h-full object-cover"
                      style={{
                        width: 'var(--panel-w)',
                        height: 'var(--panel-h)',
                        userSelect: 'none',
                      }}
                      loading={i < 6 ? 'eager' : 'lazy'}
                      priority={i < 2}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Carousel - Visible only on mobile */}
      <div
        className="cylinder-carousel-mobile block lg:hidden"
        role="region"
        aria-label="Project posters carousel"
      >
        <div
          className="overflow-x-auto flex gap-4 p-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
          }}
        >
          {panels.map((img, i) => {
            const ariaLabel = `Project poster ${i + 1} — ${img.alt}`;
            
            return (
              <a
                key={img.id || i}
                href={img.link || '#'}
                className="min-w-[80%] flex-shrink-0 rounded-lg overflow-hidden scroll-snap-align-center"
                style={{
                  scrollSnapAlign: 'center',
                  minWidth: '80%',
                }}
                aria-label={ariaLabel}
                role="link"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 80vw, 320px"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    priority={i < 1}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

