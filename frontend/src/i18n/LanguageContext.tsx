import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ((key: TranslationKey) => string) & typeof translations['en'];
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
  }, [language]);

  // Create a function that also has all translation properties - memoized to prevent infinite re-renders
  const t = useMemo(() => {
    const currentTranslations = translations[language];
    const tFunction = (key: TranslationKey): string => {
      const value = currentTranslations[key];
      return typeof value === 'string' ? value : key;
    };
    // Merge the function with the translations object
    return Object.assign(tFunction, currentTranslations);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
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
