'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import LenisProvider from './LenisProvider';

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

