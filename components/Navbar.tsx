'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.div
        className="border-b"
        animate={{
          borderColor: isScrolled ? 'rgba(229, 231, 235, 1)' : 'rgba(229, 231, 235, 0.5)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Logo */}
          <Link href="/" className="font-bold text-base sm:text-lg md:text-xl">
            <motion.span
              animate={{
                color: '#000000',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              OAKROOT
            </motion.span>
          </Link>

          {/* Desktop Nav Links - Hidden on mobile, visible from md */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="relative group text-sm lg:text-base"
            >
              <motion.span
                animate={{
                  color: '#000000',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative"
              >
                {t('home')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
            <Link
              href="/projects"
              className="relative group text-sm lg:text-base"
            >
              <motion.span
                animate={{
                  color: '#000000',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative"
              >
                {t('projects')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
            <Link
              href="/services"
              className="relative group text-sm lg:text-base"
            >
              <motion.span
                animate={{
                  color: '#000000',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative"
              >
                {t('services')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
            <Link
              href="/info"
              className="relative group text-sm lg:text-base"
            >
              <motion.span
                animate={{
                  color: '#000000',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative"
              >
                {t('info')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
          </div>

          {/* Desktop Right Links - Hidden on mobile, visible from md */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              href="/contact"
              className="text-sm lg:text-base"
            >
              <motion.span
                animate={{
                  color: isScrolled ? '#000000' : '#ffffff',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative group"
              >
                {t('contact')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
            <LanguageSwitcher color={isScrolled ? '#000000' : '#ffffff'} />
          </div>

          {/* Mobile Menu Trigger - Always visible on far right */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-sm"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              animate={{
                color: '#000000',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              Navigation
            </motion.span>
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
}

