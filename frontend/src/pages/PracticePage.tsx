// src/pages/PracticePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import LevelThemeSelector from '@/components/practice/LevelThemeSelector';
import WritingEditor from '@/components/practice/WritingEditor';
import WritingTips from '@/components/practice/WritingTips';
import { essaysApi } from '@/api/essays';
import { draftsApi } from '@/api/drafts';
import type { Draft } from '@/types';

export default function PracticePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  const [step, setStep] = useState<'select' | 'write'>('select');
  const [selectedLevel, setSelectedLevel] = useState<number>(3);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');

  // Check if we're loading a draft
  useEffect(() => {
    const draftToLoad = location.state?.draft as Draft | undefined;
    
    if (draftToLoad) {
      // Load draft data
      setSelectedLevel(draftToLoad.hsk_level || 3);
      setSelectedTheme(draftToLoad.theme || '');
      setInitialTitle(draftToLoad.title || '');
      setInitialContent(draftToLoad.content || '');
      setCurrentDraftId(draftToLoad.id);
      setStep('write');
      
      // Clear the location state so refresh doesn't reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleLevelThemeSelect = (level: number, theme: string) => {
    setSelectedLevel(level);
    setSelectedTheme(theme);
    setInitialTitle('');
    setInitialContent('');
    setCurrentDraftId(null);
    setStep('write');
  };

  const handleBack = () => {
    setStep('select');
    setCurrentDraftId(null);
    setInitialTitle('');
    setInitialContent('');
  };

  const handleSaveDraft = async (data: { title: string; content: string }) => {
    setIsSavingDraft(true);

    try {
      // TODO: Get real user ID from auth store
      const userId = '03474b93-3871-46d4-a414-7a049266b3c1';

      if (currentDraftId) {
        // Update existing draft
        await draftsApi.update(currentDraftId, {
          title: data.title,
          content: data.content,
          theme: selectedTheme,
          hsk_level: selectedLevel,
        });
        alert('Draft updated! 💾');
      } else {
        // Create new draft
        const draft = await draftsApi.create(userId, {
          title: data.title,
          content: data.content,
          theme: selectedTheme,
          hsk_level: selectedLevel,
        });
        setCurrentDraftId(draft.id);
        alert('Draft saved! 💾');
      }

    } catch (error) {
      console.error('Failed to save draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

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
        language: localStorage.getItem('language') || 'en',
      });

      console.log('Analysis received:', analysis);

      // Clear the draft backup
      localStorage.removeItem('draft_backup');

      // Delete the saved draft if it exists
      if (currentDraftId) {
        try {
          await draftsApi.delete(currentDraftId);
        } catch (error) {
          console.error('Failed to delete draft:', error);
        }
      }

      // Navigate to analysis results page
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
        <h1 className="text-3xl font-bold text-gray-900">{t('practiceWriting')}</h1>
        <p className="text-gray-600 mt-2">
          {step === 'select' 
            ? t('chooseLevel')
            : currentDraftId
            ? t('continueDraft')
            : t('continueWriting')
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
                onSaveDraft={handleSaveDraft}
                onBack={handleBack}
                isSubmitting={isSubmitting}
                isSavingDraft={isSavingDraft}
                initialTitle={initialTitle}
                initialContent={initialContent}
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