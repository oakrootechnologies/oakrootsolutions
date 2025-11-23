'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language, languageNames } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', labelKey: 'home' },
    { href: '/projects', labelKey: 'projects' },
    { href: '/services', labelKey: 'services' },
    { href: '/info', labelKey: 'info' },
    { href: '/contact', labelKey: 'contact' },
  ];

  const languages: Language[] = ['en', 'hi', 'fr', 'de', 'it', 'zh', 'id', 'pt', 'es'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const socialLinks = [
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'WeChat' },
    { href: '#', label: 'LinkedIn' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Menu Content */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white text-black z-40 h-screen w-screen overflow-y-auto"
          >
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {/* Close Button */}
              <div className="flex justify-end mb-8 sm:mb-12">
                <button
                  onClick={onClose}
                  className="text-2xl sm:text-3xl font-light hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>

              {/* Menu Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 pt-8 sm:pt-12 lg:pt-16">
                {/* Column One - Nav Links */}
                <div>
                  <h2 className="text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6 text-gray-500">
                    Navigation
                  </h2>
                  <nav className="space-y-3 sm:space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold hover:opacity-70 transition-opacity"
                      >
                        {t(link.labelKey)}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Column Two - Social & Language */}
                <div>
                  <h2 className="text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6 text-gray-500">
                    Connect
                  </h2>
                  <nav className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block text-xl sm:text-2xl md:text-3xl font-bold hover:opacity-70 transition-opacity"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                  
                  {/* Language Switcher */}
                  <div className="mt-8 sm:mt-12" ref={languageMenuRef}>
                    <h2 className="text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6 text-gray-500">
                      Language
                    </h2>
                    <button 
                      onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                      className="text-xl sm:text-2xl md:text-3xl font-bold hover:opacity-70 transition-opacity"
                    >
                      {languageNames[language]}
                    </button>
                    
                    <AnimatePresence>
                      {isLanguageMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="space-y-2">
                            {languages.map((lang) => (
                              <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={`block text-lg sm:text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity text-left ${
                                  language === lang ? 'opacity-50' : ''
                                }`}
                              >
                                {languageNames[lang]}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

