'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'fr' | 'de' | 'it' | 'zh' | 'id' | 'pt' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  zh: '中文',
  id: 'Bahasa Indonesia',
  pt: 'Português',
  es: 'Español',
};

// Translations object - will be expanded as needed
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    projects: 'Projects',
    work: 'Work',
    services: 'Services',
    info: 'Info',
    awards: 'Awards',
    team: 'Team',
    contact: 'Contact',
    caseStudies: 'Case Studies',
    // Add more translations as needed
  },
  hi: {
    home: 'होम',
    projects: 'प्रोजेक्ट्स',
    work: 'काम',
    services: 'सेवाएं',
    info: 'जानकारी',
    awards: 'पुरस्कार',
    team: 'टीम',
    contact: 'संपर्क',
    caseStudies: 'केस स्टडीज',
  },
  fr: {
    home: 'Accueil',
    projects: 'Projets',
    work: 'Travaux',
    services: 'Services',
    info: 'Info',
    awards: 'Prix',
    team: 'Équipe',
    contact: 'Contact',
    caseStudies: 'Études de cas',
  },
  de: {
    home: 'Startseite',
    projects: 'Projekte',
    work: 'Arbeit',
    services: 'Dienstleistungen',
    info: 'Info',
    awards: 'Auszeichnungen',
    team: 'Team',
    contact: 'Kontakt',
    caseStudies: 'Fallstudien',
  },
  it: {
    home: 'Casa',
    projects: 'Progetti',
    work: 'Lavori',
    services: 'Servizi',
    info: 'Info',
    awards: 'Premi',
    team: 'Squadra',
    contact: 'Contatto',
    caseStudies: 'Casi di studio',
  },
  zh: {
    home: '首页',
    projects: '项目',
    work: '作品',
    services: '服务',
    info: '信息',
    awards: '奖项',
    team: '团队',
    contact: '联系',
    caseStudies: '案例研究',
  },
  id: {
    home: 'Beranda',
    projects: 'Proyek',
    work: 'Karya',
    services: 'Layanan',
    info: 'Info',
    awards: 'Penghargaan',
    team: 'Tim',
    contact: 'Kontak',
    caseStudies: 'Studi Kasus',
  },
  pt: {
    home: 'Início',
    projects: 'Projetos',
    work: 'Trabalhos',
    services: 'Serviços',
    info: 'Info',
    awards: 'Prêmios',
    team: 'Equipe',
    contact: 'Contato',
    caseStudies: 'Estudos de caso',
  },
  es: {
    home: 'Inicio',
    projects: 'Proyectos',
    work: 'Trabajos',
    services: 'Servicios',
    info: 'Info',
    awards: 'Premios',
    team: 'Equipo',
    contact: 'Contacto',
    caseStudies: 'Casos de estudio',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with 'en' to match server-side render
  // This prevents hydration mismatch - both server and client start with 'en'
  // Then we update from localStorage after mount (client-side only)
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount (client-side only)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && translations[savedLanguage]) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { languageNames };

