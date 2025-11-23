# Performance Optimization Guide

This document outlines the performance optimizations implemented for the Oakroot Solutions website, including components, configuration, testing procedures, and rollout plans.

## 📋 Table of Contents

- [Overview](#overview)
- [Components](#components)
- [Configuration](#configuration)
- [Testing & Verification](#testing--verification)
- [Acceptance Criteria](#acceptance-criteria)
- [Rollout Plan](#rollout-plan)
- [Troubleshooting](#troubleshooting)

## Overview

This performance overhaul focuses on:

- **Image Optimization**: AVIF/WebP fallbacks, lazy loading, blur placeholders
- **Video Optimization**: IntersectionObserver-based lazy loading
- **HTTP Hints**: Preconnect and preload for critical resources
- **Caching**: Optimized cache headers for static assets
- **Code Splitting**: Dynamic imports for non-critical components
- **Bundle Optimization**: Analysis and reduction strategies

### Target Metrics

- **LCP (Largest Contentful Paint)**: < 2.5s on mobile 3G
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TBT (Total Blocking Time)**: < 150ms
- **FCP (First Contentful Paint)**: < 1.8s

## Components

### OptimizedImage

**Location**: `components/OptimizedImage.tsx`

A production-ready wrapper around `next/image` with:

- ✅ Automatic AVIF/WebP format fallbacks via `<picture>` element
- ✅ Lazy loading with native `loading="lazy"` for non-priority images
- ✅ Blur-up placeholders (LQIP) with inline SVG fallback
- ✅ `fetchpriority="high"` for LCP images
- ✅ Responsive `sizes` and aspect-ratio support
- ✅ CDN integration support (Cloudinary, Imgix, Fastly)

**Usage**:

```tsx
// Hero image (LCP candidate)
<OptimizedImage
  src="/hero.jpg"
  alt="Hero image"
  priority
  width={1920}
  height={1080}
  placeholder="blur"
  blurDataURL="data:image/svg+xml..."
/>

// Content image (lazy loaded)
<OptimizedImage
  src="https://images.unsplash.com/photo-123"
  alt="Content"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Props**:

- `src`: Image source (string or StaticImageData)
- `alt`: Alt text (required)
- `priority`: If true, loads immediately with high priority
- `placeholder`: `'blur' | 'lqip' | 'empty'`
- `blurDataURL`: Custom blur placeholder data URL
- `aspectRatio`: CSS aspect-ratio value (e.g., "16/9")
- `sizes`: Responsive sizes attribute
- `cdnConfig`: CDN configuration for external images

### OptimizedVideo

**Location**: `components/OptimizedVideo.tsx`

A video component with lazy loading and poster support:

- ✅ IntersectionObserver-based lazy loading
- ✅ Poster image with play overlay
- ✅ HLS fallback support (documented)
- ✅ Autoplay with muted (browser-compliant)
- ✅ Preload control (metadata/none)

**Usage**:

```tsx
// Lazy-loaded video
<OptimizedVideo
  src="/video.mp4"
  poster="/poster.jpg"
  lazy
  controls
/>

// Autoplay hero video
<OptimizedVideo
  src="/hero.mp4"
  poster="/hero-poster.jpg"
  autoplay
  muted
  loop
  playsInline
/>
```

**Props**:

- `src`: Video source (string or array for multiple formats)
- `poster`: Poster image URL
- `type`: MIME type(s)
- `preload`: `'metadata' | 'none' | 'auto'`
- `lazy`: Enable lazy loading via IntersectionObserver
- `hlsConfig`: HLS.js configuration (requires `hls.js` package)

### useInView Hook

**Location**: `utils/useInView.ts`

Custom IntersectionObserver hook for viewport detection:

```tsx
const [ref, isInView] = useInView({ threshold: 0.5 });
return <div ref={ref}>{isInView && <LazyComponent />}</div>;
```

## Configuration

### next.config.js

**Image Optimization**:

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    },
  ],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

**Caching Headers**:

- Static assets (images, fonts, videos): `public, max-age=31536000, immutable`
- HTML: `public, max-age=0, must-revalidate`

### _app.tsx

**HTTP Hints**:

```tsx
<link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```

**Page-Level Preloads**:

```tsx
// In page components (e.g., pages/index.tsx)
<link rel="preload" as="video" href="/videos/hero-video.mp4" type="video/mp4" />
<link rel="preload" as="image" href="/videos/hero-video-poster.jpg" />
```

## Testing & Verification

### Lighthouse Testing

**Prerequisites**:

1. Build production bundle: `npm run build`
2. Start production server: `npm run start`
3. Ensure server is running at `http://localhost:3000`

**Run Tests**:

**Windows**:
```bash
scripts\perf-check.bat
```

**Linux/Mac**:
```bash
chmod +x scripts/perf-check.sh
./scripts/perf-check.sh
```

**Manual Lighthouse**:

```bash
# Install Lighthouse CI globally (optional)
npm install -g @lhci/cli

# Run Lighthouse CI
npm run perf:lighthouse

# Or use npx
npx @lhci/cli autorun \
  --collect.url=http://localhost:3000 \
  --collect.settings.emulatedFormFactor=mobile
```

### Bundle Analysis

**Analyze Bundle Size**:

```bash
npm run analyze
```

This will:
1. Build the application with bundle analyzer enabled
2. Open a visual report showing bundle sizes
3. Identify large dependencies for optimization

**Remediation**:

- Replace `lodash` with `lodash-es` (tree-shakeable) or native APIs
- Use dynamic imports for heavy components
- Remove unused dependencies

### Manual QA Checklist

- [ ] Hero image preloaded and identified as LCP element
- [ ] Images use `srcset` / `sizes` and AVIF/WebP where supported
- [ ] Videos lazy-load and show poster before load
- [ ] No layout shifts from image load (width/height or aspect-ratio set)
- [ ] Lighthouse score improved vs baseline
- [ ] All images have proper `alt` attributes
- [ ] Videos have proper `poster` attributes
- [ ] Preconnect hints are present for CDN domains
- [ ] Cache headers are set correctly

## Acceptance Criteria

✅ **Code compiles and passes `next build`**

✅ **New components are exported and used on at least one page**

- `OptimizedImage` used in hero section (priority) and content sections (lazy)
- `OptimizedVideo` used in hero section and demo section

✅ **Images no longer cause layout shift**

- All images have explicit `width` and `height` or `aspectRatio`
- Placeholders prevent CLS

✅ **Videos only load after entering viewport when lazy flag is enabled**

- Verified via Network tab in DevTools
- Poster shown until video loads

✅ **next.config.js includes AVIF/WebP support and image domains**

✅ **Lighthouse commands provided and documented**

✅ **Inline comments and JSDoc for public functions/components**

## Rollout Plan

### Phase 1: Testing (Current)

1. ✅ Implement components and configuration
2. ✅ Add demo section to homepage
3. ✅ Run Lighthouse tests
4. ⏳ Compare before/after metrics
5. ⏳ Fix any issues

### Phase 2: Gradual Migration

1. Replace `next/image` with `OptimizedImage` in critical paths:
   - Hero sections
   - Above-the-fold content
2. Migrate remaining images incrementally
3. Replace video elements with `OptimizedVideo`
4. Monitor performance metrics

### Phase 3: Optimization

1. Identify LCP candidates and mark with `priority`
2. Add preload hints for critical resources
3. Configure CDN integration if needed
4. Fine-tune caching headers

### Phase 4: Monitoring

1. Set up continuous Lighthouse CI
2. Monitor Core Web Vitals in production
3. Track bundle size over time
4. Document performance improvements

## Troubleshooting

### Images Not Loading

- Check `next.config.js` remote patterns
- Verify image URLs are accessible
- Check CORS headers for external images

### Videos Not Lazy Loading

- Ensure `lazy` prop is set to `true`
- Check IntersectionObserver support
- Verify video `src` is not set until in view

### Bundle Size Too Large

1. Run `npm run analyze`
2. Identify large dependencies
3. Replace with smaller alternatives
4. Use dynamic imports for heavy components

### Lighthouse Scores Not Improving

- Verify production build (`npm run build && npm run start`)
- Check Network tab for resource loading
- Ensure preload hints are present
- Verify cache headers are set

### CDN Integration

**Cloudinary**:

```tsx
<OptimizedImage
  src="https://res.cloudinary.com/your-cloud/image/upload/sample.jpg"
  cdnConfig={{
    provider: 'cloudinary',
    baseUrl: 'https://res.cloudinary.com/your-cloud/image/upload',
    params: { q: 'auto', f: 'auto' },
  }}
/>
```

**Imgix**:

```tsx
<OptimizedImage
  src="https://your-domain.imgix.net/image.jpg"
  cdnConfig={{
    provider: 'imgix',
    params: { auto: 'format,compress' },
  }}
/>
```

## Reverting Changes

To revert performance optimizations:

1. **Remove components**: Delete `components/OptimizedImage.tsx` and `components/OptimizedVideo.tsx`
2. **Restore imports**: Replace `OptimizedImage` with `next/image` and `OptimizedVideo` with standard `<video>`
3. **Revert config**: Remove image formats and headers from `next.config.js`
4. **Remove preloads**: Remove preconnect/preload hints from `_app.tsx` and page components

## Additional Resources

- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Image CDN Best Practices](https://web.dev/fast/#optimize-your-images)

---

**Last Updated**: Performance overhaul implementation
**Maintainer**: DevArchitect Team

