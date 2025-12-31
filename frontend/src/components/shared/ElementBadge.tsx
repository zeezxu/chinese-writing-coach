// src/components/shared/ElementBadge.tsx
import { type Element } from '@/utils/fiveElements';
import { useLanguage } from '@/i18n/LanguageContext';

interface ElementBadgeProps {
  element: Element;
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
}

export default function ElementBadge({ 
  element, 
  level, 
  size = 'md',
  showLevel = true 
}: ElementBadgeProps) {
  const { t } = useLanguage();

  // Get element name translation
  const getElementName = (elementType: Element) => {
    const elementMap: Record<Element, string> = {
      'wood': t('wood'),
      'fire': t('fire'),
      'earth': t('earth'),
      'metal': t('metal'),
      'water': t('water'),
    };
    return elementMap[elementType];
  };

  // Element emojis
  const emojiMap: Record<Element, string> = {
    'wood': '🌳',
    'fire': '🔥',
    'earth': '⛰️',
    'metal': '✨',
    'water': '🌊',
  };

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={sizeClasses[size]}>
        {emojiMap[element]}
      </div>
      {showLevel && (
        <div className="text-xs text-gray-600">
          {getElementName(element)} · {t('level')} {level}
        </div>
      )}
    </div>
  );
}