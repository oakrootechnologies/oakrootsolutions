'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface ProjectImage {
  id: string;
  src: string;
  srcSet?: string;
  alt: string;
  link?: string;
  title?: string;
}

interface ProjectsRing3DProps {
  images: ProjectImage[];
  panelWidth?: number;
  panelRatio?: number;
  autoRotateDegPerSec?: number;
  initialRotationDeg?: number;
  spacingFactor?: number;
  className?: string;
}

/**
 * Compute the radius for a ring of N panels
 * @param N - Number of panels
 * @param panelW - Panel width in pixels
 * @param spacingFactor - Multiplier for spacing (default 1.05)
 * @returns Radius in pixels
 */
export function computeRadius(N: number, panelW: number, spacingFactor: number = 1.05): number {
  if (N < 3) return 500; // Minimum radius for small N
  return Math.round((panelW / 2) / Math.tan(Math.PI / N) * spacingFactor);
}

export default function ProjectsRing3D({
  images,
  panelWidth = 300,
  panelRatio = 0.72,
  autoRotateDegPerSec = 8,
  initialRotationDeg = 0,
  spacingFactor = 1.05,
  className = '',
}: ProjectsRing3DProps) {
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
  const N = images.length;
  const angleStepDeg = 360 / N;
  const panelH = Math.round(panelWidth * panelRatio);
  const radius = computeRadius(N, panelWidth, spacingFactor);

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
    }, 2000);
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

  // Mobile carousel refs
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className={`projects-ring-region py-12 lg:py-24 ${className}`}
      aria-label="Project gallery"
    >
      {/* Desktop 3D Ring - Hidden on mobile */}
      <div
        className="ring-scene hidden lg:block"
        style={{ perspective: 1400 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="3D project gallery"
      >
        <div className="ring-stage w-full h-[380px] lg:h-[520px] flex items-center justify-center relative">
          <div
            ref={rotatorRef}
            className="ring-rotator relative w-full h-full"
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
            {images.map((img, i) => {
              const angle = i * angleStepDeg;
              const ariaLabel = img.title 
                ? `Project: ${img.title} — view details`
                : `Project ${i + 1} — view details`;
              
              return (
                <a
                  key={img.id || i}
                  href={img.link || '#'}
                  className="ring-panel absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center center',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%)`,
                    backfaceVisibility: 'hidden',
                    '--panel-w': `${panelWidth}px`,
                    '--panel-h': `${panelH}px`,
                  } as React.CSSProperties}
                  aria-label={ariaLabel}
                  role="link"
                >
                  <div
                    className="panel-inner"
                    style={{
                      transform: `rotateY(${-angle}deg)`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={panelWidth * 2}
                      height={panelH * 2}
                      className="w-full h-full object-cover rounded-lg"
                      style={{
                        width: 'var(--panel-w)',
                        height: 'var(--panel-h)',
                        boxShadow: '0 8px 30px rgba(12, 20, 40, 0.12)',
                        userSelect: 'none',
                      }}
                      loading={i < 3 ? 'eager' : 'lazy'}
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
        className="ring-carousel-mobile block lg:hidden"
        role="region"
        aria-label="Project gallery carousel"
      >
        <div
          ref={carouselRef}
          className="overflow-x-auto flex gap-4 p-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
          }}
        >
          {images.map((img, i) => {
            const ariaLabel = img.title 
              ? `Project: ${img.title} — view details`
              : `Project ${i + 1} — view details`;
            
            return (
              <a
                key={img.id || i}
                href={img.link || '#'}
                className="min-w-[80%] flex-shrink-0 rounded-lg overflow-hidden scroll-snap-align-center"
                style={{
                  scrollSnapAlign: 'center',
                  minWidth: '75%',
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
                    sizes="(max-width: 1023px) 80vw, 300px"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    priority={i < 1}
                  />
                </div>
                {img.title && (
                  <h3 className="mt-3 text-lg font-semibold text-black px-2">{img.title}</h3>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
