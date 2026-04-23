# Comprehensive Optimization Guide

This guide outlines all optimization strategies implemented in the Oakroot Solutions website, ensuring mobile-first responsive design, optimal lazy loading, code splitting, and Redux global state management.

## 📋 Table of Contents

- [Mobile-First Responsive Design](#mobile-first-responsive-design)
- [Lazy Loading Strategy](#lazy-loading-strategy)
- [Code Splitting](#code-splitting)
- [Redux Global State](#redux-global-state)
- [Performance Optimization](#performance-optimization)
- [Best Practices](#best-practices)

---

## 🎯 Mobile-First Responsive Design

### Philosophy

**Mobile-First** means designing and coding for mobile devices first, then enhancing for larger screens. This approach:
- ✅ Improves performance on mobile devices
- ✅ Ensures content is accessible on all screen sizes
- ✅ Reduces code complexity
- ✅ Better Core Web Vitals scores

### Breakpoints

Using Tailwind CSS default breakpoints:

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default (mobile) | < 640px | Base styles, no prefix |
| `sm:` | ≥ 640px | Small tablets |
| `md:` | ≥ 768px | Tablets, small desktops |
| `lg:` | ≥ 1024px | Desktops |
| `xl:` | ≥ 1280px | Large desktops |

### Using the `useMobile` Hook

```tsx
import { useMobile } from '@/utils/useMobile';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, width, height } = useMobile();

  return (
    <div className={isMobile ? 'text-sm px-4' : 'text-lg px-8'}>
      Responsive content
    </div>
  );
}
```

### Responsive Typography Pattern

```tsx
// ✅ Good: Mobile-first
className="text-base sm:text-lg md:text-xl lg:text-2xl"

// ❌ Bad: Desktop-first
className="text-2xl lg:text-xl md:text-lg sm:text-base"
```

### Responsive Spacing Pattern

```tsx
// Container Padding
className="px-4 sm:px-6 md:px-8 lg:px-12"

// Section Padding
className="py-12 sm:py-16 md:py-20 lg:py-24"
```

---

## ⚡ Lazy Loading Strategy

### Using `createLazyLoad` Utility

The `createLazyLoad` utility provides consistent lazy loading patterns:

```tsx
import { createLazyLoad } from '@/utils/lazyLoad';

// Basic usage
const HeavyComponent = createLazyLoad(
  () => import('@/components/HeavyComponent'),
  {
    ssr: true, // Enable SSR for SEO-critical components
    priority: 'low', // 'high' or 'low'
    fallback: <div className="w-full h-[400px] bg-white" />,
  }
);
```

### When to Use SSR

- ✅ **SSR: true** - For SEO-critical content (text, images, content sections)
- ❌ **SSR: false** - For interactive components (3D scenes, animations, modals)

### Priority Levels

- **High Priority**: Components visible above the fold
- **Low Priority**: Components below the fold or interactive elements

### Viewport-Based Lazy Loading

For components that should only load when visible:

```tsx
import { createViewportLazyLoad } from '@/utils/lazyLoad';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';

const LazyComponent = createViewportLazyLoad(
  () => import('@/components/LazyComponent'),
  {
    fallback: <div>Loading...</div>,
  }
);

function MyPage() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {isIntersecting && <LazyComponent />}
    </div>
  );
}
```

### Preloading Components

Preload components when user interaction suggests they'll be needed:

```tsx
import { preloadComponent } from '@/utils/lazyLoad';

<button
  onMouseEnter={() => preloadComponent(() => import('@/components/Modal'))}
>
  Open Modal
</button>
```

---

## 📦 Code Splitting

### Route-Based Code Splitting

Next.js automatically splits code by route. Each page is a separate chunk:

```tsx
// pages/index.tsx - Automatically code-split
export default function Home() {
  return <div>Home Page</div>;
}
```

### Component-Based Code Splitting

Split heavy components into separate chunks:

```tsx
// ✅ Good: Heavy component is code-split
const Heavy3DComponent = createLazyLoad(
  () => import('@/components/Heavy3DComponent'),
  { ssr: false }
);

// ❌ Bad: Heavy component loaded immediately
import Heavy3DComponent from '@/components/Heavy3DComponent';
```

### Library Code Splitting

Split large libraries into separate chunks:

```tsx
// Split Three.js into separate chunk
const ThreeScene = createLazyLoad(
  () => import('@/components/ThreeScene'),
  { ssr: false }
);
```

### Dynamic Imports Best Practices

1. **Use for heavy components**: 3D scenes, animations, charts
2. **Use for below-fold content**: Testimonials, footer sections
3. **Use for interactive elements**: Modals, dropdowns, tooltips
4. **Don't use for critical content**: Hero sections, navigation

---

## 🗄️ Redux Global State

### Store Structure

```
store/
├── index.ts              # Store configuration
├── StoreProvider.tsx     # Redux Provider wrapper
├── hooks.ts              # Typed hooks
└── slices/
    ├── uiSlice.ts        # UI state (menu, scroll, viewport)
    └── appSlice.ts       # App state (language, loading, metrics)
```

### Using Redux Hooks

```tsx
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setMobileMenuOpen } from '@/store/slices/uiSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  const handleClick = () => {
    dispatch(setMobileMenuOpen(!isMobileMenuOpen));
  };

  return <button onClick={handleClick}>Toggle Menu</button>;
}
```

### Available State Slices

#### UI Slice (`state.ui`)

- `isMobileMenuOpen`: Mobile menu visibility
- `isPreloaderVisible`: Preloader visibility
- `scrollPosition`: Current scroll position
- `mousePosition`: Mouse coordinates
- `isScrolled`: Whether page is scrolled
- `viewportWidth`: Viewport width
- `viewportHeight`: Viewport height
- `isMobile`: Mobile device flag
- `isTablet`: Tablet device flag
- `isDesktop`: Desktop device flag

#### App Slice (`state.app`)

- `language`: Current language ('en' | 'es' | 'pt')
- `isLoading`: Global loading state
- `loadedComponents`: Set of loaded component names
- `performanceMetrics`: Core Web Vitals metrics

### Best Practices

1. **Keep state minimal**: Only store truly global state
2. **Use selectors**: Create memoized selectors for complex state
3. **Avoid over-fetching**: Don't store data that can be computed
4. **Type safety**: Always use typed hooks (`useAppSelector`, `useAppDispatch`)

---

## 🚀 Performance Optimization

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s on mobile 3G
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TBT (Total Blocking Time)**: < 150ms
- **FCP (First Contentful Paint)**: < 1.8s

### Image Optimization

Use `OptimizedImage` component:

```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/hero.jpg"
  alt="Hero image"
  priority // For LCP images
  width={1920}
  height={1080}
  placeholder="blur"
  blurDataURL="data:image/svg+xml..."
/>
```

### Video Optimization

Use `OptimizedVideo` component:

```tsx
import OptimizedVideo from '@/components/OptimizedVideo';

<OptimizedVideo
  src="/video.mp4"
  poster="/poster.jpg"
  lazy={true} // Lazy load below fold
  preload="metadata"
/>
```

### Performance Monitoring

Performance metrics are automatically tracked in Redux:

```tsx
import { useAppSelector } from '@/store/hooks';

function PerformanceDisplay() {
  const metrics = useAppSelector((state) => state.app.performanceMetrics);
  
  return (
    <div>
      <p>LCP: {metrics.lcp}ms</p>
      <p>FCP: {metrics.fcp}ms</p>
      <p>CLS: {metrics.cls}</p>
    </div>
  );
}
```

### Debouncing and Throttling

```tsx
import { debounce, throttle } from '@/utils/performance';

// Debounce expensive operations
const handleSearch = debounce((query: string) => {
  // Search logic
}, 300);

// Throttle scroll handlers
const handleScroll = throttle(() => {
  // Scroll logic
}, 100);
```

---

## ✅ Best Practices

### Component Structure

```tsx
'use client'; // Only if using client-side features

import { useMobile } from '@/utils/useMobile';
import { createLazyLoad } from '@/utils/lazyLoad';

// Lazy load heavy dependencies
const HeavyComponent = createLazyLoad(
  () => import('@/components/HeavyComponent'),
  { ssr: false }
);

export default function MyComponent() {
  const { isMobile } = useMobile();

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Mobile-first responsive content */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Responsive Heading
      </h1>
      
      {/* Conditionally render based on viewport */}
      {!isMobile && <HeavyComponent />}
    </div>
  );
}
```

### Checklist for New Components

- [ ] Mobile-first responsive design (start with mobile styles)
- [ ] Lazy load if component is heavy (>50KB)
- [ ] Use `useMobile` hook for viewport detection
- [ ] Optimize images with `OptimizedImage`
- [ ] Use Redux for global state only
- [ ] Add loading states for async operations
- [ ] Test on mobile devices
- [ ] Check Core Web Vitals scores

### Performance Checklist

- [ ] All images use `OptimizedImage` or `next/image`
- [ ] Heavy components are lazy loaded
- [ ] 3D components have `ssr: false`
- [ ] Critical CSS is inlined
- [ ] Fonts are optimized with `next/font`
- [ ] Bundle size is analyzed (`npm run analyze`)
- [ ] Lighthouse score > 90

---

## 🔧 Configuration Files

### `next.config.js`

- Image optimization (AVIF/WebP)
- Bundle analyzer configuration
- HTTP headers for caching

### `tailwind.config.js`

- Mobile-first breakpoints
- Custom responsive utilities

### `store/index.ts`

- Redux store configuration
- Middleware setup
- DevTools configuration

---

## 📊 Monitoring and Testing

### Performance Testing

```bash
# Run Lighthouse CI
npm run perf:lighthouse

# Check performance metrics
npm run perf:check
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze
```

### Mobile Testing

1. Use Chrome DevTools device emulation
2. Test on real devices (iOS, Android)
3. Check Core Web Vitals in PageSpeed Insights
4. Verify touch targets are ≥ 44x44px

---

## 🎓 Summary

This optimization guide ensures:

1. ✅ **Mobile-First**: All components start with mobile styles
2. ✅ **Lazy Loading**: Heavy components load only when needed
3. ✅ **Code Splitting**: Automatic route and component splitting
4. ✅ **Redux State**: Centralized global state management
5. ✅ **Performance**: Optimized images, videos, and assets
6. ✅ **Monitoring**: Core Web Vitals tracking

Follow these patterns for all new components and features!

