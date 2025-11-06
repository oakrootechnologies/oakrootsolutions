# Hero Section - Design in DC Style

This document describes the hero section implementation based on [designindc.com](https://designindc.com/).

## 🎯 Overview

The hero section features a two-column responsive layout:
- **Left Column**: Content with heading, description, and call-to-action buttons
- **Right Column**: Animated scrolling grid of service cards

## 📁 Components

### 1. `HeroSection` (`components/HeroSection.tsx`)
Main container component that orchestrates the two-column layout.

**Features:**
- Two-column grid: `grid grid-cols-1 lg:grid-cols-2`
- Responsive gap: `gap-8 lg:gap-16`
- Full width with centered max-width: `max-w-7xl mx-auto`
- Vertical padding: `py-16 sm:py-20 md:py-24`
- Mobile-first: Content column appears first on mobile (`order-2 lg:order-1`)

### 2. `ContentColumn` (`components/ContentColumn.tsx`)
Left-side text content and buttons.

**Features:**
- **Heading (h1)**: 
  - Multi-line with mixed font weights
  - Text: "Elevating Brands <span>Through</span> Creative Strategy & Conversion-Focused Marketing"
  - Responsive sizing: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
  - "Through" uses `font-light` while rest is `font-bold`
  
- **Paragraph**:
  - Gray text: `text-gray-600`
  - Medium size: `text-base sm:text-lg`
  - Constrained width: `max-w-lg`
  
- **Buttons**:
  - "Book a Demo": Black background (`bg-black`)
  - "Pricing": Blue background (`bg-blue-600`)
  - Both fully rounded: `rounded-full`
  - Responsive padding: `py-3 px-6 sm:px-8`

### 3. `VisualColumn` (`components/VisualColumn.tsx`)
Right-side animated scrolling grid.

**Features:**
- Two-column grid layout: `grid grid-cols-2 gap-4`
- Fixed height: `h-[600px] sm:h-[700px] lg:h-[800px]`
- Overflow hidden to contain animation
- Mask gradient for fade effect at top/bottom
- Cards split into two columns for staggered scrolling

### 4. `ScrollingColumn` (`components/ScrollingColumn.tsx`)
Individual scrolling column with infinite scroll animation.

**Features:**
- Uses Framer Motion for animation
- Duplicates cards array 3 times for seamless loop
- Animates `y` position from `0%` to calculated percentage
- Linear, infinite animation: `duration: 25s`
- Smooth, continuous scrolling effect

### 5. `ServiceCard` (`components/ServiceCard.tsx`)
Individual service card component.

**Features:**
- Large rounded corners: `rounded-3xl`
- Aspect ratio: `aspect-[4/5]`
- Fixed height: `h-64`
- Next.js Image component with fill
- Title overlay in top-left corner
- White text with drop shadow
- Hover effect: `group-hover:scale-105`

## 🎨 Design Details

### Colors
- Background: White (`bg-white`)
- Text: Black (`text-black`)
- Heading: Mixed weights (bold + light)
- Paragraph: Gray-600 (`text-gray-600`)
- Button 1: Black (`bg-black`)
- Button 2: Blue-600 (`bg-blue-600`)

### Typography
- Heading: Responsive from `text-4xl` to `text-7xl`
- Paragraph: `text-base sm:text-lg`
- Button text: `text-sm sm:text-base`
- Card titles: `text-sm sm:text-base md:text-lg`

### Spacing
- Section padding: `py-16 sm:py-20 md:py-24`
- Column gap: `gap-8 lg:gap-16`
- Grid gap: `gap-4`
- Button gap: `gap-4`

## 📱 Mobile-First Responsive Design

### Breakpoints
- **Mobile** (`< lg`): Single column layout
- **Desktop** (`≥ lg`): Two-column layout

### Mobile Behavior
- Content column appears first (below visual column)
- Heading scales down: `text-4xl`
- Buttons stack or wrap with flex-wrap
- Visual column maintains aspect ratio

### Desktop Behavior
- Two-column side-by-side layout
- Content column on left, visual on right
- Larger typography and spacing
- Full visual effect of scrolling cards

## 🎬 Animation Details

### Infinite Scroll
- **Library**: Framer Motion
- **Animation**: Vertical translation (`y` property)
- **Duration**: 25 seconds per cycle
- **Easing**: Linear (continuous)
- **Repeat**: Infinite
- **Technique**: Duplicated cards array creates seamless loop

### Mask Effect
- Gradient mask at top and bottom
- Fade from transparent (0%) → black (15%)
- Solid black from 15% to 85%
- Fade from black (85%) → transparent (100%)
- Creates smooth entry/exit effect

## 🖼️ Image Handling

- Uses Next.js Image component
- Optimized loading with `fill` prop
- Responsive sizes: `(max-width: 768px) 50vw, 25vw`
- External images from Unsplash (configured in `next.config.js`)
- Unoptimized for external URLs (for faster dev)

## 🔧 Configuration

### Next.js Config
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

## 📊 Mock Data

Current service cards:
1. App Development
2. Graphic Design
3. Video & Photo
4. Marketing Strategy
5. Web Design
6. Digital Marketing

## ✅ Features Implemented

- [x] Two-column responsive layout
- [x] Multi-line heading with mixed font weights
- [x] Descriptive paragraph
- [x] Two CTA buttons
- [x] Animated scrolling grid
- [x] Two-column card layout
- [x] Infinite scroll animation
- [x] Fade mask effect
- [x] Service cards with images
- [x] Title overlays on cards
- [x] Mobile-first responsive design
- [x] Hover effects on cards

## 🚀 Usage

```tsx
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
    </div>
  );
}
```

## 📝 Customization

### Change Service Cards
Edit `components/VisualColumn.tsx`:
```tsx
const mockServiceCards = [
  {
    id: '1',
    title: 'Your Service',
    imageUrl: 'https://your-image-url.com/image.jpg',
  },
  // Add more cards...
];
```

### Adjust Animation Speed
Edit `components/ScrollingColumn.tsx`:
```tsx
transition={{
  duration: 25, // Change this value (lower = faster)
  ease: 'linear',
}}
```

### Customize Colors
Edit `components/ContentColumn.tsx`:
```tsx
// Button 1
className="bg-black" // Change to your color

// Button 2
className="bg-blue-600" // Change to your color
```

## 🎯 Reference

Based on: [designindc.com](https://designindc.com/)

---

**Status**: ✅ Complete and working
**Build**: ✅ Successful
**Mobile-First**: ✅ Yes
**Animations**: ✅ Framer Motion

