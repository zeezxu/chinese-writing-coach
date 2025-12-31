// src/pages/LanguageSelectionPage.tsx
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languageNames, type Language } from '@/i18n/translations';

interface LanguageSelectionPageProps {
  onLanguageSelected: () => void;
}

export default function LanguageSelectionPage({ onLanguageSelected }: LanguageSelectionPageProps) {
  const { language, setLanguage } = useLanguage();

  // All 20 languages
  const allLanguages: Language[] = [
    'en', 'zh', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 
    'ar', 'it', 'nl', 'pl', 'tr', 'vi', 'th', 'id', 'hi', 'sv', 'no'
  ];

  const handleContinue = () => {
    // Mark that language has been selected
    localStorage.setItem('languageSelected', 'true');
    
    onLanguageSelected();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Chinese Writing Coach
          </h1>
          <p className="text-xl text-gray-600">
            欢迎使用中文写作教练
          </p>
        </div>

        {/* Language Selection Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6">
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-3xl">🌍</span>
              Select Your Language
            </h2>
            <p className="text-gray-600 mb-6">
              Choose your preferred language / 选择你的首选语言
            </p>

            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full px-4 py-4 pr-10 bg-white border-2 border-gray-300 rounded-xl appearance-none cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
              >
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {languageNames[lang].native} ({languageNames[lang].english})
                  </option>
                ))}
              </select>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-blue-600 text-white text-xl font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Continue / 继续 →
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Learn Chinese writing with AI-powered feedback
        </p>
      </div>
    </div>
  );
}