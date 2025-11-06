'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomDropdownProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
  label?: string;
}

export default function CustomDropdown({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  label,
}: CustomDropdownProps) {
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

  const selectedOption = value || placeholder;

  return (
    <div ref={dropdownRef} className="relative group">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-black"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className={`w-full px-4 py-3 bg-transparent border-b-2 ${
            isOpen || value
              ? 'border-black'
              : 'border-gray-300'
          } outline-none transition-all duration-300 text-lg text-left flex items-center justify-between ${
            !value ? 'text-gray-400' : 'text-black'
          }`}
        >
          <span>{selectedOption}</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 flex-shrink-0 ml-2"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.button>

        {/* Hidden input for form submission */}
        <input
          type="hidden"
          id={id}
          name={name}
          value={value}
          required={required}
        />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 shadow-lg max-h-60 overflow-y-auto"
            >
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{ x: 2 }}
                  className={`w-full px-4 py-3 text-left text-lg transition-colors duration-200 ${
                    value === option
                      ? 'bg-black text-white font-medium'
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

