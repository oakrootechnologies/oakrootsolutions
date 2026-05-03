'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setMobileMenuOpen } from '@/store/slices/uiSlice';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import CustomCursor from './CustomCursor';
import LenisProvider from './LenisProvider';
// Direct static import — Footer is SSR-safe, no dynamic needed
import Footer from './Footer';

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

