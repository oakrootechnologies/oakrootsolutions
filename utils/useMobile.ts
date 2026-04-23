import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setViewportSize } from '@/store/slices/uiSlice';

/**
 * Mobile-first responsive hook
 * Provides viewport information and device type detection
 * 
 * @returns Object with viewport info and device type flags
 * 
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop, width, height } = useMobile();
 * 
 * return (
 *   <div className={isMobile ? 'text-sm' : 'text-lg'}>
 *     Responsive content
 *   </div>
 * );
 * ```
 */
export function useMobile() {
  const dispatch = useAppDispatch();
  const { viewportWidth, viewportHeight, isMobile, isTablet, isDesktop } = useAppSelector(
    (state) => state.ui
  );

  useEffect(() => {
    // Set initial viewport size
    const updateViewport = () => {
      dispatch(
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };

    // Set initial size
    updateViewport();

    // Update on resize with debounce
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', updateViewport, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateViewport);
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  return {
    width: viewportWidth,
    height: viewportHeight,
    isMobile,
    isTablet,
    isDesktop,
    // Breakpoint helpers
    isSmall: viewportWidth < 640,
    isMedium: viewportWidth >= 640 && viewportWidth < 1024,
    isLarge: viewportWidth >= 1024,
  };
}

/**
 * Hook to detect if component should render mobile version
 * Useful for conditional rendering based on viewport
 */
export function useIsMobile() {
  const { isMobile } = useMobile();
  return isMobile;
}

