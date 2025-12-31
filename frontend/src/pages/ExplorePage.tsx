// src/pages/ExplorePage.tsx
import { useLanguage } from '@/i18n/LanguageContext';

export default function ExplorePage() {
  const { t } = useLanguage(); // ← Added this

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('explore')}</h1>
        <p className="text-gray-600 mt-2">
          Coming soon! Sample essays and learning resources.
        </p>
      </div>
    </div>
  );
}