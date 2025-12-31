// src/components/practice/LevelThemeSelector.tsx
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface LevelThemeSelectorProps {
  onSelect: (level: number, theme: string) => void;
}

// Theme translations
const themeTranslations: Record<string, Record<string, string>> = {
  // HSK 1 themes
  'self_introduction': {
    en: 'Self Introduction',
    zh: '自我介绍',
    es: 'Presentación Personal',
    fr: 'Présentation Personnelle',
  },
  'my_family': {
    en: 'My Family',
    zh: '我的家人',
    es: 'Mi Familia',
    fr: 'Ma Famille',
  },
  'daily_routine': {
    en: 'Daily Routine',
    zh: '日常生活',
    es: 'Rutina Diaria',
    fr: 'Routine Quotidienne',
  },
  'my_hobbies': {
    en: 'My Hobbies',
    zh: '我的爱好',
    es: 'Mis Pasatiempos',
    fr: 'Mes Loisirs',
  },
  'my_school': {
    en: 'My School',
    zh: '我的学校',
    es: 'Mi Escuela',
    fr: 'Mon École',
  },

  // HSK 2 themes
  'my_best_friend': {
    en: 'My Best Friend',
    zh: '我的好朋友',
    es: 'Mi Mejor Amigo',
    fr: 'Mon Meilleur Ami',
  },
  'weekend_activities': {
    en: 'Weekend Activities',
    zh: '周末活动',
    es: 'Actividades del Fin de Semana',
    fr: 'Activités du Week-end',
  },
  'my_favorite_food': {
    en: 'My Favorite Food',
    zh: '我喜欢的食物',
    es: 'Mi Comida Favorita',
    fr: 'Ma Nourriture Préférée',
  },
  'shopping': {
    en: 'Shopping',
    zh: '购物',
    es: 'Compras',
    fr: 'Shopping',
  },
  'my_hometown': {
    en: 'My Hometown',
    zh: '我的家乡',
    es: 'Mi Ciudad Natal',
    fr: 'Ma Ville Natale',
  },

  // HSK 3 themes
  'memorable_trip': {
    en: 'Memorable Trip',
    zh: '难忘的旅行',
    es: 'Viaje Memorable',
    fr: 'Voyage Mémorable',
  },
  'learning_experience': {
    en: 'Learning Experience',
    zh: '学习经历',
    es: 'Experiencia de Aprendizaje',
    fr: 'Expérience d\'Apprentissage',
  },
  'healthy_lifestyle': {
    en: 'Healthy Lifestyle',
    zh: '健康生活',
    es: 'Estilo de Vida Saludable',
    fr: 'Mode de Vie Sain',
  },
  'environment': {
    en: 'Environment',
    zh: '环境',
    es: 'Medio Ambiente',
    fr: 'Environnement',
  },
  'future_plans': {
    en: 'Future Plans',
    zh: '未来计划',
    es: 'Planes Futuros',
    fr: 'Plans Futurs',
  },

  // HSK 4 themes
  'cultural_differences': {
    en: 'Cultural Differences',
    zh: '文化差异',
    es: 'Diferencias Culturales',
    fr: 'Différences Culturelles',
  },
  'technology': {
    en: 'Technology',
    zh: '科技',
    es: 'Tecnología',
    fr: 'Technologie',
  },
  'education_system': {
    en: 'Education System',
    zh: '教育体系',
    es: 'Sistema Educativo',
    fr: 'Système Éducatif',
  },
  'work_and_career': {
    en: 'Work and Career',
    zh: '工作和职业',
    es: 'Trabajo y Carrera',
    fr: 'Travail et Carrière',
  },
  'social_media': {
    en: 'Social Media',
    zh: '社交媒体',
    es: 'Redes Sociales',
    fr: 'Médias Sociaux',
  },

  // HSK 5 themes
  'globalization': {
    en: 'Globalization',
    zh: '全球化',
    es: 'Globalización',
    fr: 'Mondialisation',
  },
  'traditional_vs_modern': {
    en: 'Traditional vs Modern',
    zh: '传统与现代',
    es: 'Tradicional vs Moderno',
    fr: 'Traditionnel vs Moderne',
  },
  'economic_development': {
    en: 'Economic Development',
    zh: '经济发展',
    es: 'Desarrollo Económico',
    fr: 'Développement Économique',
  },
  'social_responsibility': {
    en: 'Social Responsibility',
    zh: '社会责任',
    es: 'Responsabilidad Social',
    fr: 'Responsabilité Sociale',
  },

  // HSK 6 themes
  'philosophy_of_life': {
    en: 'Philosophy of Life',
    zh: '人生哲学',
    es: 'Filosofía de la Vida',
    fr: 'Philosophie de la Vie',
  },
  'historical_perspectives': {
    en: 'Historical Perspectives',
    zh: '历史视角',
    es: 'Perspectivas Históricas',
    fr: 'Perspectives Historiques',
  },
  'art_and_culture': {
    en: 'Art and Culture',
    zh: '艺术与文化',
    es: 'Arte y Cultura',
    fr: 'Art et Culture',
  },
  'ethical_dilemmas': {
    en: 'Ethical Dilemmas',
    zh: '道德困境',
    es: 'Dilemas Éticos',
    fr: 'Dilemmes Éthiques',
  },
  'future_of_humanity': {
    en: 'Future of Humanity',
    zh: '人类的未来',
    es: 'Futuro de la Humanidad',
    fr: 'Avenir de l\'Humanité',
  },
};

export default function LevelThemeSelector({ onSelect }: LevelThemeSelectorProps) {
  const { t, language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [customTheme, setCustomTheme] = useState<string>('');

  // Get translated theme
  const getTheme = (themeKey: string) => {
    const translations = themeTranslations[themeKey];
    if (!translations) return themeKey;
    
    // Return translation for current language, fallback to English
    return translations[language] || translations['en'] || themeKey;
  };

  const levels = [
    { level: 1, label: 'HSK 1', difficulty: t('beginner'), themes: [
      'self_introduction',
      'my_family',
      'daily_routine',
      'my_hobbies',
      'my_school',
    ]},
    { level: 2, label: 'HSK 2', difficulty: t('beginner'), themes: [
      'my_best_friend',
      'weekend_activities',
      'my_favorite_food',
      'shopping',
      'my_hometown',
    ]},
    { level: 3, label: 'HSK 3', difficulty: t('intermediate'), themes: [
      'memorable_trip',
      'learning_experience',
      'healthy_lifestyle',
      'environment',
      'future_plans',
    ]},
    { level: 4, label: 'HSK 4', difficulty: t('intermediate'), themes: [
      'cultural_differences',
      'technology',
      'education_system',
      'work_and_career',
      'social_media',
    ]},
    { level: 5, label: 'HSK 5', difficulty: t('advanced'), themes: [
      'globalization',
      'traditional_vs_modern',
      'economic_development',
      'social_responsibility',
    ]},
    { level: 6, label: 'HSK 6', difficulty: t('advanced'), themes: [
      'philosophy_of_life',
      'historical_perspectives',
      'art_and_culture',
      'ethical_dilemmas',
      'future_of_humanity',
    ]},
  ];

  const selectedLevelData = levels.find(l => l.level === selectedLevel);

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    setSelectedTheme('');
    setCustomTheme('');
  };

  const handleThemeSelect = (themeKey: string) => {
    // Store the translated theme text
    setSelectedTheme(getTheme(themeKey));
    setCustomTheme('');
  };

  const handleCustomThemeChange = (value: string) => {
    setCustomTheme(value);
    setSelectedTheme('');
  };

  const handleStartWriting = () => {
    if (selectedLevel && (selectedTheme || customTheme.trim())) {
      onSelect(selectedLevel, customTheme.trim() || selectedTheme);
    }
  };

  const isReadyToStart = selectedLevel && (selectedTheme || customTheme.trim());

  return (
    <div className="space-y-6">
      {/* Step 1: Level Selection */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {t('step1')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {levels.map((levelData) => (
            <button
              key={levelData.level}
              onClick={() => handleLevelSelect(levelData.level)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedLevel === levelData.level
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className={`text-lg font-bold ${
                    selectedLevel === levelData.level ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {levelData.label}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {levelData.difficulty}
                  </div>
                </div>
                {selectedLevel === levelData.level && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Theme Selection */}
      {selectedLevel && (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t('step2')}
          </h2>

          <div className="space-y-3">
            {/* Suggested Themes */}
            {selectedLevelData?.themes.map((themeKey) => {
              const themeText = getTheme(themeKey);
              return (
                <button
                  key={themeKey}
                  onClick={() => handleThemeSelect(themeKey)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTheme === themeText
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${
                      selectedTheme === themeText ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {themeText}
                    </span>
                    {selectedTheme === themeText && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              );
            })}

            {/* Custom Theme Input */}
            <div className="relative">
              <input
                type="text"
                value={customTheme}
                onChange={(e) => handleCustomThemeChange(e.target.value)}
                placeholder={t('customTheme')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  customTheme.trim()
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
            </div>
          </div>

          {/* Start Writing Button */}
          {isReadyToStart && (
            <button
              onClick={handleStartWriting}
              className="mt-6 w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg animate-fadeIn"
            >
              {t('startWriting')} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}