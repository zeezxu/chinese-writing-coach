# backend/app/models/analysis.py
"""
Essay analysis results and sample essays models
"""
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid

from app.database import Base


class EssayAnalysis(Base):
    """
    Essay analysis results model
    
    Stores comprehensive analysis from AI:
    - Vocabulary analysis (HSK levels, richness, etc.)
    - Sentence-level analysis (grammar, semantics, collocation)
    - Essay-level analysis (structure, coherence, transitions, logic)
    - Overall scoring and recommendations
    """
    __tablename__ = "essay_analysis"
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Foreign key (one-to-one with Essay)
    essay_id = Column(String(36), ForeignKey("essays.id"), unique=True, nullable=False, index=True)
    
    # BASIC STATISTICS
    char_count = Column(Integer)  # Chinese characters only
    word_count = Column(Integer)  # Word count via jieba
    sentence_count = Column(Integer)
    paragraph_count = Column(Integer)
    
    # VOCABULARY ANALYSIS SCORES
    unique_words = Column(Integer)  # Number of unique words
    vocabulary_richness = Column(Float)  # TTR (Type-Token Ratio)
    vocabulary_score = Column(Integer)  # 0-100
    advanced_vocab_ratio = Column(Float)  # Ratio of HSK 4-6 words
    
    # SENTENCE-LEVEL SCORES
    sentence_quality_score = Column(Integer)  # 0-100 (average of all sentences)
    grammar_score = Column(Integer)  # 0-100 (average across sentences)
    semantic_score = Column(Integer)  # 0-100 (average)
    collocation_score = Column(Integer)  # 0-100 (average)
    
    # ESSAY-LEVEL SCORES
    structure_score = Column(Integer)  # 0-100 (overall structure)
    coherence_score = Column(Integer)  # 0-100 (flow between sentences/paragraphs)
    transition_score = Column(Integer)  # 0-100 (transition quality)
    topic_consistency_score = Column(Integer)  # 0-100 (stays on topic)
    logic_score = Column(Integer)  # 0-100 (logical argumentation)
    
    # OVERALL SCORE
    overall_score = Column(Integer)  # 0-100 (weighted combination)

    # DETAILED DATA (stored as JSON)
    vocabulary_details = Column(JSON)  # Word-by-word breakdown
    # Example structure:
    # {
    #   "我": {"level": 1, "pinyin": "wǒ", "translation": "I", "frequency": 3},
    #   "喜欢": {"level": 2, "pinyin": "xǐhuan", "translation": "like", "frequency": 2}
    # }
    
    sentence_details = Column(JSON)  # Sentence-by-sentence analysis from AI
    # Example structure:
    # [
    #   {
    #     "index": 1,
    #     "original": "我喜欢学习中文",
    #     "grammar_score": 95,
    #     "issues": [{"type": "...", "description": "...", "correction": "..."}]
    #   }
    # ]
    
    essay_analysis = Column(JSON)  # Essay-level analysis from AI
    # Example structure:
    # {
    #   "structure_feedback": "The essay has clear beginning...",
    #   "essay_issues": [
    #     {"type": "Abrupt transition", "location": "Between para 1 and 2", ...}
    #   ],
    #   "strengths": ["Clear topic", "Good vocabulary"],
    #   "areas_for_improvement": ["Add more transitions", "Improve coherence"]
    # }
    
    hsk_distribution = Column(JSON)  # HSK level distribution
    # Example structure:
    # {"1": 10, "2": 15, "3": 8, "4": 3, "5": 1, "6": 0, "unknown": 2}
    
    recommendations = Column(JSON)  # List of actionable recommendations
    # Example structure:
    # [
    #   "Found 3 word order errors - focus on adverb placement",
    #   "Add transition words between paragraphs",
    #   "Excellent vocabulary richness - keep it up!"
    # ]
    
    # METADATA
    analyzed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
    analysis_language = Column(String(10), default="en")  # Language of AI feedback (en, zh, es, fr, etc.)
    
    # RELATIONSHIPS
    essay = relationship("Essay", back_populates="analysis")
    
    def __repr__(self):
        return f"<EssayAnalysis essay_id={self.essay_id} score={self.overall_score}>"


class SampleEssay(Base):
    """
    Sample essays for the Explore tab
    
    High-quality example essays for students to learn from:
    - AI-generated or curated by teachers
    - Organized by HSK level and theme
    - Include analysis highlights and teaching points
    """
    __tablename__ = "sample_essays"
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # ESSAY CONTENT
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    theme = Column(String(100), nullable=False, index=True)  # e.g., "Daily Life", "Travel", "Environment"
    hsk_level = Column(Integer, nullable=False, index=True)  # 1-6

    # QUALITY SCORES (for reference)
    overall_score = Column(Integer)  # 0-100 (should be 85+ for samples)
    vocabulary_score = Column(Integer)  # 0-100
    sentence_quality_score = Column(Integer)  # 0-100

    # ANALYSIS SUMMARY (teaching points)
    analysis_summary = Column(JSON)  # Brief analysis highlights
    # Example structure:
    # {
    #   "why_good": "Excellent use of transition words and varied sentence structures",
    #   "key_features": ["Natural flow", "Advanced vocabulary", "Clear structure"],
    #   "target_audience": "HSK 4 students preparing for writing test"
    # }
    
    highlights = Column(JSON)  # What makes this essay good
    # Example structure:
    # [
    #   "Great vocabulary: Uses HSK 4-5 words naturally",
    #   "Excellent structure: Clear introduction, body, conclusion",
    #   "Smooth transitions: Uses 首先, 其次, 最后 effectively"
    # ]
    
    key_techniques = Column(JSON)  # Writing techniques demonstrated
    # Example structure:
    # [
    #   "Parallel structure: 我不仅...而且...",
    #   "Transition words: 因此, 然而, 此外",
    #   "Descriptive language: Uses vivid adjectives"
    # ]
    
    # METADATA
    is_featured = Column(Boolean, default=False, index=True)  # Show on featured list
    view_count = Column(Integer, default=0)  # Track popularity
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f"<SampleEssay {self.title[:30]} HSK{self.hsk_level} score={self.overall_score}>"
    
    # Computed property
    @property
    def char_count(self) -> int:
        """Get Chinese character count"""
        import re
        chinese_chars = re.findall(r'[\u4e00-\u9fa5]', self.content)
        return len(chinese_chars)
    