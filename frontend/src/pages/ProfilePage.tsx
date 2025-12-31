// src/pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileEdit } from 'lucide-react';
import ElementProgress from '@/components/profile/ElementProgress';
import { essaysApi } from '@/api/essays';
import { draftsApi } from '@/api/drafts';
import type { EssayListItem, Draft } from '@/types';
import { formatDistanceToNow } from 'date-fns';

export default function ProfilePage() {
  const navigate = useNavigate();
  
  // TODO: Get real user ID from auth store
  const userId = '03474b93-3871-46d4-a414-7a049266b3c1'; // Temporary hardcoded
  
  const [loading, setLoading] = useState(true);
  const [essays, setEssays] = useState<EssayListItem[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [stats, setStats] = useState({
    username: 'Tom',
    totalEssays: 0,
    averageScore: 0,
    bestScore: 0,
    streakDays: 0,
  });

  // Fetch user's essays and drafts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [essayList, draftList] = await Promise.all([
          essaysApi.getAll(userId, 50, 0),
          draftsApi.getAll(userId),
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
  }, [userId]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          👋 Hi, {stats.username}!
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
                🔥 {stats.streakDays} Day Streak!
              </div>
              <div className="text-sm text-orange-700 mt-1">
                Keep writing to maintain your streak!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Your Progress</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.totalEssays}</div>
            <div className="text-sm text-gray-600 mt-1">Total Essays</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {stats.averageScore > 0 ? stats.averageScore : '--'}
            </div>
            <div className="text-sm text-gray-600 mt-1">Avg Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {stats.bestScore > 0 ? stats.bestScore : '--'}
            </div>
            <div className="text-sm text-gray-600 mt-1">Best Score</div>
          </div>
        </div>
      </div>

      {/* Drafts Section */}
      {drafts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-orange-500" />
            📝 Drafts ({drafts.length})
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
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Essays */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Recent Essays</h2>
        
        {essays.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't written any essays yet!</p>
            <button
              onClick={() => navigate('/practice')}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Write Your First Essay
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
    </div>
  );
}