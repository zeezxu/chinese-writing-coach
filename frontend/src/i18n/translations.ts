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

  // Five Elements
  wood: string;
  fire: string;
  earth: string;
  metal: string;
  water: string;
  level: string;
  currentElement: string;
  nextElement: string;
  progress: string;
  needEssays: string;
  needScore: string;
  essaysToNext: string;
  avgScoreToNext: string;
  elementJourney: string;
  
  // Element Messages
  woodMessage: string;
  fireMessage: string;
  earthMessage: string;
  metalMessage: string;
  waterMessage: string;

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
  chooseAppLanguage: string;
  feedbackLanguage: string;
  feedbackLanguageDesc: string;

  // HSK Level
  targetHSKLevel: string;
  chooseTargetHSK: string;
  changesSavedAuto: string;
  selectHSKLevel: string;
  hskLevelDesc: string;

  // Account
  account: string;
  loggedInAs: string;
  logOut: string;

  // Authentication
  auth: {
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Sign in to continue your Chinese writing journey',
    createAccount: 'Create Account',
    registerSubtitle: 'Start your Chinese writing journey',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    targetLevel: 'Target HSK Level',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
  },

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

  // Five Elements
  wood: 'Wood',
  fire: 'Fire',
  earth: 'Earth',
  metal: 'Metal',
  water: 'Water',
  level: 'Level',
  currentElement: 'Current Element',
  nextElement: 'To Next Element',
  progress: 'Progress',
  needEssays: 'essays needed',
  needScore: 'average score needed',
  essaysToNext: 'essays to reach',
  avgScoreToNext: 'avg score to reach',
  elementJourney: 'Element Journey',
  
  // Element Messages
  woodMessage: 'Great start! Every journey begins with a single step!',
  fireMessage: "You're on fire! Your passion is burning bright!",
  earthMessage: 'Solid foundation! You\'re building something great!',
  metalMessage: 'Sharp and precise! Your skills are refined!',
  waterMessage: 'Flowing naturally! You\'ve achieved mastery!',

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
  chooseAppLanguage: 'Choose the language for this app',
  feedbackLanguage: 'AI Feedback Language',
  feedbackLanguageDesc: 'Choose which language you want to receive AI feedback in',

  // HSK Level
  targetHSKLevel: 'Target HSK Level',
  chooseTargetHSK: 'Choose your target HSK level',
  changesSavedAuto: 'This helps us tailor feedback to your learning goals. Changes are saved automatically.',
  selectHSKLevel: 'Select Your HSK Level',
  hskLevelDesc: 'Choose your target HSK level. This helps us tailor feedback to your learning goals. You can change this later in your profile.',

  // Account
  account: 'Account',
  loggedInAs: 'Logged in as',
  logOut: 'Log Out',

  // Authentication
  auth: {
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Sign in to continue your Chinese writing journey',
    createAccount: 'Create Account',
    registerSubtitle: 'Start your Chinese writing journey',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    targetLevel: 'Target HSK Level',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
  },

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

  // Five Elements
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水',
  level: '级别',
  currentElement: '当前元素',
  nextElement: '到下一个元素',
  progress: '进度',
  needEssays: '篇作文',
  needScore: '平均分',
  essaysToNext: '篇作文达到',
  avgScoreToNext: '平均分达到',
  elementJourney: '元素之旅',
  
  // Element Messages
  woodMessage: '很好的开始！千里之行始于足下！',
  fireMessage: '你正在燃烧！你的热情熊熊燃烧！',
  earthMessage: '坚实的基础！你正在建造伟大的东西！',
  metalMessage: '锋利而精准！你的技能已经精炼！',
  waterMessage: '自然流动！你已达到精通！',

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
  chooseAppLanguage: '选择此应用的语言',
  feedbackLanguage: 'AI反馈语言',
  feedbackLanguageDesc: '选择你想要接收AI反馈的语言',

  // HSK Level
  targetHSKLevel: '目标HSK级别',
  chooseTargetHSK: '选择你的目标HSK级别',
  changesSavedAuto: '这有助于我们根据你的学习目标定制反馈。更改会自动保存。',
  selectHSKLevel: '选择你的HSK级别',
  hskLevelDesc: '选择你的目标HSK级别。这有助于我们根据你的学习目标定制反馈。你可以稍后在个人资料中更改。',

  // Account
  account: '账户',
  loggedInAs: '登录身份',
  logOut: '退出登录',

  // Authentication
  auth: {
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Sign in to continue your Chinese writing journey',
    createAccount: 'Create Account',
    registerSubtitle: 'Start your Chinese writing journey',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    targetLevel: 'Target HSK Level',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
  },

  // Common
  loading: '加载中...',
  loadingProfile: '加载你的个人资料...',
  loadingAnalysis: '加载分析结果...',
  ago: '前',
  unknown: '未知',
};

const esTranslations: TranslationStrings = {
  // Navigation
  practice: 'Practicar',
  explore: 'Explorar',
  profile: 'Perfil',

  // Practice Page
  practiceWriting: 'Practicar Escritura',
  chooseLevel: '¡Elige tu nivel y tema para comenzar!',
  continueWriting: '¡Escribe tu ensayo y obtén retroalimentación instantánea de IA!',
  continueDraft: '¡Continúa escribiendo tu borrador!',
  
  // Level Selection
  step1: 'Paso 1: Elige tu Nivel HSK Objetivo',
  step2: 'Paso 2: Elige un Tema',
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  customTheme: 'Ingresa tu Propio Tema',
  startWriting: 'Comenzar a Escribir',

  // Writing Editor
  changeLevelTheme: 'Cambiar Nivel/Tema',
  targetLevel: 'Nivel Objetivo',
  theme: 'Tema',
  essayTitle: 'Título del Ensayo',
  titlePlaceholder: 'Ingresa el título de tu ensayo...',
  writeEssay: 'Escribe tu ensayo',
  contentPlaceholder: 'Comienza a escribir tu ensayo...',
  minimum: 'Mínimo',
  characters: 'caracteres',
  overLimit: 'Excede el límite por',
  needMore: 'Necesitas al menos',
  moreCharacters: 'más caracteres para enviar',
  submitAnalysis: 'Enviar para Análisis',
  analyzing: 'Analizando...',
  saveDraft: 'Guardar Borrador',
  saving: 'Guardando...',
  autoBackup: 'Copia de seguridad automática habilitada (guardado localmente)',

  // Profile Page
  hi: 'Hola',
  dayStreak: '¡Racha de Días!',
  keepWriting: '¡Sigue escribiendo para mantener tu racha!',
  yourProgress: 'Tu Progreso',
  totalEssays: 'Ensayos Totales',
  avgScore: 'Puntuación Media',
  bestScore: 'Mejor Puntuación',
  drafts: 'Borradores',
  recentEssays: 'Ensayos Recientes',
  noEssays: '¡Aún no has escrito ningún ensayo!',
  writeFirst: 'Escribe tu Primer Ensayo',
  delete: 'Eliminar',
  editingDraft: 'Editando borrador guardado',

  // Five Elements
  wood: 'Madera',
  fire: 'Fuego',
  earth: 'Tierra',
  metal: 'Metal',
  water: 'Agua',
  level: 'Nivel',
  currentElement: 'Elemento Actual',
  nextElement: 'Al Próximo Elemento',
  progress: 'Progreso',
  needEssays: 'ensayos necesarios',
  needScore: 'puntuación promedio necesaria',
  essaysToNext: 'ensayos para alcanzar',
  avgScoreToNext: 'puntuación promedio para alcanzar',
  elementJourney: 'Viaje de Elementos',
  
  // Element Messages
  woodMessage: '¡Gran comienzo! ¡Cada viaje comienza con un solo paso!',
  fireMessage: '¡Estás en llamas! ¡Tu pasión arde intensamente!',
  earthMessage: '¡Base sólida! ¡Estás construyendo algo grandioso!',
  metalMessage: '¡Afilado y preciso! ¡Tus habilidades están refinadas!',
  waterMessage: '¡Fluyendo naturalmente! ¡Has alcanzado la maestría!',

  // Analysis Results
  analysisComplete: '¡Análisis Completo!',
  backToEssays: 'Volver a Mis Ensayos',
  outstanding: '¡Trabajo excepcional!',
  greatJob: '¡Gran trabajo!',
  goodEffort: '¡Buen esfuerzo!',
  keepPracticing: '¡Sigue practicando!',
  canDoBetter: '¡Puedes hacerlo mejor!',
  scoreBreakdown: 'Desglose de Puntuación',
  vocabulary: 'Vocabulario',
  sentenceQuality: 'Calidad de Oraciones',
  structure: 'Estructura',
  coherence: 'Coherencia',
  recommendations: 'Recomendaciones',
  hskDistribution: 'Distribución de Vocabulario HSK',
  sentenceAnalysis: 'Análisis de Oraciones',
  correction: 'Corrección',
  writeAnother: 'Escribir Otro Ensayo',
  viewMyEssays: 'Ver Mis Ensayos',

  // Writing Tips
  writingTips: 'Consejos de Escritura',
  tip1Title: 'Usa vocabulario variado',
  tip1Desc: 'Intenta usar palabras diferentes en lugar de repetir las mismas.',
  tip2Title: 'Revisa tu gramática',
  tip2Desc: 'Presta atención al orden de las palabras, partículas (的/得/地) y palabras de medida.',
  tip3Title: 'Escribe claramente',
  tip3Desc: 'Asegúrate de que cada oración tenga un significado claro y fluya naturalmente.',
  tip4Title: 'Estructura tu ensayo',
  tip4Desc: 'Usa párrafos: introducción, cuerpo y conclusión.',

  // Settings
  settings: 'Configuración',
  language: 'Idioma',
  selectLanguage: 'Seleccionar Idioma',
  chooseAppLanguage: 'Elige el idioma para esta aplicación',
  feedbackLanguage: 'Idioma de Retroalimentación IA',
  feedbackLanguageDesc: 'Elige el idioma en el que deseas recibir retroalimentación de IA',

  // HSK Level
  targetHSKLevel: 'Nivel HSK Objetivo',
  chooseTargetHSK: 'Elige tu nivel HSK objetivo',
  changesSavedAuto: 'Esto nos ayuda a adaptar la retroalimentación a tus objetivos de aprendizaje. Los cambios se guardan automáticamente.',
  selectHSKLevel: 'Selecciona Tu Nivel HSK',
  hskLevelDesc: 'Elige tu nivel HSK objetivo. Esto nos ayuda a adaptar la retroalimentación a tus objetivos de aprendizaje. Puedes cambiarlo más tarde en tu perfil.',

  // Account
  account: 'Cuenta',
  loggedInAs: 'Conectado como',
  logOut: 'Cerrar Sesión',

  // Authentication
  auth: {
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Sign in to continue your Chinese writing journey',
    createAccount: 'Create Account',
    registerSubtitle: 'Start your Chinese writing journey',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    targetLevel: 'Target HSK Level',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
  },

  // Common
  loading: 'Cargando...',
  loadingProfile: 'Cargando tu perfil...',
  loadingAnalysis: 'Cargando análisis...',
  ago: 'hace',
  unknown: 'Desconocido',
};

const frTranslations: TranslationStrings = {
  // Navigation
  practice: 'Pratiquer',
  explore: 'Explorer',
  profile: 'Profil',

  // Practice Page
  practiceWriting: 'Pratiquer l\'Écriture',
  chooseLevel: 'Choisissez votre niveau et thème pour commencer !',
  continueWriting: 'Écrivez votre essai et obtenez des commentaires IA instantanés !',
  continueDraft: 'Continuez à écrire votre brouillon !',
  
  // Level Selection
  step1: 'Étape 1 : Choisissez votre Niveau HSK Cible',
  step2: 'Étape 2 : Choisissez un Thème',
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
  customTheme: 'Entrez Votre Propre Thème',
  startWriting: 'Commencer à Écrire',

  // Writing Editor
  changeLevelTheme: 'Changer Niveau/Thème',
  targetLevel: 'Niveau Cible',
  theme: 'Thème',
  essayTitle: 'Titre de l\'Essai',
  titlePlaceholder: 'Entrez le titre de votre essai...',
  writeEssay: 'Écrivez votre essai',
  contentPlaceholder: 'Commencez à écrire votre essai...',
  minimum: 'Minimum',
  characters: 'caractères',
  overLimit: 'Dépasse la limite de',
  needMore: 'Besoin d\'au moins',
  moreCharacters: 'caractères supplémentaires pour soumettre',
  submitAnalysis: 'Soumettre pour Analyse',
  analyzing: 'Analyse en cours...',
  saveDraft: 'Enregistrer le Brouillon',
  saving: 'Enregistrement...',
  autoBackup: 'Sauvegarde automatique activée (enregistré localement)',

  // Profile Page
  hi: 'Bonjour',
  dayStreak: 'Série de Jours !',
  keepWriting: 'Continuez à écrire pour maintenir votre série !',
  yourProgress: 'Votre Progrès',
  totalEssays: 'Total des Essais',
  avgScore: 'Score Moyen',
  bestScore: 'Meilleur Score',
  drafts: 'Brouillons',
  recentEssays: 'Essais Récents',
  noEssays: 'Vous n\'avez pas encore écrit d\'essais !',
  writeFirst: 'Écrire Votre Premier Essai',
  delete: 'Supprimer',
  editingDraft: 'Modification du brouillon enregistré',

  // Five Elements
  wood: 'Bois',
  fire: 'Feu',
  earth: 'Terre',
  metal: 'Métal',
  water: 'Eau',
  level: 'Niveau',
  currentElement: 'Élément Actuel',
  nextElement: 'Vers le Prochain Élément',
  progress: 'Progrès',
  needEssays: 'essais nécessaires',
  needScore: 'score moyen nécessaire',
  essaysToNext: 'essais pour atteindre',
  avgScoreToNext: 'score moyen pour atteindre',
  elementJourney: 'Voyage des Éléments',
  
  // Element Messages
  woodMessage: 'Excellent début ! Chaque voyage commence par un seul pas !',
  fireMessage: 'Vous êtes en feu ! Votre passion brûle intensément !',
  earthMessage: 'Base solide ! Vous construisez quelque chose de grand !',
  metalMessage: 'Tranchant et précis ! Vos compétences sont raffinées !',
  waterMessage: 'Coulant naturellement ! Vous avez atteint la maîtrise !',

  // Analysis Results
  analysisComplete: 'Analyse Terminée !',
  backToEssays: 'Retour à Mes Essais',
  outstanding: 'Excellent travail !',
  greatJob: 'Très bon travail !',
  goodEffort: 'Bon effort !',
  keepPracticing: 'Continuez à pratiquer !',
  canDoBetter: 'Vous pouvez faire mieux !',
  scoreBreakdown: 'Répartition des Scores',
  vocabulary: 'Vocabulaire',
  sentenceQuality: 'Qualité des Phrases',
  structure: 'Structure',
  coherence: 'Cohérence',
  recommendations: 'Recommandations',
  hskDistribution: 'Distribution du Vocabulaire HSK',
  sentenceAnalysis: 'Analyse des Phrases',
  correction: 'Correction',
  writeAnother: 'Écrire un Autre Essai',
  viewMyEssays: 'Voir Mes Essais',

  // Writing Tips
  writingTips: 'Conseils d\'Écriture',
  tip1Title: 'Utilisez un vocabulaire varié',
  tip1Desc: 'Essayez d\'utiliser des mots différents au lieu de répéter les mêmes.',
  tip2Title: 'Vérifiez votre grammaire',
  tip2Desc: 'Faites attention à l\'ordre des mots, aux particules (的/得/地) et aux mots de mesure.',
  tip3Title: 'Écrivez clairement',
  tip3Desc: 'Assurez-vous que chaque phrase a un sens clair et s\'enchaîne naturellement.',
  tip4Title: 'Structurez votre essai',
  tip4Desc: 'Utilisez des paragraphes : introduction, corps et conclusion.',

  // Settings
  settings: 'Paramètres',
  language: 'Langue',
  selectLanguage: 'Sélectionner la Langue',
  chooseAppLanguage: 'Choisissez la langue pour cette application',
  feedbackLanguage: 'Langue de Retour IA',
  feedbackLanguageDesc: 'Choisissez la langue dans laquelle vous souhaitez recevoir les commentaires IA',

  // HSK Level
  targetHSKLevel: 'Niveau HSK Cible',
  chooseTargetHSK: 'Choisissez votre niveau HSK cible',
  changesSavedAuto: 'Cela nous aide à adapter les commentaires à vos objectifs d\'apprentissage. Les modifications sont enregistrées automatiquement.',
  selectHSKLevel: 'Sélectionnez Votre Niveau HSK',
  hskLevelDesc: 'Choisissez votre niveau HSK cible. Cela nous aide à adapter les commentaires à vos objectifs d\'apprentissage. Vous pouvez le modifier plus tard dans votre profil.',

  // Account
  account: 'Compte',
  loggedInAs: 'Connecté en tant que',
  logOut: 'Se Déconnecter',

  // Authentication
  auth: {
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Sign in to continue your Chinese writing journey',
    createAccount: 'Create Account',
    registerSubtitle: 'Start your Chinese writing journey',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    targetLevel: 'Target HSK Level',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
  },

  // Common
  loading: 'Chargement...',
  loadingProfile: 'Chargement de votre profil...',
  loadingAnalysis: 'Chargement de l\'analyse...',
  ago: 'il y a',
  unknown: 'Inconnu',
};

export const translations: Record<Language, TranslationStrings> = {
  en: enTranslations,
  zh: zhTranslations,
  es: esTranslations,
  fr: frTranslations,
  // Use English as fallback for other languages
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