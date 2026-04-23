'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setMobileMenuOpen } from '@/store/slices/uiSlice';
import { createLazyLoad } from '@/utils/lazyLoad';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import CustomCursor from './CustomCursor';
import LenisProvider from './LenisProvider';

// Lazy load Footer to reduce initial bundle size with optimized loading
const Footer = createLazyLoad(
  () => import('./Footer'),
  {
    ssr: true,
    priority: 'low',
    fallback: <div className="w-full h-[200px] bg-white" />,
  }
);

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  const handleMobileMenuToggle = (isOpen: boolean) => {
    dispatch(setMobileMenuOpen(isOpen));
  };

  return (
    <LenisProvider>
      <CustomCursor />
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={handleMobileMenuToggle}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => handleMobileMenuToggle(false)}
      />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </LenisProvider>
  );
}

