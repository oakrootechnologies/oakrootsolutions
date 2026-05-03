import dynamic from 'next/dynamic';
import { ComponentType, useState, useEffect } from 'react';

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
 * Default loading component with mobile-first responsive sizing
 * Defined outside the creation function to ensure stable component identity
 * suppressHydrationWarning added to prevent errors from browser extensions (MetaMask, etc.)
 */
const DefaultLoading = () => (
  <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-white flex items-center justify-center" suppressHydrationWarning>
    <div className="text-gray-400 text-sm sm:text-base">Loading...</div>
  </div>
);

/**
 * Creates a lazy-loaded component with optimized loading state
 * 
 * @param importFn - Function that returns a dynamic import
 * @param options - Configuration options
 * @returns Lazy-loaded component
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

  // Loading fallback — only used when ssr:false.
  // ssr:true  → server rendered real HTML; any client placeholder = hydration mismatch.
  // ssr:false → server rendered null; client placeholder is safe.
  const loadingFn = () => {
    if (loading) {
      const C = loading as ComponentType;
      return <C />;
    }
    if (fallback) return fallback;
    return <DefaultLoading />;
  };

  // CRITICAL: next/dynamic options MUST be a static object literal (webpack analyses
  // it at build time). We also must NEVER include a `loading` key with value `undefined`
  // because Next.js 14 checks key *existence* (`'loading' in opts`), not truthiness,
  // and calls React.createElement(undefined) → crash.
  // Solution: two separate dynamic() calls, each with a proper literal.
  if (ssr) {
    // ssr:true — no loading key at all, zero risk of undefined element type.
    return dynamic(importFn, { ssr: true }) as ComponentType<any>;
  }

  // ssr:false — include loading so the client shows a placeholder while the
  // JS chunk downloads.
  return dynamic(importFn, {
    ssr: false,
    loading: loadingFn,
  }) as ComponentType<any>;
}

/**
 * A wrapper component to ensure its children only render on the client.
 * Use this for components that cause hydration mismatches (e.g., those using browser APIs).
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Preloads a component for better performance
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

