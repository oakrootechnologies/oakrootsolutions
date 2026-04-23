/**
 * Performance monitoring utilities
 * Tracks Core Web Vitals and custom metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
}

/**
 * Measures Core Web Vitals and reports them
 * Should be called in _app.tsx or a performance monitoring component
 */
export function measureWebVitals(
  onPerfEntry?: (metric: PerformanceMetric) => void
): void {
  if (typeof window === 'undefined' || !onPerfEntry) return;

  // Measure FCP (First Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            onPerfEntry({
              name: 'FCP',
              value: fcp,
              rating: fcp < 1800 ? 'good' : fcp < 3000 ? 'needs-improvement' : 'poor',
            });
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Silently fail if PerformanceObserver is not supported
    }
  }

  // Measure LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      let lcpValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        lcpValue = lastEntry.renderTime || lastEntry.loadTime;

        onPerfEntry({
          name: 'LCP',
          value: lcpValue,
          rating: lcpValue < 2500 ? 'good' : lcpValue < 4000 ? 'needs-improvement' : 'poor',
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Silently fail if PerformanceObserver is not supported
    }
  }

  // Measure CLS (Cumulative Layout Shift)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }

        onPerfEntry({
          name: 'CLS',
          value: clsValue,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Silently fail if PerformanceObserver is not supported
    }
  }
}

/**
 * Preloads a resource for better performance
 * 
 * @param href - URL to preload
 * @param as - Resource type (image, script, style, etc.)
 */
export function preloadResource(href: string, as: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Prefetches a resource for better performance
 * Use for resources that might be needed soon
 * 
 * @param href - URL to prefetch
 */
export function prefetchResource(href: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Debounce function for performance optimization
 * Prevents excessive function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * Limits function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

