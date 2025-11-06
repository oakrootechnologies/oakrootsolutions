'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language, languageNames } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  color?: string;
}

export default function LanguageSwitcher({ color }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages: Language[] = ['en', 'hi', 'fr', 'de', 'it', 'zh', 'id', 'pt', 'es'];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm lg:text-base cursor-pointer relative group"
        aria-label="Select language"
      >
        <motion.span
          animate={{
            color: color || '#000000',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative"
        >
          {languageNames[language]}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ x: 2, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 ${
                  language === lang
                    ? 'bg-black text-white font-medium'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {languageNames[lang]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

