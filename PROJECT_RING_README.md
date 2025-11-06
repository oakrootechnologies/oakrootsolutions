# Project Ring Section - 3D Curved Image Gallery

This document describes the 3D project ring section implementation based on [clouarchitects.com](https://www.clouarchitects.com/).

## 🎯 Overview

The Project Ring Section features a two-column layout:
- **Left Column**: Text content with mission statement and description
- **Right Column**: 3D canvas with a circular ring of project images that continuously rotates

## 📁 Components

### 1. `ProjectRingSection` (`components/ProjectRingSection.tsx`)
Main wrapper component with two-column layout.

**Features:**
- Full-height section: `h-screen`
- Two-column grid: `grid-cols-1 lg:grid-cols-2`
- White background: `bg-white`
- Responsive padding: `p-8 lg:p-16`
- Text content on left, 3D canvas on right

### 2. `ProjectRingCanvas` (`components/ProjectRingCanvas.tsx`)
React Three Fiber Canvas setup.

**Features:**
- Canvas configuration:
  - Field of view: `fov: 60`
  - Camera position: `[0, 0, 10]`
  - Antialiasing enabled
  - Alpha channel for transparency
- Lighting setup:
  - Ambient light: `intensity={1.5}`
  - Directional light: `position={[0, 10, 5]}, intensity={1}`
- Renders the Ring component

### 3. `Ring` (`components/Ring.tsx`)
The 3D ring container with auto-rotation animation.

**Features:**
- Uses `useRef` to reference the group element
- Auto-rotation using `useFrame` hook
- Rotation speed: `delta * 0.1` (slow, continuous spin)
- Contains 14 project images in a circular arrangement
- Maps over `projectImages` array to render `ImagePlane` components

### 4. `ImagePlane` (`components/ImagePlane.tsx`)
Individual image plane component positioned on the ring.

**Features:**
- Circular positioning calculation:
  - Radius: `8` units
  - Angle calculation: `index * (Math.PI * 2 / count)`
  - Position: `[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]`
- Rotation to face center:
  - Y-axis rotation: `-angle`
- Uses Drei's `Image` component for efficient image loading
- Scale: `[3, 4]` (width 3, height 4 units)

## 🎨 Design Details

### Layout
- **Section**: Full viewport height (`h-screen`)
- **Text Column**: 
  - Top text: Mission statement
  - Bottom text: Description
  - Vertical spacing: `justify-between`
- **Canvas Column**: Full width and height for 3D scene

### Typography
- **Top Text**: `text-2xl lg:text-3xl font-medium`
- **Bottom Text**: `text-lg`
- Both have `max-w-md` for readability

### Colors
- Background: White (`bg-white`)
- Text: Black (`text-black`)

## 🎬 3D Animation

### Auto-Rotation
- **Speed**: `delta * 0.1` (slow, continuous)
- **Axis**: Y-axis (vertical rotation)
- **Type**: Continuous, infinite loop
- **Smoothness**: Frame-rate independent (uses delta time)

### Camera Setup
- **Position**: `[0, 0, 10]` (looking at ring from distance)
- **Field of View**: 60 degrees
- **View**: Looks down Z-axis at the ring

### Image Arrangement
- **Circle Radius**: 8 units
- **Image Count**: 14 images
- **Image Scale**: 3x4 units (portrait orientation)
- **Rotation**: Each image faces the center of the circle

## 📊 Image Data

The component includes 14 mock project images from Unsplash:
1. Modern architecture exteriors
2. Interior spaces
3. Architectural models
4. Design details

All images are loaded from Unsplash with appropriate dimensions (800x600).

## 🔧 Technical Details

### Dependencies
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for R3F (Image component)
- **three**: Core Three.js library

### Performance
- Images are loaded efficiently using Drei's `Image` component
- Frame-rate independent animation using `delta` time
- Canvas uses antialiasing for smooth visuals
- Alpha channel enabled for transparency

### Responsive Design
- Single column on mobile (`grid-cols-1`)
- Two columns on desktop (`lg:grid-cols-2`)
- Text scales responsively
- Canvas maintains aspect ratio

## ✅ Features Implemented

- [x] Two-column responsive layout
- [x] Text content with mission statement
- [x] 3D canvas with React Three Fiber
- [x] Circular ring of images
- [x] Auto-rotation animation
- [x] Proper lighting setup
- [x] 14 project images
- [x] Images facing center
- [x] Smooth, continuous rotation
- [x] Mobile-first responsive design

## 🚀 Usage

```tsx
import ProjectRingSection from '@/components/ProjectRingSection';

export default function Home() {
  return (
    <div>
      <ProjectRingSection />
    </div>
  );
}
```

## 📝 Customization

### Change Rotation Speed
Edit `components/Ring.tsx`:
```tsx
groupRef.current.rotation.y += delta * 0.1; // Change 0.1 to adjust speed
```

### Change Ring Size
Edit `components/ImagePlane.tsx`:
```tsx
const radius = 8; // Change this value to make ring larger/smaller
```

### Change Image Scale
Edit `components/ImagePlane.tsx`:
```tsx
scale={[3, 4]} // Change [3, 4] to adjust image size
```

### Add More Images
Edit `components/Ring.tsx`:
```tsx
const projectImages = [
  { id: '15', url: 'your-image-url' },
  // Add more images...
];
```

### Adjust Camera Position
Edit `components/ProjectRingCanvas.tsx`:
```tsx
camera={{
  fov: 60,
  position: [0, 0, 10], // Change position to adjust view
}}
```

## 🎯 Reference

Based on: [clouarchitects.com](https://www.clouarchitects.com/)

---

**Status**: ✅ Complete and working
**Build**: ✅ Successful
**3D Rendering**: ✅ React Three Fiber
**Animation**: ✅ Auto-rotation working
**Mobile-First**: ✅ Yes

