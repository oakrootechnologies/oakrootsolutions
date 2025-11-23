# CylinderPosters Component

A seamless cylindrical band of poster panels with edge-to-edge alignment, inspired by CLOU Architects. Features a full 3D cylinder band on desktop and a touch-friendly horizontal carousel on mobile.

## Features

- **Desktop (≥1024px)**: Seamless cylindrical band with CSS 3D transforms, edge-to-edge alignment
- **Mobile (<1024px)**: Horizontal swipeable carousel with snap scrolling
- **Seam Alignment**: Chord-based radius formula ensures panels align edge-to-edge with no visible gaps
- **Visual Bend**: Subtle per-panel bend for smooth cylindrical appearance
- **Accessibility**: Keyboard navigation, ARIA labels, reduced motion support
- **Performance**: Optimized with `requestAnimationFrame`, lazy loading, and GPU hints

## Usage

```tsx
import CylinderPosters from '@/components/CylinderPosters';

const posters = [
  {
    id: '1',
    src: '/images/poster1.jpg',
    alt: 'Poster 1 description',
    link: '/projects/project-1',
  },
  // ... more posters (will be replicated to reach numPanels)
];

<CylinderPosters
  images={posters}
  numPanels={20}
  panelWidthPx={320}
  panelRatio={0.75}
  autoRotateDegPerSec={8}
  spacingFactor={0.995}
  maxBendDeg={6}
  initialRotationDeg={0}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `PosterImage[]` | Required | Array of poster images (will be replicated to reach numPanels) |
| `numPanels` | `number` | `20` | Number of panels in the cylinder |
| `panelWidthPx` | `number` | `320` | Panel width in pixels |
| `panelRatio` | `number` | `0.75` | Panel height ratio (4:3 = 0.75) |
| `autoRotateDegPerSec` | `number` | `8` | Rotation speed in degrees per second |
| `spacingFactor` | `number` | `0.995` | Spacing multiplier for seam removal |
| `maxBendDeg` | `number` | `6` | Maximum visual bend per panel in degrees |
| `initialRotationDeg` | `number` | `0` | Initial rotation angle in degrees |
| `className` | `string` | `''` | Additional CSS classes |

## PosterImage Interface

```typescript
interface PosterImage {
  id: string;         // Unique identifier
  src: string;        // Image source URL
  srcSet?: string;    // Optional srcset for responsive images
  alt: string;        // Alt text for accessibility
  link?: string;      // Optional link to project detail page
}
```

## Math Behind the Cylindrical Band

### Seam-Aligned Radius Calculation

The component uses a **chord-based formula** to ensure edge-to-edge alignment:

1. **Central Angle**: `theta = 2π / N` where N is the number of panels
2. **Chord-Based Radius**: `r = W / (2 * sin(π / N))`
   - W = panel width in pixels
   - This ensures panels align edge-to-edge around the circumference
3. **Spacing Adjustment**: `r = Math.round(r * spacingFactor)`
   - `spacingFactor` (default 0.995) removes any sub-pixel seams
   - Rounded to integer pixels to avoid rendering artifacts

### Example Calculation

For 20 panels of 320px width:
```
N = 20
W = 320px
theta = 2π / 20 = 0.314 radians
r = 320 / (2 * sin(π/20)) ≈ 1023px
r_final = Math.round(1023 * 0.995) ≈ 1018px
```

### Transform Calculation

Each panel uses this CSS transform:
```css
transform: rotateY(angle) translateZ(radius) translateX(-50%) translateY(-50%)
```

The inner element (panel-inner) uses counter-rotation and bend:
```css
transform: rotateY(-angle) rotateX(bendDeg)
```

Where `bendDeg = maxBendDeg * cos(2π*i/N)` creates a smooth cylindrical curve.

The container (rotator) uses:
```css
transform: rotateX(-4deg) rotateY(containerRotation)
```

This ensures:
- Panels are evenly distributed around the cylinder
- Panels face the camera (outward) via counter-rotation
- Subtle tilt via rotateX(-4deg) for CLOU-style appearance
- Smooth cylindrical bend via per-panel rotateX variation
- Edge-to-edge alignment with no visible seams

## Responsive Behavior

### Desktop (≥1024px)
- Full 3D cylindrical band with perspective
- Auto-rotation enabled
- Pointer drag to rotate
- Keyboard navigation (arrow keys)
- Pause on hover

### Mobile (<1024px)
- Horizontal scrollable carousel
- Snap scrolling for smooth navigation
- Touch-friendly swipe gestures
- Large tap targets (80% viewport width)
- Lazy loading for images

## Accessibility

- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: 
  - Arrow keys to rotate cylinder
  - Enter to activate links
  - Escape to close expanded UI
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Focus Indicators**: Visible focus outlines on all interactive elements

## Performance Optimizations

1. **Lazy Loading**: Images beyond the first 6 are lazy loaded
2. **GPU Hints**: `will-change: transform` only while animating
3. **Frame Rate**: Uses `requestAnimationFrame` for smooth 60fps animation
4. **Mobile Fallback**: Simple carousel on mobile to reduce GPU load
5. **Image Optimization**: Use Next.js Image component with proper sizes
6. **Visibility Handling**: Pauses rotation when tab is hidden

## Customization

### Adjusting Panel Count

```tsx
<CylinderPosters
  images={posters}
  numPanels={30}  // More panels = tighter curve
/>
```

### Adjusting Seam Alignment

If you notice seams, adjust `spacingFactor`:
```tsx
<CylinderPosters
  images={posters}
  spacingFactor={0.99}  // Tighter (smaller value)
  // or
  spacingFactor={0.998}  // Looser (larger value)
/>
```

### Adjusting Visual Bend

```tsx
<CylinderPosters
  images={posters}
  maxBendDeg={10}  // More pronounced curve
  // or
  maxBendDeg={3}   // Subtle curve
/>
```

## Browser Support

- Modern browsers with CSS 3D transforms support
- Mobile browsers with touch events
- Graceful degradation for older browsers (falls back to carousel)

## Troubleshooting

### Visible Seams Between Panels
- Reduce `spacingFactor` (try 0.99 or 0.98)
- Ensure panel width is consistent
- Check that radius calculation is using integer pixels

### Performance Issues
- Reduce number of panels (recommended max: 36)
- Lower rotation speed
- Enable mobile fallback for low-end devices
- Check GPU acceleration is enabled

### Mobile Carousel Not Scrolling
- Verify `scroll-snap-type` is supported
- Check that items have `scroll-snap-align: center`
- Ensure touch events are not being prevented

## Files

- `components/CylinderPosters.tsx` - Main component
- `styles/components/cylinder-posters.css` - Component styles
- `utils/computeCylinderRadius.ts` - Radius calculation utility
- `stories/CylinderPosters.stories.tsx` - Storybook stories
- `tests/computeCylinderRadius.test.ts` - Unit tests

## License

Part of Oakroot Solutions codebase.





