// src/pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileEdit, LogOut } from 'lucide-react';
import ElementProgress from '@/components/profile/ElementProgress';
import { essaysApi } from '@/api/essays';
import { draftsApi } from '@/api/drafts';
import { authApi } from '@/api/auth';
import type { EssayListItem, Draft } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import LanguageSelector from '@/components/shared/LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';
import { useUserStore } from '@/store/userStore';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout, updateUser } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [essays, setEssays] = useState<EssayListItem[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [stats, setStats] = useState({
    username: user?.username || 'User',
    totalEssays: 0,
    averageScore: 0,
    bestScore: 0,
    streakDays: 0,
  });
  const [showHSKModal, setShowHSKModal] = useState(false);
  const [selectedHSK, setSelectedHSK] = useState(user?.target_hsk_level || 3);
  const [isSavingHSK, setIsSavingHSK] = useState(false);

  // Show HSK selection modal if user hasn't set their level yet
  useEffect(() => {
    if (user && !user.target_hsk_level) {
      setShowHSKModal(true);
    }
  }, [user]);

  // Fetch user's essays and drafts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [essayList, draftList] = await Promise.all([
          essaysApi.getAll(50, 0),
          draftsApi.getAll(),
        ]);
        
        setEssays(essayList);
        setDrafts(draftList);

        // Calculate stats from essays
        if (essayList.length > 0) {
          const scores = essayList
            .map(e => e.overall_score)
            .filter((score): score is number => score !== undefined);

          const averageScore = scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

          const bestScore = scores.length > 0
            ? Math.max(...scores)
            : 0;

          setStats(prev => ({
            ...prev,
            totalEssays: essayList.length,
            averageScore,
            bestScore,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteDraft = async (draftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('Delete this draft?')) {
      return;
    }

    try {
      await draftsApi.delete(draftId);
      setDrafts(drafts.filter(d => d.id !== draftId));
    } catch (error) {
      console.error('Failed to delete draft:', error);
      alert('Failed to delete draft. Please try again.');
    }
  };

  const handleLoadDraft = (draft: Draft) => {
    navigate('/practice', { state: { draft } });
  };

  const handleSaveHSK = async () => {
    setIsSavingHSK(true);
    try {
      await authApi.updateSettings({ target_hsk_level: selectedHSK });
      updateUser({ target_hsk_level: selectedHSK });
      setShowHSKModal(false);
    } catch (error) {
      console.error('Failed to save HSK level:', error);
      alert('Failed to save HSK level. Please try again.');
    } finally {
      setIsSavingHSK(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">{t('loadingProfile')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HSK Level Selection Modal for First-Time Users */}
      {showHSKModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('selectHSKLevel')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('hskLevelDesc')}
            </p>

            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedHSK(level)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedHSK === level
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">HSK {level}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {level === 1 && 'Beginner - 150 words'}
                    {level === 2 && 'Elementary - 300 words'}
                    {level === 3 && 'Intermediate - 600 words'}
                    {level === 4 && 'Upper Intermediate - 1200 words'}
                    {level === 5 && 'Advanced - 2500 words'}
                    {level === 6 && 'Proficient - 5000+ words'}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleSaveHSK}
              disabled={isSavingHSK}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSavingHSK ? t('saving') : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          👋 {t('hi')}, {stats.username}!
        </h1>
      </div>

      {/* Element Progress Card */}
      <ElementProgress 
        totalEssays={stats.totalEssays}
        averageScore={stats.averageScore}
      />

      {/* Streak Card */}
      {stats.streakDays > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">
                🔥 {stats.streakDays} {t('dayStreak')}
              </div>
              <div className="text-sm text-orange-700 mt-1">
                {t('keepWriting')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📊 {t('yourProgress')}</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.totalEssays}</div>
            <div className="text-sm text-gray-600 mt-1">{t('totalEssays')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {stats.averageScore > 0 ? stats.averageScore : '--'}
            </div>
            <div className="text-sm text-gray-600 mt-1">{t('avgScore')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {stats.bestScore > 0 ? stats.bestScore : '--'}
            </div>
            <div className="text-sm text-gray-600 mt-1">{t('bestScore')}</div>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <LanguageSelector />

      {/* HSK Level Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 {t('targetHSKLevel')}</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="hsk-level" className="block text-sm font-medium text-gray-700 mb-2">
              {t('chooseTargetHSK')}
            </label>
            <select
              id="hsk-level"
              value={user?.target_hsk_level || 3}
              onChange={(e) => {
                const level = parseInt(e.target.value);
                setSelectedHSK(level);
                handleSaveHSK();
              }}
              disabled={isSavingHSK}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value={1}>HSK 1 - {t('beginner')} (150 words)</option>
              <option value={2}>HSK 2 - Elementary (300 words)</option>
              <option value={3}>HSK 3 - {t('intermediate')} (600 words)</option>
              <option value={4}>HSK 4 - Upper {t('intermediate')} (1200 words)</option>
              <option value={5}>HSK 5 - {t('advanced')} (2500 words)</option>
              <option value={6}>HSK 6 - Proficient (5000+ words)</option>
            </select>
          </div>

          <p className="text-sm text-gray-600">
            {t('changesSavedAuto')}
          </p>
        </div>
      </div>

      {/* Drafts Section */}
      {drafts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-orange-500" />
            📝 {t('drafts')} ({drafts.length})
          </h2>
          
          <div className="space-y-3">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                onClick={() => handleLoadDraft(draft)}
                className="border border-orange-200 bg-orange-50 rounded-lg p-4 hover:border-orange-300 hover:bg-orange-100 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {draft.title || 'Untitled Draft'}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      {draft.hsk_level && (
                        <>
                          <span className="flex items-center gap-1">
                            📚 HSK {draft.hsk_level}
                          </span>
                          <span>•</span>
                        </>
                      )}
                      <span>{draft.char_count} 字</span>
                      {draft.theme && (
                        <>
                          <span>•</span>
                          <span>{draft.theme}</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="text-gray-500">
                        {formatDistanceToNow(new Date(draft.updated_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDeleteDraft(draft.id, e)}
                    className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded transition-colors"
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Essays */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 {t('recentEssays')}</h2>
        
        {essays.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">{t('noEssays')}</p>
            <button
              onClick={() => navigate('/practice')}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('writeFirst')}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {essays.map((essay) => (
              <div
                key={essay.id}
                onClick={() => navigate(`/analysis/${essay.id}`)}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {essay.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        📚 HSK {essay.target_hsk_level}
                      </span>
                      <span>•</span>
                      <span>{essay.char_count} 字</span>
                      {essay.theme && (
                        <>
                          <span>•</span>
                          <span>{essay.theme}</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="text-gray-500">
                        {formatDistanceToNow(new Date(essay.submitted_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  {/* Score Badge */}
                  {essay.overall_score !== undefined && (
                    <div className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      essay.overall_score >= 90
                        ? 'bg-green-100 text-green-700'
                        : essay.overall_score >= 80
                        ? 'bg-blue-100 text-blue-700'
                        : essay.overall_score >= 70
                        ? 'bg-yellow-100 text-yellow-700'
                        : essay.overall_score >= 60
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {essay.overall_score}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('account')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{user?.email}</p>
              <p className="text-sm text-gray-600">{t('loggedInAs')} {user?.username}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t('logOut')}
          </button>
        </div>
      </div>
    </div>
  );
}