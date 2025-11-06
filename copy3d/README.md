# 3D Ring Component - Copy

This folder contains a copy of the 3D rotating ring component from clouarchitects.com.

## Components

### RotatingRing.tsx
The main 3D ring component that creates a single, continuous ring of images.
- Features tangential image facing
- Landscape orientation (wider than tall)
- Smooth continuous rotation
- Subtle bowl/saddle effect with dynamic Y offset

### ProjectRingCanvas.tsx
The React Three Fiber canvas wrapper that sets up the 3D scene.
- Handles WebGL detection
- Sets up camera, lighting, and controls
- Manages the RotatingRing component

### ProjectRingSection.tsx
The main section wrapper with two-column layout.
- Left column: Text content
- Right column: 3D canvas

## Usage

```tsx
import ProjectRingSection from './copy3d/ProjectRingSection';

export default function Page() {
  return <ProjectRingSection />;
}
```

## Features

- ✅ Single continuous ring
- ✅ Tangential image facing (all images face viewer)
- ✅ Landscape aspect ratio (wider than tall)
- ✅ No broken or diagonal-facing images
- ✅ Geostationary rotation (only ring rotates, not individual images)
- ✅ Bowl/saddle effect with dynamic Y offset
- ✅ Smooth continuous animation

## Props

### RotatingRing
- `imageUrls`: Array of image URL strings
- `radius`: Number - radius of the ring
- `imageScale`: [number, number] - scale of each image (width, height)
- `rotationSpeed`: Number - speed of rotation

### ProjectRingCanvas
No props - configures itself with mock data

### ProjectRingSection
No props - includes text content

