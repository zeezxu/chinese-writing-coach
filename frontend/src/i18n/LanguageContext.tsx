import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    // Check if saved language is valid
    const validLanguages: Language[] = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'ar', 'it', 'nl', 'pl', 'tr', 'vi', 'th', 'id', 'hi', 'sv', 'no'];
    return (saved && validLanguages.includes(saved as Language)) ? saved as Language : 'en';
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    console.log('Language changed to:', language);
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const setLanguage = (lang: Language) => {
    console.log('Setting language to:', lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}