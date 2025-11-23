/**
 * Custom hook for IntersectionObserver to detect when elements enter the viewport.
 * Optimized for performance with SSR safety checks.
 * 
 * @param options - IntersectionObserver options (threshold, rootMargin, etc.)
 * @param once - If true, stop observing after first intersection (default: false)
 * @returns [ref, isInView] - Ref callback and boolean indicating visibility
 * 
 * @example
 * ```tsx
 * const [ref, isInView] = useInView({ threshold: 0.5 });
 * return <div ref={ref}>{isInView && <LazyComponent />}</div>;
 * ```
 */
import { useEffect, useRef, useState, RefCallback } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
}

export function useInView(
  options: UseInViewOptions = {},
  once: boolean = false
): [RefCallback<Element>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { threshold = 0.1, rootMargin = '50px', root = null, triggerOnce = once } = options;

  // Ref callback that sets the element to observe
  const ref: RefCallback<Element> = (element) => {
    elementRef.current = element;
  };

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: assume in view for SSR
      setIsInView(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (triggerOnce && observerRef.current) {
              observerRef.current.disconnect();
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observerRef.current.observe(element);

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, root, triggerOnce]);

  return [ref, isInView];
}

