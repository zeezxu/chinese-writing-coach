// src/components/profile/ElementProgress.tsx
import { calculateProgress, ELEMENTS, getRandomMessage } from '@/utils/fiveElements';
import ElementBadge from '@/components/shared/ElementBadge';

interface ElementProgressProps {
  totalEssays: number;
  averageScore: number;
}

export default function ElementProgress({ totalEssays, averageScore }: ElementProgressProps) {
  const progress = calculateProgress(totalEssays, averageScore);
  const message = getRandomMessage(progress.current.name);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Current Element Badge */}
      <ElementBadge 
        element={progress.current.name} 
        level={progress.current.level}
        size="lg"
      />

      {/* Encouraging Message */}
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-gray-700 italic">
          "{message}"
        </p>
      </div>

      {/* Progress Bar */}
      {progress.next && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress to {ELEMENTS[progress.next].nameChinese} {ELEMENTS[progress.next].title}</span>
            <span className="text-sm font-medium" style={{ color: progress.current.color }}>
              {Math.round(progress.progressPercent)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${progress.progressPercent}%`,
                background: `linear-gradient(to right, ${progress.current.color}, ${ELEMENTS[progress.next].color})`
              }}
            />
          </div>

          <div className="mt-2 text-center text-sm text-gray-600">
            {progress.essaysNeeded > 0 && (
              <span>{progress.essaysNeeded} more essay{progress.essaysNeeded > 1 ? 's' : ''}</span>
            )}
            {progress.essaysNeeded > 0 && progress.scoreNeeded > 0 && <span> and </span>}
            {progress.scoreNeeded > 0 && (
              <span>{progress.scoreNeeded} more points in average score</span>
            )}
            {progress.essaysNeeded === 0 && progress.scoreNeeded === 0 && (
              <span>Almost there! Keep up the great work!</span>
            )}
          </div>
        </div>
      )}

      {/* Element Journey */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        {(['wood', 'fire', 'earth', 'metal', 'water'] as const).map((elem, index) => {
          const elemInfo = ELEMENTS[elem];
          const isCurrent = elem === progress.current.name;
          const isPast = index < (['wood', 'fire', 'earth', 'metal', 'water'] as const).indexOf(progress.current.name);
          
          return (
            <div key={elem} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  isCurrent 
                    ? 'border-current scale-110' 
                    : isPast 
                    ? 'border-gray-400' 
                    : 'border-gray-300'
                }`}
                style={{ 
                  borderColor: isCurrent || isPast ? elemInfo.color : undefined,
                  backgroundColor: isPast ? `${elemInfo.color}20` : undefined
                }}
              >
                <span className={`text-xl ${isPast || isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                  {elemInfo.emoji}
                </span>
              </div>
              {index < 4 && (
                <div 
                  className={`w-4 h-0.5 ${isPast ? 'bg-gray-400' : 'bg-gray-300'}`}
                  style={{ backgroundColor: isPast ? elemInfo.color : undefined }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}