// src/pages/PracticePage.tsx
import { useState } from 'react';
import LevelThemeSelector from '@/components/practice/LevelThemeSelector';
import WritingEditor from '@/components/practice/WritingEditor';
import WritingTips from '@/components/practice/WritingTips';
import { essaysApi } from '@/api/essays';
import { useNavigate } from 'react-router-dom';

export default function PracticePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'select' | 'write'>('select');
  const [selectedLevel, setSelectedLevel] = useState<number>(3);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLevelThemeSelect = (level: number, theme: string) => {
    setSelectedLevel(level);
    setSelectedTheme(theme);
    setStep('write');
  };

  const handleBack = () => {
    setStep('select');
  };

  // In handleSubmit function, replace the alert with navigation:

const handleSubmit = async (data: { title: string; content: string }) => {
  setIsSubmitting(true);

  try {
    const userId = '03474b93-3871-46d4-a414-7a049266b3c1';

    console.log('Submitting essay...', {
      ...data,
      level: selectedLevel,
      theme: selectedTheme,
    });

    const analysis = await essaysApi.submit(userId, {
      title: data.title,
      content: data.content,
      theme: selectedTheme,
      target_hsk_level: selectedLevel,
      language: 'en',
    });

    console.log('Analysis received:', analysis);

    // Clear the draft
    localStorage.removeItem('draft');

    // Navigate to analysis results page ← Changed this!
    navigate(`/analysis/${analysis.essay_id}`);

  } catch (error) {
    console.error('Failed to submit essay:', error);
    alert('Failed to submit essay. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Practice Writing</h1>
        <p className="text-gray-600 mt-2">
          {step === 'select' 
            ? 'Choose your level and theme to get started! ✨'
            : 'Write your essay and get instant AI feedback! ✨'
          }
        </p>
      </div>

      {step === 'select' ? (
        /* Level & Theme Selection */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <LevelThemeSelector onSelect={handleLevelThemeSelect} />
        </div>
      ) : (
        /* Writing Interface */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Editor (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <WritingEditor
                level={selectedLevel}
                theme={selectedTheme}
                onSubmit={handleSubmit}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Right Column - Tips (1/3 width on desktop) */}
          <div className="lg:col-span-1">
            <WritingTips />
          </div>
        </div>
      )}
    </div>
  );
}