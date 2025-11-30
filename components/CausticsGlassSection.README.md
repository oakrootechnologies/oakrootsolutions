# Caustics Glass Scene Component

A 3D still life scene featuring realistic glass rendering with runtime caustics and soft shadows, based on the pmndrs/drei caustics example.

## Features

- **Runtime Caustics**: Real-time caustic light patterns from glass refraction
- **Soft Shadows**: Accumulative shadows for realistic lighting
- **Glass Material**: MeshTransmissionMaterial for realistic glass rendering
- **Performance Monitoring**: Automatically degrades quality on low-end devices
- **Interactive Camera**: Camera follows mouse pointer for dynamic viewing
- **Animated Environment**: Lightformers create a dynamic lighting environment

## Setup Requirements

### 1. GLB Model File

You need to place the `glass-transformed.glb` model file in the `public` folder. This model contains:
- Glass cup
- Cake slice
- Straws
- Fork
- Dried flowers

**To get the model:**
- Download from the original CodeSandbox: https://szj6p7.csb.app/
- Or use the original model from the pmndrs/drei examples
- The model should be named `glass-transformed.glb` and placed in `/public/glass-transformed.glb`

### 2. Dependencies

All required dependencies are already installed:
- `@react-three/fiber`
- `@react-three/drei`
- `maath` (for easing)
- `three`

## Usage

```tsx
import CausticsGlassSection from '@/components/CausticsGlassSection';

<CausticsGlassSection />
```

## Component Structure

- **CausticsGlassSection**: Main wrapper component
- **CausticsGlassScene**: 3D scene with Canvas setup
- **CausticsOverlay**: Text overlay with "PMNDRS" letters and documentation link
- **Scene**: 3D model rendering with caustics
- **Env**: Animated environment with lightformers

## Performance

The component includes:
- **PerformanceMonitor**: Automatically detects performance issues
- **Dynamic Quality**: Reduces DPR and environment frames on low-end devices
- **Optimized Rendering**: Uses accumulative shadows and efficient lighting

## Customization

You can customize:
- Camera position: `camera={{ position: [20, 0.9, 20], fov: 26 }}`
- Caustics settings: Color, intensity, IOR, etc.
- Environment preset: Change from "city" to other presets
- Background color: Currently `#f0f0f0`

## Notes

- The component requires WebGL support
- SSR is disabled (uses dynamic import)
- The overlay text can be customized in `CausticsOverlay.tsx`
- The scene will show a loading state if the GLB model is not found

## Credits

Based on the pmndrs/drei caustics example:
- Original example: https://szj6p7.csb.app/
- Documentation: https://github.com/pmndrs/drei#caustics

3D Models:
- Fruit Cake Slice by matousekfoto
- Cute milkshake by Felix Yadomi
- Dry flower by Second Studio
- Ikea - Pokal Glass Cups by CDcruz

