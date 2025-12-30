// src/pages/ProfilePage.tsx
import { useState } from 'react';
import ElementProgress from '@/components/profile/ElementProgress';

export default function ProfilePage() {
  // TODO: Get real data from API/store later
  const [userStats] = useState({
    username: 'Tom',
    totalEssays: 18,
    averageScore: 76,
    bestScore: 92,
    streakDays: 5,
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          👋 Hi, {userStats.username}!
        </h1>
      </div>

      {/* Element Progress Card */}
      <ElementProgress 
        totalEssays={userStats.totalEssays}
        averageScore={userStats.averageScore}
      />

      {/* Streak Card */}
      {userStats.streakDays > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">
                🔥 {userStats.streakDays} Day Streak!
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
            <div className="text-3xl font-bold text-blue-600">{userStats.totalEssays}</div>
            <div className="text-sm text-gray-600 mt-1">Total Essays</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{userStats.averageScore}</div>
            <div className="text-sm text-gray-600 mt-1">Avg Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{userStats.bestScore}</div>
            <div className="text-sm text-gray-600 mt-1">Best Score</div>
          </div>
        </div>
      </div>

      {/* Recent Essays Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Recent Essays</h2>
        <p className="text-gray-600 text-center py-8">
          Your recent essays will appear here
        </p>
      </div>
    </div>
  );
}