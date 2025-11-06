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
    services: 'Services',
    info: 'Info',
    awards: 'Awards',
    team: 'Team',
    contact: 'Contact',
    // Add more translations as needed
  },
  hi: {
    home: 'होम',
    projects: 'प्रोजेक्ट्स',
    services: 'सेवाएं',
    info: 'जानकारी',
    awards: 'पुरस्कार',
    team: 'टीम',
    contact: 'संपर्क',
  },
  fr: {
    home: 'Accueil',
    projects: 'Projets',
    services: 'Services',
    info: 'Info',
    awards: 'Prix',
    team: 'Équipe',
    contact: 'Contact',
  },
  de: {
    home: 'Startseite',
    projects: 'Projekte',
    services: 'Dienstleistungen',
    info: 'Info',
    awards: 'Auszeichnungen',
    team: 'Team',
    contact: 'Kontakt',
  },
  it: {
    home: 'Casa',
    projects: 'Progetti',
    services: 'Servizi',
    info: 'Info',
    awards: 'Premi',
    team: 'Squadra',
    contact: 'Contatto',
  },
  zh: {
    home: '首页',
    projects: '项目',
    services: '服务',
    info: '信息',
    awards: '奖项',
    team: '团队',
    contact: '联系',
  },
  id: {
    home: 'Beranda',
    projects: 'Proyek',
    services: 'Layanan',
    info: 'Info',
    awards: 'Penghargaan',
    team: 'Tim',
    contact: 'Kontak',
  },
  pt: {
    home: 'Início',
    projects: 'Projetos',
    services: 'Serviços',
    info: 'Info',
    awards: 'Prêmios',
    team: 'Equipe',
    contact: 'Contato',
  },
  es: {
    home: 'Inicio',
    projects: 'Proyectos',
    services: 'Servicios',
    info: 'Info',
    awards: 'Premios',
    team: 'Equipo',
    contact: 'Contacto',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
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

