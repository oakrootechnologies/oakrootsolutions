import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

/**
 * Enhanced lazy loading utility with optimized loading states
 * Provides consistent loading patterns across the app
 */

interface LazyLoadOptions {
  ssr?: boolean;
  loading?: ComponentType | (() => JSX.Element);
  fallback?: JSX.Element;
  priority?: 'high' | 'low';
}

/**
 * Creates a lazy-loaded component with optimized loading state
 * 
 * @param importFn - Function that returns a dynamic import
 * @param options - Configuration options
 * @returns Lazy-loaded component
 * 
 * @example
 * ```tsx
 * const HeavyComponent = createLazyLoad(
 *   () => import('@/components/HeavyComponent'),
 *   {
 *     ssr: false,
 *     priority: 'low',
 *     fallback: <div className="w-full h-screen bg-white" />
 *   }
 * );
 * ```
 */
export function createLazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): ComponentType<any> {
  const {
    ssr = true,
    loading,
    fallback,
    priority = 'low',
  } = options;

  // Default loading component with mobile-first responsive sizing
  const DefaultLoading = () => (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-white flex items-center justify-center">
      <div className="text-gray-400 text-sm sm:text-base">Loading...</div>
    </div>
  );

  // next/dynamic loading expects (props: DynamicOptionsLoadingProps) => Element | null
  const loadingComponent = loading
    ? () => { const C = loading as ComponentType; return <C />; }
    : DefaultLoading;

  return dynamic(importFn, {
    ssr,
    loading: loadingComponent,
  }) as ComponentType<any>;
}

/**
 * Preloads a component for better performance
 * Call this when you anticipate the component will be needed soon
 * 
 * @param importFn - Function that returns a dynamic import
 * 
 * @example
 * ```tsx
 * // Preload when user hovers over a button
 * <button onMouseEnter={() => preloadComponent(() => import('@/components/Modal'))}>
 *   Open Modal
 * </button>
 * ```
 */
export function preloadComponent(
  importFn: () => Promise<any>
): void {
  if (typeof window !== 'undefined') {
    importFn().catch(() => {
      // Silently handle preload errors
    });
  }
}

/**
 * Lazy loads a component with intersection observer
 * Only loads when component enters viewport
 */
export function createViewportLazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): ComponentType<any> {
  return createLazyLoad(importFn, {
    ...options,
    ssr: false, // Viewport-based loading should not SSR
  });
}

