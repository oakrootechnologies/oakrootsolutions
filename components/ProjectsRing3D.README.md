# ProjectsRing3D Component

A 3D revolving carousel component for showcasing project images, inspired by clouarchitects.com. Features a full 3D ring on desktop with images arranged on a horizontal ring, images facing viewer, subtle rotateX(-4deg) tilt, continuous auto-rotate, and pointer-drag to rotate. Mobile falls back to a performant, touch-friendly horizontal carousel.

## Features

- **Desktop (≥1024px)**: Full 3D ring with CSS transforms and auto-rotation
- **Mobile (<1024px)**: Horizontal swipeable carousel with snap scrolling
- **Accessibility**: Keyboard navigation, ARIA labels, reduced motion support
- **Performance**: Optimized with `requestAnimationFrame`, lazy loading, and GPU hints
- **Interactions**: Auto-rotate, pause on hover, pointer/touch drag, keyboard controls

## Usage

```tsx
import ProjectsRing3D from '@/components/ProjectsRing3D';

const projects = [
  {
    src: '/images/project1.jpg',
    alt: 'Project 1 description',
    link: '/projects/project-1',
    title: 'Project 1',
  },
  // ... more projects
];

<ProjectsRing3D
  images={projects}
  autoRotateSpeedDegPerSec={8}  // Optional, default: 8
  initialRotation={0}            // Optional, default: 0
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `ProjectImage[]` | Required | Array of project images with id, src, alt, link, and title |
| `panelWidth` | `number` | `300` | Panel width in pixels |
| `panelRatio` | `number` | `0.72` | Panel height ratio (height = width * ratio) |
| `autoRotateDegPerSec` | `number` | `8` | Rotation speed in degrees per second |
| `initialRotationDeg` | `number` | `0` | Initial rotation angle in degrees |
| `spacingFactor` | `number` | `1.05` | Spacing multiplier for ring radius |
| `className` | `string` | `''` | Additional CSS classes |

## ProjectImage Interface

```typescript
interface ProjectImage {
  id: string;         // Unique identifier
  src: string;        // Image source URL
  srcSet?: string;    // Optional srcset for responsive images
  alt: string;        // Alt text for accessibility
  link?: string;      // Optional link to project detail page
  title?: string;     // Optional project title
}
```

## Math Behind the 3D Ring

### Panel Positioning

Each panel is positioned on a ring using the following calculations:

1. **Angle Step**: `angleStep = 360° / N` where N is the number of images
2. **Panel Angle**: `angle = i * angleStep` for each panel at index `i`
3. **Radius Formula**: `radius = (panel_width / 2) / tan(π / N) * 1.05`
   - The `1.05` multiplier adds spacing between panels
   - Example: For 12 panels with 320px width → radius ≈ 1050px

### Transform Calculation

Each panel uses this CSS transform:
```css
transform: rotateY(angle) translateZ(radius) translateX(-50%) translateY(-50%)
```

The inner element (panel-inner) uses counter-rotation:
```css
transform: rotateY(-angle)
```

The container (rotator) uses:
```css
transform: rotateX(-4deg) rotateY(containerRotation)
```

This ensures:
- Panels are evenly distributed around the ring
- Panels face the camera (outward) via counter-rotation
- Subtle tilt via rotateX(-4deg) for CLOU-style appearance
- Panels are centered on their position

### Auto-Rotation

Rotation is updated using `requestAnimationFrame`:
```javascript
rotation += speed * deltaTime
```

Where `deltaTime` is the time elapsed since the last frame in seconds.

## Responsive Behavior

### Desktop (≥1024px)
- Full 3D ring with perspective
- Auto-rotation enabled
- Pointer drag to rotate
- Keyboard navigation (arrow keys)
- Pause on hover

### Mobile (<1024px)
- Horizontal scrollable carousel
- Snap scrolling for smooth navigation
- Touch-friendly prev/next buttons
- Large tap targets (44x44px minimum)
- Lazy loading for images

## Accessibility

- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: 
  - Arrow keys to rotate ring
  - Enter to activate links
  - Escape to close expanded UI
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Focus Indicators**: Visible focus outlines on all interactive elements

## Performance Optimizations

1. **Lazy Loading**: Images beyond the first 2-3 are lazy loaded
2. **GPU Hints**: `will-change: transform` only while animating
3. **Frame Rate**: Uses `requestAnimationFrame` for smooth 60fps animation
4. **Mobile Fallback**: Simple carousel on mobile to reduce GPU load
5. **Image Optimization**: Use Next.js Image component with proper sizes

## Customization

### Adjusting Panel Size

Modify these constants in the component:
```typescript
const panelWidth = 280;  // Adjust for different panel sizes
const panelHeight = Math.round(panelWidth * 0.7);
```

### Adjusting Rotation Speed

Pass a different speed value:
```tsx
<ProjectsRing3D
  images={projects}
  autoRotateSpeedDegPerSec={12}  // Faster rotation
/>
```

### Adjusting Radius Spacing

Modify the radius multiplier:
```typescript
const radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / N) * 1.05);
// Change 1.05 to adjust spacing (larger = more space)
```

## Browser Support

- Modern browsers with CSS 3D transforms support
- Mobile browsers with touch events
- Graceful degradation for older browsers (falls back to carousel)

## Troubleshooting

### Panels not visible
- Check that `N` (number of images) is at least 3
- Verify radius calculation isn't too large for viewport
- Ensure perspective is set correctly

### Performance issues
- Reduce number of images
- Lower rotation speed
- Enable mobile fallback for low-end devices
- Check GPU acceleration is enabled

### Mobile carousel not scrolling
- Verify `scroll-snap-type` is supported
- Check that items have `scroll-snap-align: center`
- Ensure touch events are not being prevented

## Files

- `components/ProjectsRing3D.tsx` - Main component
- `styles/components/projects-ring.css` - Component styles
- `components/ProjectsRing3D.example.tsx` - Usage example

## License

Part of Oakroot Solutions codebase.

