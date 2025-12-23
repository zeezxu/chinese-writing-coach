"""
Pydantic schemas for Essay Analysis
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any

# ANALYSIS RESPONSE

class AnalysisResponse(BaseModel):
    """Schema for complete analysis results"""
    id: str
    essay_id: str
    
    # Basic stats
    char_count: int
    word_count: int
    sentence_count: int
    paragraph_count: int
    
    # Vocabulary scores
    unique_words: int
    vocabulary_richness: float
    vocabulary_score: int
    advanced_vocab_ratio: float
    
    # Sentence-level scores
    sentence_quality_score: int
    grammar_score: Optional[int]
    semantic_score: Optional[int]
    collocation_score: Optional[int]
    
    # Essay-level scores
    structure_score: Optional[int]
    coherence_score: Optional[int]
    transition_score: Optional[int]
    topic_consistency_score: Optional[int]
    logic_score: Optional[int]
    
    # Overall
    overall_score: int
    
    # Detailed data
    vocabulary_details: Optional[Dict[str, Any]]
    sentence_details: Optional[List[Dict[str, Any]]]
    essay_analysis: Optional[Dict[str, Any]]
    hsk_distribution: Optional[Dict[str, int]]
    recommendations: Optional[List[str]]
    
    # Metadata
    analyzed_at: datetime
    analysis_language: str
    
    class Config:
        from_attributes = True


class AnalysisSummary(BaseModel):
    """Schema for analysis summary (lighter version for lists)"""
    id: str
    essay_id: str
    overall_score: int
    vocabulary_score: int
    sentence_quality_score: int
    analyzed_at: datetime
    
    class Config:
        from_attributes = True

# SAMPLE ESSAY SCHEMAS

class SampleEssayResponse(BaseModel):
    """Schema for sample essay"""
    id: str
    title: str
    content: str
    theme: str
    hsk_level: int
    overall_score: Optional[int]
    vocabulary_score: Optional[int]
    sentence_quality_score: Optional[int]
    analysis_summary: Optional[Dict[str, Any]]
    highlights: Optional[List[str]]
    key_techniques: Optional[List[str]]
    is_featured: bool
    view_count: int
    char_count: int  # From @property
    created_at: datetime
    
    class Config:
        from_attributes = True


class SampleEssayListItem(BaseModel):
    """Schema for sample essay in list (lighter)"""
    id: str
    title: str
    theme: str
    hsk_level: int
    overall_score: Optional[int]
    char_count: int
    is_featured: bool
    
    class Config:
        from_attributes = True