# Performance: Implement OptimizedImage & OptimizedVideo components, image config, HTTP hints, lazy loading, and Lighthouse test scripts

## Summary

This PR implements a comprehensive performance overhaul for the Next.js website, focusing on image and video optimization, lazy loading, HTTP hints, caching headers, and performance testing infrastructure.

## Changes

### New Components

- **`components/OptimizedImage.tsx`**: Production-ready image component with:
  - Automatic AVIF/WebP format fallbacks via `<picture>` element
  - Lazy loading with native `loading="lazy"` for non-priority images
  - Blur-up placeholders (LQIP) with inline SVG fallback
  - `fetchpriority="high"` for LCP images
  - Responsive `sizes` and aspect-ratio support
  - CDN integration support (Cloudinary, Imgix, Fastly)

- **`components/OptimizedVideo.tsx`**: Video component with:
  - IntersectionObserver-based lazy loading
  - Poster image with play overlay
  - HLS fallback support (documented, optional hls.js)
  - Autoplay with muted (browser-compliant)
  - Preload control (metadata/none)

- **`utils/useInView.ts`**: Custom IntersectionObserver hook for viewport detection

### Configuration Updates

- **`next.config.js`**:
  - Added AVIF/WebP image formats support
  - Configured image optimization settings (deviceSizes, imageSizes, minimumCacheTTL)
  - Added HTTP headers for caching:
    - Static assets: `public, max-age=31536000, immutable`
    - HTML: `public, max-age=0, must-revalidate`
  - Added bundle analyzer configuration (commented, ready to enable)

- **`pages/_app.tsx`**:
  - Added preconnect hints for critical CDNs (images.unsplash.com, fonts.googleapis.com)
  - Added DNS prefetch for external resources

- **`pages/index.tsx`**:
  - Updated `AnimatedTextHero` to use `OptimizedVideo`
  - Added preload hints for hero video and poster
  - Added demo section showcasing `OptimizedImage` and `OptimizedVideo` usage

### Testing & Scripts

- **`scripts/perf-check.sh`**: Bash script for Lighthouse CI testing (Linux/Mac)
- **`scripts/perf-check.bat`**: Batch script for Lighthouse CI testing (Windows)
- **`scripts/perf-check.js`**: Cross-platform Node.js script for Lighthouse CI testing
- **`package.json`**: Added scripts:
  - `npm run analyze`: Bundle size analysis
  - `npm run perf:check`: Run performance tests
  - `npm run perf:lighthouse`: Quick Lighthouse CI run

### Documentation

- **`README/perf.md`**: Comprehensive performance optimization guide including:
  - Component usage examples
  - Configuration details
  - Testing procedures
  - Acceptance criteria
  - Rollout plan
  - Troubleshooting guide
  - CDN integration examples

## Performance Benefits

- **LCP (Largest Contentful Paint)**: Reduced via priority image loading, preload hints, and format optimization
- **CLS (Cumulative Layout Shift)**: Prevented via explicit dimensions, aspect-ratio, and blur placeholders
- **TBT (Total Blocking Time)**: Reduced via lazy loading and code splitting
- **Bandwidth**: Reduced via AVIF/WebP formats and lazy loading
- **Perceived Performance**: Improved via blur placeholders and poster images

## Target Metrics

- LCP < 2.5s on mobile 3G emulation
- CLS < 0.1
- TBT < 150ms
- FCP < 1.8s

## Manual QA Steps

1. **Build and start production server**:
   ```bash
   npm run build
   npm run start
   ```

2. **Run Lighthouse tests**:
   ```bash
   npm run perf:check
   # or
   node scripts/perf-check.js
   ```

3. **Verify in browser**:
   - [ ] Hero image preloaded and identified as LCP element
   - [ ] Images use `srcset` / `sizes` and AVIF/WebP where supported
   - [ ] Videos lazy-load and show poster before load
   - [ ] No layout shifts from image load (width/height or aspect-ratio set)
   - [ ] Lighthouse score improved vs baseline
   - [ ] All images have proper `alt` attributes
   - [ ] Videos have proper `poster` attributes
   - [ ] Preconnect hints are present for CDN domains
   - [ ] Cache headers are set correctly

4. **Check Network tab**:
   - Priority images load immediately
   - Non-priority images lazy-load when scrolled into view
   - Videos only load when scrolled into view (if `lazy` prop is set)

## Rollout Plan

### Phase 1: Testing (Current)
- ✅ Components implemented and tested
- ✅ Demo section added to homepage
- ⏳ Run Lighthouse tests and compare metrics
- ⏳ Fix any issues

### Phase 2: Gradual Migration
1. Replace `next/image` with `OptimizedImage` in critical paths (hero sections, above-the-fold)
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

## Breaking Changes

**None** - All changes are backward compatible. Existing `next/image` and `<video>` elements continue to work.

## Dependencies

No new runtime dependencies. Optional:
- `@next/bundle-analyzer` (dev dependency, for bundle analysis)
- `@lhci/cli` (via npx, for Lighthouse CI)
- `hls.js` (optional, for HLS video support)

## Files Changed

- `components/OptimizedImage.tsx` (new)
- `components/OptimizedVideo.tsx` (new)
- `utils/useInView.ts` (new)
- `next.config.js` (updated)
- `pages/_app.tsx` (updated)
- `pages/index.tsx` (updated)
- `components/AnimatedTextHero.tsx` (updated)
- `scripts/perf-check.sh` (new)
- `scripts/perf-check.bat` (new)
- `scripts/perf-check.js` (new)
- `package.json` (updated)
- `README/perf.md` (new)

## Testing

See `README/perf.md` for detailed testing instructions and Lighthouse commands.

## Notes

- Bundle analyzer is configured but commented out. To enable, install `@next/bundle-analyzer` and uncomment the relevant lines in `next.config.js`
- HLS video support requires `hls.js` package (optional, documented in README)
- CDN integration examples provided for Cloudinary, Imgix, and Fastly
- All components include JSDoc comments and TypeScript types

---

**Why**: Improve LCP/CLS/TBT and bandwidth usage for images & videos. See `README/perf.md` for Lighthouse commands and acceptance test checklist.

