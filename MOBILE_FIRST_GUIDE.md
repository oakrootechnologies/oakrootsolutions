# Mobile-First Responsive Design Guide

This document outlines the mobile-first responsive design patterns used throughout the Oakroot website.

## 🎯 Mobile-First Philosophy

**Mobile-First** means we design and code for mobile devices first, then enhance for larger screens. This approach:
- ✅ Improves performance on mobile devices
- ✅ Ensures content is accessible on all screen sizes
- ✅ Reduces code complexity
- ✅ Better user experience on mobile

## 📐 Responsive Breakpoints

Using Tailwind CSS default breakpoints:

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default (mobile) | < 640px | Base styles, no prefix |
| `sm:` | ≥ 640px | Small tablets |
| `md:` | ≥ 768px | Tablets, small desktops |
| `lg:` | ≥ 1024px | Desktops |
| `xl:` | ≥ 1280px | Large desktops |

## 🔍 Component-by-Component Analysis

### 1. Navbar Component

**Mobile (< md):**
- ✅ Logo visible (small size)
- ✅ Navigation links **hidden**
- ✅ Contact/Language links **hidden**
- ✅ "Navigation" button **always visible** (right side)
- ✅ Padding: `px-4 py-4` (mobile-optimized)
- ✅ Text size: `text-base` (mobile-friendly)

**Desktop (≥ md):**
- ✅ Logo larger: `md:text-xl`
- ✅ Navigation links **visible** in center
- ✅ Contact/Language links **visible** on right
- ✅ "Navigation" button **hidden**
- ✅ Padding: `md:px-8 md:py-6` (more spacious)
- ✅ Text size: `md:text-base` (readable)

**Scroll Behavior:**
- ✅ Background transitions from transparent to white
- ✅ Text color transitions from white to black
- ✅ Border appears on scroll
- ✅ All animations are smooth and performant

### 2. MobileMenu Component

**Mobile (< md):**
- ✅ Single column layout: `grid-cols-1`
- ✅ Large touch targets
- ✅ Typography scales: `text-2xl sm:text-3xl`
- ✅ Padding: `px-4 py-6`
- ✅ Full-screen overlay

**Desktop (≥ md):**
- ✅ Two-column layout: `md:grid-cols-2`
- ✅ Larger typography: `md:text-4xl lg:text-5xl`
- ✅ More spacing: `md:gap-16`
- ✅ Enhanced padding: `md:pt-16`

### 3. Home Page (index.tsx)

**Mobile (< sm):**
- ✅ Single column grid: `grid-cols-1`
- ✅ Compact spacing: `gap-4`
- ✅ Small typography: `text-4xl`
- ✅ Padding: `px-4`
- ✅ Padding top: `pt-16` (account for fixed navbar)

**Tablet (≥ sm, < lg):**
- ✅ Two-column grid: `sm:grid-cols-2`
- ✅ Medium spacing: `sm:gap-6`
- ✅ Medium typography: `sm:text-5xl`
- ✅ Medium padding: `sm:px-6`

**Desktop (≥ lg):**
- ✅ Three-column grid: `lg:grid-cols-3`
- ✅ Large spacing: `md:gap-8`
- ✅ Large typography: `lg:text-7xl`
- ✅ Large padding: `lg:px-8`

## 📏 Typography Scale (Mobile-First)

All typography starts small (mobile) and scales up:

```tsx
// Example: Hero Heading
text-4xl          // Mobile: 36px
sm:text-5xl       // Small: 48px
md:text-6xl       // Medium: 60px
lg:text-7xl       // Large: 72px
```

## 🎨 Spacing Scale (Mobile-First)

All spacing starts compact (mobile) and increases:

```tsx
// Example: Container Padding
px-4             // Mobile: 16px
sm:px-6          // Small: 24px
lg:px-8          // Large: 32px

// Example: Section Padding
py-12            // Mobile: 48px
sm:py-16         // Small: 64px
md:py-20         // Medium: 80px
lg:py-24         // Large: 96px
```

## 📱 Navigation Strategy

**Mobile:**
- Hamburger-style "Navigation" button
- Full-screen overlay menu
- Large touch targets (min 44x44px)
- Easy to close with X button

**Desktop:**
- Horizontal navigation links
- Hover effects
- No mobile menu needed
- Clean, professional layout

## ✅ Mobile-First Checklist

### Navbar
- [x] Mobile menu trigger always visible
- [x] Desktop nav links hidden on mobile
- [x] Responsive padding (compact → spacious)
- [x] Responsive typography (small → large)
- [x] Scroll-based animations work on all devices

### MobileMenu
- [x] Single column on mobile
- [x] Two columns on desktop
- [x] Large touch targets
- [x] Responsive typography
- [x] Smooth animations

### Layout
- [x] Content accounts for fixed navbar
- [x] Proper spacing on all screen sizes
- [x] No horizontal scrolling
- [x] Touch-friendly interactions

### General
- [x] All text readable on mobile (min 16px)
- [x] All touch targets ≥ 44x44px
- [x] No horizontal scrolling
- [x] Images scale appropriately
- [x] Forms are mobile-friendly

## 🧪 Testing Mobile-First Design

1. **Viewport Testing:**
   - Open DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test at: 320px, 375px, 414px, 768px, 1024px, 1280px

2. **Responsive Testing:**
   - Resize browser window
   - Check breakpoints transition smoothly
   - Verify no layout breaks

3. **Touch Testing:**
   - Test on actual mobile device
   - Verify touch targets are large enough
   - Check scrolling is smooth

## 📊 Performance Considerations

**Mobile-First Benefits:**
- ✅ Smaller CSS bundle (mobile styles loaded first)
- ✅ Faster initial render (less code for mobile)
- ✅ Progressive enhancement (desktop adds, not replaces)
- ✅ Better Core Web Vitals scores

## 🔧 Customization Tips

### Adding New Responsive Styles

Always start with mobile, then enhance:

```tsx
// ✅ Good: Mobile-first
className="text-base sm:text-lg md:text-xl lg:text-2xl"

// ❌ Bad: Desktop-first
className="text-2xl lg:text-xl md:text-lg sm:text-base"
```

### Responsive Images

```tsx
<img
  src="/image-mobile.jpg"
  srcSet="/image-mobile.jpg 640w, /image-tablet.jpg 768w, /image-desktop.jpg 1024w"
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
  alt="Responsive image"
/>
```

### Conditional Rendering

```tsx
{/* Mobile-only */}
<div className="md:hidden">Mobile Content</div>

{/* Desktop-only */}
<div className="hidden md:block">Desktop Content</div>
```

## 🎓 Best Practices

1. **Always start with mobile styles** (no prefix)
2. **Use Tailwind breakpoints** (`sm:`, `md:`, `lg:`, `xl:`)
3. **Test on real devices** when possible
4. **Keep touch targets large** (≥ 44x44px)
5. **Ensure readable text** (≥ 16px on mobile)
6. **Avoid fixed widths** (use max-width instead)
7. **Use relative units** (rem, em, %) when possible
8. **Test at all breakpoints** before deploying

