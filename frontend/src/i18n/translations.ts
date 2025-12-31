// src/i18n/translations.ts

export type Language = 
  | 'en'      // English
  | 'zh'      // Chinese (Simplified)
  | 'es'      // Spanish
  | 'fr'      // French
  | 'de'      // German
  | 'ja'      // Japanese
  | 'ko'      // Korean
  | 'pt'      // Portuguese
  | 'ru'      // Russian
  | 'ar'      // Arabic
  | 'it'      // Italian
  | 'nl'      // Dutch
  | 'pl'      // Polish
  | 'tr'      // Turkish
  | 'vi'      // Vietnamese
  | 'th'      // Thai
  | 'id'      // Indonesian
  | 'hi'      // Hindi
  | 'sv'      // Swedish
  | 'no';     // Norwegian

export const languageNames: Record<Language, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  zh: { native: '中文', english: 'Chinese' },
  es: { native: 'Español', english: 'Spanish' },
  fr: { native: 'Français', english: 'French' },
  de: { native: 'Deutsch', english: 'German' },
  ja: { native: '日本語', english: 'Japanese' },
  ko: { native: '한국어', english: 'Korean' },
  pt: { native: 'Português', english: 'Portuguese' },
  ru: { native: 'Русский', english: 'Russian' },
  ar: { native: 'العربية', english: 'Arabic' },
  it: { native: 'Italiano', english: 'Italian' },
  nl: { native: 'Nederlands', english: 'Dutch' },
  pl: { native: 'Polski', english: 'Polish' },
  tr: { native: 'Türkçe', english: 'Turkish' },
  vi: { native: 'Tiếng Việt', english: 'Vietnamese' },
  th: { native: 'ไทย', english: 'Thai' },
  id: { native: 'Bahasa Indonesia', english: 'Indonesian' },
  hi: { native: 'हिन्दी', english: 'Hindi' },
  sv: { native: 'Svenska', english: 'Swedish' },
  no: { native: 'Norsk', english: 'Norwegian' },
};

// Define the translation structure
interface TranslationStrings {
  // Navigation
  practice: string;
  explore: string;
  profile: string;

  // Practice Page
  practiceWriting: string;
  chooseLevel: string;
  continueWriting: string;
  continueDraft: string;
  
  // Level Selection
  step1: string;
  step2: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  customTheme: string;
  startWriting: string;

  // Writing Editor
  changeLevelTheme: string;
  targetLevel: string;
  theme: string;
  essayTitle: string;
  titlePlaceholder: string;
  writeEssay: string;
  contentPlaceholder: string;
  minimum: string;
  characters: string;
  overLimit: string;
  needMore: string;
  moreCharacters: string;
  submitAnalysis: string;
  analyzing: string;
  saveDraft: string;
  saving: string;
  autoBackup: string;

  // Profile Page
  hi: string;
  dayStreak: string;
  keepWriting: string;
  yourProgress: string;
  totalEssays: string;
  avgScore: string;
  bestScore: string;
  drafts: string;
  recentEssays: string;
  noEssays: string;
  writeFirst: string;
  delete: string;
  editingDraft: string;

  // Analysis Results
  analysisComplete: string;
  backToEssays: string;
  outstanding: string;
  greatJob: string;
  goodEffort: string;
  keepPracticing: string;
  canDoBetter: string;
  scoreBreakdown: string;
  vocabulary: string;
  sentenceQuality: string;
  structure: string;
  coherence: string;
  recommendations: string;
  hskDistribution: string;
  sentenceAnalysis: string;
  correction: string;
  writeAnother: string;
  viewMyEssays: string;

  // Writing Tips
  writingTips: string;
  tip1Title: string;
  tip1Desc: string;
  tip2Title: string;
  tip2Desc: string;
  tip3Title: string;
  tip3Desc: string;
  tip4Title: string;
  tip4Desc: string;

  // Settings
  settings: string;
  language: string;
  selectLanguage: string;
  feedbackLanguage: string;
  feedbackLanguageDesc: string;

  // Common
  loading: string;
  loadingProfile: string;
  loadingAnalysis: string;
  ago: string;
  unknown: string;
}

const enTranslations: TranslationStrings = {
  // Navigation
  practice: 'Practice',
  explore: 'Explore',
  profile: 'Me',

  // Practice Page
  practiceWriting: 'Practice Writing',
  chooseLevel: 'Choose your level and theme to get started!',
  continueWriting: 'Write your essay and get instant AI feedback!',
  continueDraft: 'Continue writing your draft!',
  
  // Level Selection
  step1: 'Step 1: Choose Your Target HSK Level',
  step2: 'Step 2: Choose a Theme',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  customTheme: 'Enter Your Own Theme',
  startWriting: 'Start Writing',

  // Writing Editor
  changeLevelTheme: 'Change Level/Theme',
  targetLevel: 'Target Level',
  theme: 'Theme',
  essayTitle: 'Essay Title',
  titlePlaceholder: 'Enter your essay title...',
  writeEssay: 'Write your essay',
  contentPlaceholder: 'Start writing your essay...',
  minimum: 'Minimum',
  characters: 'characters',
  overLimit: 'Over limit by',
  needMore: 'Need at least',
  moreCharacters: 'more characters to submit',
  submitAnalysis: 'Submit for Analysis',
  analyzing: 'Analyzing...',
  saveDraft: 'Save Draft',
  saving: 'Saving...',
  autoBackup: 'Auto-backup enabled (saved locally)',

  // Profile Page
  hi: 'Hi',
  dayStreak: 'Day Streak!',
  keepWriting: 'Keep writing to maintain your streak!',
  yourProgress: 'Your Progress',
  totalEssays: 'Total Essays',
  avgScore: 'Avg Score',
  bestScore: 'Best Score',
  drafts: 'Drafts',
  recentEssays: 'Recent Essays',
  noEssays: "You haven't written any essays yet!",
  writeFirst: 'Write Your First Essay',
  delete: 'Delete',
  editingDraft: 'Editing saved draft',

  // Analysis Results
  analysisComplete: 'Analysis Complete!',
  backToEssays: 'Back to My Essays',
  outstanding: 'Outstanding work!',
  greatJob: 'Great job!',
  goodEffort: 'Good effort!',
  keepPracticing: 'Keep practicing!',
  canDoBetter: 'You can do better!',
  scoreBreakdown: 'Score Breakdown',
  vocabulary: 'Vocabulary',
  sentenceQuality: 'Sentence Quality',
  structure: 'Structure',
  coherence: 'Coherence',
  recommendations: 'Recommendations',
  hskDistribution: 'HSK Vocabulary Distribution',
  sentenceAnalysis: 'Sentence Analysis',
  correction: 'Correction',
  writeAnother: 'Write Another Essay',
  viewMyEssays: 'View My Essays',

  // Writing Tips
  writingTips: 'Writing Tips',
  tip1Title: 'Use varied vocabulary',
  tip1Desc: 'Try to use different words instead of repeating the same ones.',
  tip2Title: 'Check your grammar',
  tip2Desc: 'Pay attention to word order, particles (的/得/地), and measure words.',
  tip3Title: 'Write clearly',
  tip3Desc: 'Make sure each sentence has a clear meaning and flows naturally.',
  tip4Title: 'Structure your essay',
  tip4Desc: 'Use paragraphs: introduction, body, and conclusion.',

  // Settings
  settings: 'Settings',
  language: 'Language',
  selectLanguage: 'Select Language',
  feedbackLanguage: 'AI Feedback Language',
  feedbackLanguageDesc: 'Choose which language you want to receive AI feedback in',

  // Common
  loading: 'Loading...',
  loadingProfile: 'Loading your profile...',
  loadingAnalysis: 'Loading analysis...',
  ago: 'ago',
  unknown: 'Unknown',
};

const zhTranslations: TranslationStrings = {
  // Navigation
  practice: '练习',
  explore: '探索',
  profile: '我的',

  // Practice Page
  practiceWriting: '练习写作',
  chooseLevel: '选择你的级别和主题开始吧！',
  continueWriting: '写你的作文并获得即时AI反馈！',
  continueDraft: '继续写你的草稿！',
  
  // Level Selection
  step1: '第一步：选择你的目标HSK级别',
  step2: '第二步：选择一个主题',
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
  customTheme: '输入你自己的主题',
  startWriting: '开始写作',

  // Writing Editor
  changeLevelTheme: '更改级别/主题',
  targetLevel: '目标级别',
  theme: '主题',
  essayTitle: '作文标题',
  titlePlaceholder: '输入你的作文标题...',
  writeEssay: '写作文',
  contentPlaceholder: '开始写你的作文...',
  minimum: '最少',
  characters: '字',
  overLimit: '超过限制',
  needMore: '还需要至少',
  moreCharacters: '个字才能提交',
  submitAnalysis: '提交分析',
  analyzing: '分析中...',
  saveDraft: '保存草稿',
  saving: '保存中...',
  autoBackup: '已启用自动备份（本地保存）',

  // Profile Page
  hi: '你好',
  dayStreak: '天连续！',
  keepWriting: '继续写作以保持你的连续记录！',
  yourProgress: '你的进步',
  totalEssays: '总作文数',
  avgScore: '平均分',
  bestScore: '最高分',
  drafts: '草稿',
  recentEssays: '最近的作文',
  noEssays: '你还没有写任何作文！',
  writeFirst: '写你的第一篇作文',
  delete: '删除',
  editingDraft: '正在编辑已保存的草稿',

  // Analysis Results
  analysisComplete: '分析完成！',
  backToEssays: '返回我的作文',
  outstanding: '非常出色！',
  greatJob: '做得很好！',
  goodEffort: '不错的努力！',
  keepPracticing: '继续练习！',
  canDoBetter: '你可以做得更好！',
  scoreBreakdown: '分数细分',
  vocabulary: '词汇',
  sentenceQuality: '句子质量',
  structure: '结构',
  coherence: '连贯性',
  recommendations: '建议',
  hskDistribution: 'HSK词汇分布',
  sentenceAnalysis: '句子分析',
  correction: '更正',
  writeAnother: '写另一篇作文',
  viewMyEssays: '查看我的作文',

  // Writing Tips
  writingTips: '写作提示',
  tip1Title: '使用多样的词汇',
  tip1Desc: '尝试使用不同的词语，而不是重复使用相同的词。',
  tip2Title: '检查你的语法',
  tip2Desc: '注意词序、助词（的/得/地）和量词。',
  tip3Title: '写得清楚',
  tip3Desc: '确保每个句子都有清晰的含义并自然流畅。',
  tip4Title: '组织你的文章',
  tip4Desc: '使用段落：引言、正文和结论。',

  // Settings
  settings: '设置',
  language: '语言',
  selectLanguage: '选择语言',
  feedbackLanguage: 'AI反馈语言',
  feedbackLanguageDesc: '选择你想要接收AI反馈的语言',

  // Common
  loading: '加载中...',
  loadingProfile: '加载你的个人资料...',
  loadingAnalysis: '加载分析结果...',
  ago: '前',
  unknown: '未知',
};

export const translations: Record<Language, TranslationStrings> = {
  en: enTranslations,
  zh: zhTranslations,
  // Use English as fallback for other languages
  es: enTranslations,
  fr: enTranslations,
  de: enTranslations,
  ja: enTranslations,
  ko: enTranslations,
  pt: enTranslations,
  ru: enTranslations,
  ar: enTranslations,
  it: enTranslations,
  nl: enTranslations,
  pl: enTranslations,
  tr: enTranslations,
  vi: enTranslations,
  th: enTranslations,
  id: enTranslations,
  hi: enTranslations,
  sv: enTranslations,
  no: enTranslations,
};

export type TranslationKey = keyof TranslationStrings;