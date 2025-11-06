# Component Specifications

This document outlines the exact implementation of the Navbar and MobileMenu components based on the requirements.

## ✅ Navbar Component (`components/Navbar.tsx`)

### State Management
- ✅ **isScrolled**: Boolean state using `useState` and `useEffect`
  - Tracks if `window.scrollY > 10`
  - Controls component styling

- ✅ **isMobileMenuOpen**: Received as prop from Layout component
  - Controls mobile menu visibility
  - Toggled by "Navigation" button

### Animations (Framer Motion)
- ✅ **backgroundTransition**: 
  - Navbar background: `transparent` when `isScrolled = false`
  - Navbar background: `white` when `isScrolled = true`
  - Uses `motion.nav` with `animate` prop
  - Smooth transition: `duration: 0.3, ease: 'easeInOut'`

- ✅ **textTransition**:
  - Text color: `white` when `isScrolled = false`
  - Text color: `black` when `isScrolled = true`
  - Applied to logo and all navigation links
  - Synchronized with background transition

### Layout
- ✅ **desktopNav**:
  - Flex container with `justify-between` and `items-center`
  - `z-index: 50`
  - Responsive padding: `px-4 sm:px-6 lg:px-8`
  - Responsive padding: `py-4 sm:py-6`

### Elements
- ✅ **Logo**:
  - Far left position
  - Next.js `<Link>` component linking to `/`
  - Text: "CLOU"
  - Font: bold
  - Responsive size: `text-base sm:text-lg md:text-xl`

- ✅ **NavLinks (Desktop)**:
  - Center-left position
  - Hidden on `md` screens and below (`hidden md:flex`)
  - Links: Projects, Info, News, Awards, Team, Careers
  - Next.js `<Link>` components
  - Subtle underline hover effect

- ✅ **RightLinks (Desktop)**:
  - Far right position
  - Hidden on `md` screens and below (`hidden md:flex`)
  - Contains "Contact" link
  - Language switcher: "En / 中文"

- ✅ **MobileMenuTrigger**:
  - Always visible on far right (`md:hidden`)
  - Button with text "Navigation"
  - Toggles `isMobileMenuOpen` state

- ✅ **BottomBorder**:
  - Full-width `border-b`
  - `border-transparent` when `isScrolled = false`
  - `border-gray-200` when `isScrolled = true`
  - Animated with Framer Motion

## ✅ MobileMenu Component (`components/MobileMenu.tsx`)

### Props
- ✅ **isOpen**: Boolean prop controlling visibility
- ✅ **onClose**: Function prop to close menu

### Animations (Framer Motion)
- ✅ **OverlayAnimation**:
  - Covers entire screen: `h-screen w-screen`
  - Animated from `opacity: 0` to `opacity: 1`
  - Animated from `y: -100%` to `y: 0`
  - White background, black text
  - High `z-index: 40`
  - Uses `AnimatePresence` for enter/exit animations

### Elements
- ✅ **CloseButton**:
  - Top-right corner
  - "×" symbol (text-2xl sm:text-3xl)
  - Sets `isMobileMenuOpen` to false on click

- ✅ **MenuContent**:
  - Two-column grid on `md` screens: `grid-cols-1 md:grid-cols-2`
  - Single column on small screens
  - Significant top padding: `pt-8 sm:pt-12 md:pt-16`

- ✅ **ColumnOne (Nav Links)**:
  - Contains large, bold links
  - Links: Projects, Info, Contact, News, Awards, Team, Careers
  - Typography: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
  - Font: bold

- ✅ **ColumnTwo (Social)**:
  - Contains social media links: Instagram, WeChat, LinkedIn
  - Language switcher: "En / 中文"
  - Typography: `text-xl sm:text-2xl md:text-3xl`
  - Font: bold

## ✅ Layout Component (`components/Layout.tsx`)

### Integration
- ✅ Imports and uses `<Navbar />` and `<MobileMenu />` components
- ✅ Manages `isMobileMenuOpen` state using `useState`
- ✅ Passes state and setter to Navbar as props
- ✅ Passes state and close function to MobileMenu as props
- ✅ Wraps children in `<main>` element

### Usage
- ✅ Integrated in `pages/_app.tsx`
- ✅ Wraps all page components automatically

## 📱 Mobile-First Responsive Features

### Navbar Responsiveness
- ✅ Mobile: Logo + Navigation button only
- ✅ Tablet/Desktop: Full navigation with all links
- ✅ All spacing scales: `px-4 sm:px-6 lg:px-8`
- ✅ Typography scales: `text-base sm:text-lg md:text-xl`

### MobileMenu Responsiveness
- ✅ Mobile: Single column layout
- ✅ Desktop: Two-column grid layout
- ✅ Typography scales from `text-2xl` to `text-5xl`
- ✅ Spacing adapts: `gap-8 sm:gap-12 md:gap-16`

### Breakpoints Used
- `sm:` - ≥ 640px (small tablets)
- `md:` - ≥ 768px (tablets, show desktop nav)
- `lg:` - ≥ 1024px (desktops, larger spacing)
- `xl:` - ≥ 1280px (large desktops)

## 🎨 Styling Details

### Colors
- Background (not scrolled): Transparent
- Background (scrolled): White (`rgba(255, 255, 255, 0.98)`)
- Text (not scrolled): White (`#ffffff`)
- Text (scrolled): Black (`#000000`)
- Border (scrolled): Gray (`rgba(229, 231, 235, 1)`)

### Typography
- Font family: System font stack (sans-serif)
- Logo: Bold
- Nav links: Regular weight
- Mobile menu links: Bold, extra large

### Animations
- Duration: 0.3s (background/text transitions)
- Duration: 0.4s (mobile menu slide)
- Easing: `easeInOut`

## ✅ All Requirements Met

- [x] Fixed navbar position
- [x] Scroll-based state tracking
- [x] Background transition animation
- [x] Text color transition animation
- [x] Bottom border animation
- [x] Desktop navigation links
- [x] Mobile menu trigger
- [x] Full-screen mobile menu
- [x] Menu animations (fade + slide)
- [x] Two-column grid (desktop)
- [x] Single column (mobile)
- [x] Social media links
- [x] Language switcher
- [x] Mobile-first responsive design
- [x] Next.js integration
- [x] TypeScript support
- [x] Framer Motion animations
- [x] Tailwind CSS styling

