// src/components/practice/WritingEditor.tsx
import { useState, useEffect } from "react";
import { FileText, ArrowLeft, Save } from "lucide-react";
import { useLanguage } from '@/i18n/LanguageContext';

interface WritingEditorProps {
  level: number;
  theme: string;
  onSubmit: (data: { title: string; content: string }) => void;
  onSaveDraft: (data: { title: string; content: string }) => void;
  onBack: () => void;
  isSubmitting?: boolean;
  isSavingDraft?: boolean;
  initialTitle?: string;
  initialContent?: string;
}

// Helper function to get min chars by level
function getMinChars(level: number): number {
  return level <= 2 ? 20 : 50;
}

export default function WritingEditor({
  level,
  theme,
  onSubmit,
  onSaveDraft,
  onBack,
  isSubmitting = false,
  isSavingDraft = false,
  initialTitle = "",
  initialContent = "",
}: WritingEditorProps) {
  const { t } = useLanguage(); // ← Added this
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // Get minimum characters based on level
  const minChars = getMinChars(level);

  // Calculate Chinese character count
  const charCount = content.match(/[\u4e00-\u9fa5]/g)?.length || 0;
  const maxChars = 500;
  const percentage = (charCount / maxChars) * 100;
  const isOverLimit = charCount > maxChars;
  const isTooShort = charCount < minChars;

  // Auto-save to localStorage (backup)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content || title) {
        localStorage.setItem(
          "draft_backup",
          JSON.stringify({ level, theme, title, content })
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, level, theme]);

  // Load from localStorage backup (only once on mount)
  useEffect(() => {
    if (!initialTitle && !initialContent) {
      const saved = localStorage.getItem("draft_backup");
      if (saved) {
        try {
          const draft = JSON.parse(saved);
          if (draft.level === level && draft.theme === theme) {
            setTitle(draft.title || "");
            setContent(draft.content || "");
          }
        } catch (error) {
          console.error("Failed to load backup draft:", error);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (isTooShort) {
      alert(
        `Your essay is too short. Please write at least ${minChars} Chinese characters.`
      );
      return;
    }
    if (isOverLimit) {
      alert("Your essay is too long. Please keep it under 500 characters.");
      return;
    }

    onSubmit({ title, content });
  };

  const handleSaveDraft = () => {
    if (!title.trim() && !content.trim()) {
      alert("Please write something before saving");
      return;
    }

    onSaveDraft({ title, content });
  };

  return (
    <div className="space-y-4">
      {/* Back Button & Level/Theme Display */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          disabled={isSubmitting || isSavingDraft}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('changeLevelTheme')}</span>
        </button>

        <div className="text-right">
          <div className="text-sm text-gray-600">{t('targetLevel')}</div>
          <div className="font-bold text-blue-600">HSK {level}</div>
        </div>
      </div>

      {/* Theme Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-700">{t('theme')}:</span>
          <span className="text-blue-900 font-semibold">{theme}</span>
        </div>
      </div>

      {/* Title Input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t('essayTitle')}
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('titlePlaceholder')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSubmitting || isSavingDraft}
        />
      </div>

      {/* Character Counter */}
      <div className="flex justify-between items-center">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          {t('writeEssay')}
        </label>

        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isOverLimit ? "bg-red-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          {/* Counter */}
          <span
            className={`text-sm font-medium ${
              isOverLimit
                ? "text-red-600"
                : charCount >= minChars
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {charCount} / {maxChars} 字
          </span>
        </div>
      </div>

      {/* Minimum requirement hint */}
      <div className="text-xs text-gray-500 text-right -mt-2">
        {t('minimum')}: {minChars} {t('characters')}
      </div>

      {/* Text Area */}
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('contentPlaceholder')}
        className={`w-full h-96 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
          isOverLimit ? "border-red-300" : "border-gray-300"
        }`}
        disabled={isSubmitting || isSavingDraft}
      />

      {/* Warning Messages */}
      {isOverLimit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">
            ⚠️ {t('overLimit')} {charCount - maxChars} 字
          </p>
        </div>
      )}

      {charCount > 0 && isTooShort && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-600">
            ℹ️ {t('needMore')} {minChars - charCount} {t('moreCharacters')}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || isSavingDraft || isTooShort || isOverLimit}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isSubmitting || isSavingDraft || isTooShort || isOverLimit
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FileText className="w-5 h-5" />
          {isSubmitting ? t('analyzing') : t('submitAnalysis')}
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={
            isSubmitting || isSavingDraft || (!title.trim() && !content.trim())
          }
          className={`flex-1 flex items-center gap-2 justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
            isSubmitting || isSavingDraft || (!title.trim() && !content.trim())
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          <Save className="w-5 h-5" />
          {isSavingDraft ? t('saving') : t('saveDraft')}
        </button>
      </div>

      {/* Auto-save indicator */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          💾 {t('autoBackup')}
        </p>
      </div>
    </div>
  );
}