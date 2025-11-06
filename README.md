# Oakroot Website - Next.js with Mobile-First Design

A modern, mobile-first responsive website built with Next.js, Tailwind CSS, and Framer Motion, inspired by [clouarchitects.com](https://www.clouarchitects.com/).

## 🚀 Tech Stack

- **Next.js 14** - React framework with SSR/SSG
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework (mobile-first)
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics (ready for integration)
- **GSAP** - Animation library (ready for integration)

## ✨ Features

### Navbar Component
- ✅ Fixed position with scroll-based state tracking
- ✅ Smooth background transition (transparent → white) on scroll
- ✅ Text color animation (white → black) synchronized with background
- ✅ Animated bottom border (transparent → gray)
- ✅ Desktop navigation links with hover effects
- ✅ Language switcher (En / 中文)
- ✅ Mobile menu trigger button
- ✅ **Fully mobile-first responsive** design

### MobileMenu Component
- ✅ Full-screen overlay animation
- ✅ Two-column grid layout (desktop) / single column (mobile)
- ✅ Navigation links with large, bold typography
- ✅ Social media links section
- ✅ Language switcher
- ✅ Smooth enter/exit animations with Framer Motion
- ✅ **Mobile-first responsive** typography and spacing

### Layout Component
- ✅ Integrates Navbar and MobileMenu
- ✅ Shared state management for mobile menu
- ✅ Proper component composition

## 📱 Mobile-First Responsive Design

All components are built with a **mobile-first approach**:

- **Base styles** target mobile devices (default)
- **Breakpoints** use Tailwind's `sm:`, `md:`, `lg:`, `xl:` prefixes
- **Typography scales** from small (mobile) to large (desktop)
- **Spacing** uses responsive padding/margins
- **Grid layouts** adapt from 1 column (mobile) to multi-column (desktop)
- **Navigation** hides desktop links on mobile, shows mobile menu trigger

### Breakpoint Strategy:
- **Mobile**: Base styles (no prefix) - `< 640px`
- **Small**: `sm:` - `≥ 640px`
- **Medium**: `md:` - `≥ 768px`
- **Large**: `lg:` - `≥ 1024px`
- **XL**: `xl:` - `≥ 1280px`

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
oakroot/
├── components/
│   ├── Navbar.tsx         # Main navigation bar with scroll animations
│   ├── MobileMenu.tsx     # Full-screen mobile menu overlay
│   └── Layout.tsx         # Layout wrapper component
├── pages/
│   ├── _app.tsx           # Next.js app entry point
│   └── index.tsx          # Home page
├── styles/
│   └── globals.css        # Global styles with Tailwind
├── public/                # Static assets
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Component Usage

### Using the Layout Component

The `Layout` component automatically wraps your pages with the Navbar and MobileMenu:

```tsx
// pages/_app.tsx
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### Navbar Features

- **Scroll Detection**: Automatically detects scroll position > 10px
- **Background Animation**: Transitions from transparent to white
- **Text Color Animation**: Text changes from white to black on scroll
- **Border Animation**: Bottom border appears on scroll
- **Responsive**: Desktop nav links hidden on mobile, mobile menu trigger always visible

### MobileMenu Features

- **Full-Screen Overlay**: Covers entire viewport
- **Smooth Animations**: Slides down from top with fade effect
- **Two-Column Layout**: On desktop (md+), single column on mobile
- **Large Typography**: Bold, large text optimized for touch
- **Easy Navigation**: All links close menu on click

## 🎯 Mobile-First Responsive Patterns

### Example: Responsive Typography
```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
  Responsive Heading
</h1>
```

### Example: Responsive Spacing
```tsx
<div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
  Responsive Padding
</div>
```

### Example: Responsive Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  Grid Items
</div>
```

### Example: Responsive Visibility
```tsx
{/* Hidden on mobile, visible from md */}
<div className="hidden md:flex">
  Desktop Only Content
</div>
```

## 🔧 Customization

### Change Navbar Colors
Edit `components/Navbar.tsx`:
```tsx
animate={{
  backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0)',
  color: isScrolled ? '#000000' : '#ffffff',
}}
```

### Add More Navigation Links
Edit `components/Navbar.tsx` and `components/MobileMenu.tsx`:
```tsx
<Link href="/new-page">New Page</Link>
```

### Customize Mobile Menu
Edit `components/MobileMenu.tsx`:
- Modify `navLinks` array for navigation items
- Modify `socialLinks` array for social media links
- Adjust animation timing in `transition` props

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- **Mobile-First**: All styles start from mobile and scale up
- **Tailwind CSS**: Uses utility classes for rapid development
- **Framer Motion**: Provides smooth, performant animations
- **TypeScript**: Full type safety throughout the project
- **Next.js**: Server-side rendering and static generation support

## 🔗 Reference Websites

- [clouarchitects.com](https://www.clouarchitects.com/) - Design inspiration
- [designindc.com](https://designindc.com/) - Layout inspiration

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
