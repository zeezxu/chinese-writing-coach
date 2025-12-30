// src/components/practice/LevelThemeSelector.tsx
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface LevelThemeSelectorProps {
  onSelect: (level: number, theme: string) => void;
}

// Themes organized by HSK level
const THEMES_BY_LEVEL: Record<number, string[]> = {
  1: [
    'Self Introduction (自我介绍)',
    'My Family (我的家人)',
    'Daily Routine (日常生活)',
    'My Hobbies (我的爱好)',
    'My School (我的学校)',
  ],
  2: [
    'My Best Friend (我最好的朋友)',
    'Weekend Activities (周末活动)',
    'My Favorite Food (我喜欢的食物)',
    'Shopping Experience (购物经历)',
    'My Hometown (我的家乡)',
  ],
  3: [
    'A Memorable Trip (难忘的旅行)',
    'My Learning Experience (我的学习经历)',
    'Healthy Lifestyle (健康的生活方式)',
    'Environmental Protection (环境保护)',
    'Future Plans (未来的计划)',
  ],
  4: [
    'Cultural Differences (文化差异)',
    'Technology and Life (科技与生活)',
    'Education System (教育体系)',
    'Work and Career (工作与职业)',
    'Social Media Impact (社交媒体的影响)',
  ],
  5: [
    'Globalization (全球化)',
    'Traditional vs Modern (传统与现代)',
    'Economic Development (经济发展)',
    'Social Responsibility (社会责任)',
    'Innovation and Change (创新与变革)',
  ],
  6: [
    'Philosophy of Life (人生哲学)',
    'Historical Perspectives (历史观点)',
    'Art and Culture (艺术与文化)',
    'Ethical Dilemmas (道德困境)',
    'Future of Humanity (人类的未来)',
  ],
};

export default function LevelThemeSelector({ onSelect }: LevelThemeSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [customTheme, setCustomTheme] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    setSelectedTheme('');
    setCustomTheme('');
    setShowCustom(false);
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setShowCustom(false);
    setCustomTheme('');
  };

  const handleCustomTheme = () => {
    setShowCustom(true);
    setSelectedTheme('');
  };

  const handleContinue = () => {
    if (!selectedLevel) {
      alert('Please select an HSK level');
      return;
    }

    const finalTheme = showCustom ? customTheme : selectedTheme;
    if (!finalTheme.trim()) {
      alert('Please select or enter a theme');
      return;
    }

    onSelect(selectedLevel, finalTheme);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Select HSK Level */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Step 1: Choose Your Target HSK Level
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button
              key={level}
              onClick={() => handleLevelSelect(level)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedLevel === level
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  selectedLevel === level ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  HSK {level}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {level <= 2 ? 'Beginner' : level <= 4 ? 'Intermediate' : 'Advanced'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select Theme (only show if level is selected) */}
      {selectedLevel && (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Step 2: Choose a Theme
          </h2>

          <div className="space-y-3">
            {/* Suggested Themes */}
            {THEMES_BY_LEVEL[selectedLevel].map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeSelect(theme)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedTheme === theme
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    selectedTheme === theme ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {theme}
                  </span>
                  {selectedTheme === theme && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}

            {/* Custom Theme Option */}
            <button
              onClick={handleCustomTheme}
              className={`w-full text-left p-4 rounded-lg border-2 border-dashed transition-all ${
                showCustom
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${
                showCustom ? 'text-blue-700' : 'text-gray-600'
              }`}>
                ✏️ Enter Your Own Theme (自定义主题)
              </span>
            </button>

            {/* Custom Theme Input */}
            {showCustom && (
              <div className="pl-4 animate-fadeIn">
                <input
                  type="text"
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                  placeholder="Enter your theme in Chinese or English..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Continue Button */}
      {selectedLevel && (selectedTheme || customTheme) && (
        <div className="animate-fadeIn">
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Start Writing
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}