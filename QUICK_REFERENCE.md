# Quick Reference Guide

Quick reference for mobile-first optimization, lazy loading, code splitting, and Redux patterns.

## 🎯 Redux Usage

### Basic Redux Pattern
```tsx
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setMobileMenuOpen } from '@/store/slices/uiSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);
  
  return <button onClick={() => dispatch(setMobileMenuOpen(!isOpen))}>Toggle</button>;
}
```

### Available Redux State
```tsx
// UI State
state.ui.isMobileMenuOpen      // Mobile menu visibility
state.ui.scrollPosition        // Current scroll position
state.ui.isScrolled            // Whether scrolled > 50px
state.ui.viewportWidth         // Viewport width
state.ui.viewportHeight        // Viewport height
state.ui.isMobile              // Mobile device flag
state.ui.isTablet              // Tablet device flag
state.ui.isDesktop             // Desktop device flag

// App State
state.app.language             // Current language ('en' | 'es' | 'pt')
state.app.isLoading            // Global loading state
state.app.performanceMetrics   // Core Web Vitals metrics
```

---

## ⚡ Lazy Loading

### Basic Lazy Load
```tsx
import { createLazyLoad } from '@/utils/lazyLoad';

const HeavyComponent = createLazyLoad(
  () => import('@/components/HeavyComponent'),
  {
    ssr: false,              // false for 3D/interactive
    priority: 'low',         // 'high' or 'low'
    fallback: <div>Loading...</div>,
  }
);
```

### Viewport-Based Lazy Load
```tsx
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';

function MyComponent() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {isIntersecting && <HeavyComponent />}
    </div>
  );
}
```

### Preload on Interaction
```tsx
import { preloadComponent } from '@/utils/lazyLoad';

<button
  onMouseEnter={() => preloadComponent(() => import('@/components/Modal'))}
>
  Open Modal
</button>
```

---

## 📱 Mobile-First Responsive

### Using useMobile Hook
```tsx
import { useMobile } from '@/utils/useMobile';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, width } = useMobile();

  return (
    <div className={isMobile ? 'text-sm px-4' : 'text-lg px-8'}>
      Content
    </div>
  );
}
```

### Responsive Classes Pattern
```tsx
// Typography
className="text-base sm:text-lg md:text-xl lg:text-2xl"

// Spacing
className="px-4 sm:px-6 md:px-8 lg:px-12"
className="py-12 sm:py-16 md:py-20 lg:py-24"

// Layout
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

### Breakpoints
- **Mobile**: < 640px (default, no prefix)
- **sm**: ≥ 640px (small tablets)
- **md**: ≥ 768px (tablets)
- **lg**: ≥ 1024px (desktops)
- **xl**: ≥ 1280px (large desktops)

---

## 🚀 Performance Utilities

### Debounce
```tsx
import { debounce } from '@/utils/performance';

const handleSearch = debounce((query: string) => {
  // Search logic
}, 300);
```

### Throttle
```tsx
import { throttle } from '@/utils/performance';

const handleScroll = throttle(() => {
  // Scroll logic
}, 100);
```

### Preload Resource
```tsx
import { preloadResource } from '@/utils/performance';

preloadResource('/image.jpg', 'image');
```

---

## ✅ Component Checklist

When creating a new component:

- [ ] Mobile-first responsive design (start with mobile styles)
- [ ] Use `useMobile` hook for viewport detection
- [ ] Lazy load if component is heavy (>50KB)
- [ ] Use Redux for global state only
- [ ] Add loading states for async operations
- [ ] Optimize images with `OptimizedImage`
- [ ] Test on mobile devices

---

## 📦 File Structure

```
store/
├── index.ts              # Store config
├── StoreProvider.tsx     # Redux Provider
├── hooks.ts              # Typed hooks
└── slices/
    ├── uiSlice.ts        # UI state
    └── appSlice.ts       # App state

utils/
├── lazyLoad.tsx          # Lazy loading utilities
├── useMobile.ts          # Mobile-first hook
├── useIntersectionObserver.ts  # Viewport detection
└── performance.ts        # Performance utilities
```

---

## 🎓 Common Patterns

### Conditional Rendering Based on Viewport
```tsx
const { isMobile } = useMobile();

return (
  <>
    {isMobile ? <MobileComponent /> : <DesktopComponent />}
  </>
);
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
  {items.map(item => <Item key={item.id} />)}
</div>
```

### Lazy Load Heavy 3D Component
```tsx
const ThreeScene = createLazyLoad(
  () => import('@/components/ThreeScene'),
  {
    ssr: false,  // Always false for 3D
    priority: 'low',
    fallback: <div className="w-full h-screen bg-white" />,
  }
);
```

---

## 🔗 Related Documentation

- **Full Guide**: `OPTIMIZATION_GUIDE.md`
- **Implementation**: `IMPLEMENTATION_SUMMARY.md`
- **Mobile-First**: `MOBILE_FIRST_GUIDE.md`

