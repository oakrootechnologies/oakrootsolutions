'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import CustomCursor from './CustomCursor';
import LenisProvider from './LenisProvider';

// Lazy load Footer to reduce initial bundle size
const Footer = dynamic(() => import('./Footer'), {
  ssr: true,
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <LenisProvider>
      <CustomCursor />
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </LenisProvider>
  );
}

