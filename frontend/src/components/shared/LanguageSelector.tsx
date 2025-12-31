// src/components/shared/LanguageSelector.tsx
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languageNames, type Language } from '@/i18n/translations';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const allLanguages: Language[] = [
    'en', 'zh', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 
    'ar', 'it', 'nl', 'pl', 'tr', 'vi', 'th', 'id', 'hi', 'sv', 'no'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Globe className="w-5 h-5 text-blue-500" />
        {t('language')}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        {t('feedbackLanguageDesc')}
      </p>

      {/* Dropdown */}
      <div className="relative">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="w-full px-4 py-3 pr-10 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          {allLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {languageNames[lang].native} ({languageNames[lang].english})
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Note:</strong> This changes the language for AI feedback. The UI currently supports English and Chinese.
        </p>
      </div>
    </div>
  );
}

