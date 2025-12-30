// src/types/index.ts

export interface User {
  id: string;
  email: string;
  username: string;
  target_hsk_level: number;
  preferred_language: string;
  dark_mode: boolean;
  created_at: string;
  last_login: string;
}

export interface Essay {
  id: string;
  user_id: string;
  title: string;
  content: string;
  theme?: string;
  target_hsk_level: number;
  submitted_at: string;
  char_count: number;
}

export interface EssayListItem {
  id: string;
  title: string;
  theme?: string;
  target_hsk_level: number;
  submitted_at: string;
  char_count: number;
  overall_score?: number;
}

export interface Draft {
  id: string;
  user_id: string;
  title?: string;
  content?: string;
  theme?: string;
  hsk_level?: number;
  char_count: number;
  created_at: string;
  updated_at: string;
}

// Vocabulary analysis types
export interface WordDetail {
  level: number;
  pinyin: string;
  translation: string;
  frequency: number;
}

export interface VocabularyDetails {
  [word: string]: WordDetail;
}

// Sentence analysis types
export interface SentenceIssue {
  type: string;
  description: string;
  correction?: string;
  severity: 'minor' | 'major' | 'critical';
}

export interface SentenceDetail {
  index: number;
  original: string;
  grammar_score: number;
  semantic_score: number;
  collocation_score: number;
  overall_quality: number;
  issues: SentenceIssue[];
  improvement_suggestion?: string;
}

// Essay-level analysis types
export interface EssayIssue {
  type: string;
  location: string;
  description: string;
  suggestion: string;
  severity: 'minor' | 'major' | 'critical';
}

export interface EssayAnalysisDetail {
  structure_score: number;
  coherence_score: number;
  transition_score: number;
  topic_consistency_score: number;
  logic_score: number;
  structure_feedback: string;
  coherence_feedback: string;
  transition_feedback: string;
  essay_issues: EssayIssue[];
  strengths: string[];
  areas_for_improvement: string[];
}

// Complete analysis interface
export interface Analysis {
  id: string;
  essay_id: string;
  char_count: number;
  word_count: number;
  sentence_count: number;
  paragraph_count: number;
  
  // Scores
  vocabulary_score: number;
  sentence_quality_score: number;
  structure_score?: number;
  coherence_score?: number;
  transition_score?: number;
  logic_score?: number;
  overall_score: number;
  
  // Detailed analysis (properly typed)
  vocabulary_details?: VocabularyDetails;
  sentence_details?: SentenceDetail[];
  essay_analysis?: EssayAnalysisDetail;
  hsk_distribution?: Record<string, number>;
  recommendations?: string[];
  
  analyzed_at: string;
  analysis_language: string;
}

export interface EssaySubmit {
  title: string;
  content: string;
  theme?: string;
  target_hsk_level: number;
  language: string;
}