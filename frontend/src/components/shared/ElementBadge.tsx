// src/components/shared/ElementBadge.tsx
import { ELEMENTS, type Element } from '@/utils/fiveElements';

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
  const elementInfo = ELEMENTS[element];

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  return (
    <div className="flex flex-col items-center">
      <div className={sizeClasses[size]}>{elementInfo.emoji}</div>
      <div className="text-center mt-2">
        <div className={`font-bold ${textSizeClasses[size]}`} style={{ color: elementInfo.color }}>
          {elementInfo.nameChinese} {elementInfo.title}
          {showLevel && ` Level ${level}`}
        </div>
        <div className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {elementInfo.description}
        </div>
      </div>
    </div>
  );
}