'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setViewportSize, setScrollPosition } from '@/store/slices/uiSlice';
import { measureWebVitals } from '@/utils/performance';

/**
 * Performance monitoring component
 * Tracks Core Web Vitals and viewport changes
 * Should be rendered in _app.tsx
 */
export default function PerformanceMonitor() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Measure Core Web Vitals
    measureWebVitals((metric) => {
      // You can send metrics to analytics service here
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metric:', metric);
      }
    });

    // Track viewport size
    const updateViewport = () => {
      dispatch(
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };

    // Track scroll position with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          dispatch(setScrollPosition(window.scrollY));
          ticking = false;
        });
        ticking = true;
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    window.addEventListener('orientationchange', updateViewport, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  return null;
}

