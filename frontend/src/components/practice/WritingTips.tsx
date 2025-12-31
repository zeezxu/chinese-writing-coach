// src/components/practice/WritingTips.tsx
import { Lightbulb } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function WritingTips() {
  const { t } = useLanguage(); // ← Added this

  const tips = [
    {
      title: t('tip1Title'),
      description: t('tip1Desc'),
      icon: '📚',
    },
    {
      title: t('tip2Title'),
      description: t('tip2Desc'),
      icon: '✍️',
    },
    {
      title: t('tip3Title'),
      description: t('tip3Desc'),
      icon: '💡',
    },
    {
      title: t('tip4Title'),
      description: t('tip4Desc'),
      icon: '📝',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        {t('writingTips')}
      </h3>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-2xl flex-shrink-0">{tip.icon}</span>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {tip.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}