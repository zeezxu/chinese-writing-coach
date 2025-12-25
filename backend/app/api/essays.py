"""
Essay API endpoints

Handles essay submission, retrieval, and analysis
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import asyncio

from app.database import get_db
from app.models import Essay, EssayAnalysis, User
from app.schemas import (
    EssaySubmit,
    EssayResponse,
    EssayListItem,
    AnalysisResponse,
    MessageResponse
)
from app.services.writing_analyzer import WritingAnalyzer

# Create router
router = APIRouter(prefix="/api/essays", tags=["Essays"])

# Initialize analyzer (will be used for analysis)
analyzer = WritingAnalyzer()


@router.post("/submit", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
async def submit_essay(
    essay_data: EssaySubmit,
    user_id: str,  # TODO: Get from JWT token later
    db: Session = Depends(get_db)
):
    """
    Submit an essay for analysis
    
    This endpoint:
    1. Creates essay record in database
    2. Analyzes the essay using AI
    3. Stores analysis results
    4. Returns complete analysis
    
    **Note:** This requires OpenAI API credits to work!
    """
    # Check if user exists (temporary - will use JWT auth later)
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Create essay record
    essay = Essay(
        user_id=user_id,
        title=essay_data.title,
        content=essay_data.content,
        theme=essay_data.theme,
        target_hsk_level=essay_data.target_hsk_level
    )
    db.add(essay)
    db.commit()
    db.refresh(essay)
    
    print(f"\n{'='*60}")
    print(f"📝 Analyzing essay: {essay.title}")
    print(f"{'='*60}")
    
    try:
        # Analyze essay with AI
        analysis_result = await analyzer.analyze_essay(
            text=essay_data.content,
            target_hsk_level=essay_data.target_hsk_level,
            language=essay_data.language
        )
        
        # Extract scores from analysis
        vocab = analysis_result['vocabulary']
        sentences = analysis_result['sentences']
        scoring = analysis_result['scoring']
        
        # Create analysis record
        essay_analysis = EssayAnalysis(
            essay_id=essay.id,
            
            # Basic stats
            char_count=analysis_result['basic_stats']['char_count'],
            word_count=vocab['total_words'],
            sentence_count=sentences['sentence_count'],
            paragraph_count=analysis_result['basic_stats']['paragraph_count'],
            
            # Vocabulary scores
            unique_words=vocab['unique_words'],
            vocabulary_richness=vocab['ttr'],
            vocabulary_score=vocab['vocabulary_richness_score'],
            advanced_vocab_ratio=vocab['advanced_vocab_ratio'],
            
            # Sentence-level scores
            sentence_quality_score=sentences['quality_score'],
            
            # Essay-level scores (from AI)
            structure_score=scoring['breakdown'].get('structure', 0) if scoring.get('breakdown') else None,
            coherence_score=scoring['breakdown'].get('coherence', 0) if scoring.get('breakdown') else None,
            transition_score=scoring['breakdown'].get('transition', 0) if scoring.get('breakdown') else None,
            logic_score=scoring['breakdown'].get('logic', 0) if scoring.get('breakdown') else None,
            
            # Detailed breakdown
            grammar_score=scoring['breakdown'].get('grammar', 0) if scoring.get('breakdown') else None,
            semantic_score=scoring['breakdown'].get('semantics', 0) if scoring.get('breakdown') else None,
            collocation_score=scoring['breakdown'].get('collocation', 0) if scoring.get('breakdown') else None,
            
            # Overall score
            overall_score=scoring['overall'],
            
            # Detailed JSON data
            vocabulary_details=vocab.get('word_details', {}),
            sentence_details=sentences['ai_analysis'].get('sentence_analysis', []),
            essay_analysis=sentences['ai_analysis'].get('essay_analysis', {}),
            hsk_distribution=vocab.get('hsk_distribution', {}),
            recommendations=analysis_result.get('recommendations', []),
            
            # Metadata
            analysis_language=essay_data.language
        )
        
        db.add(essay_analysis)
        db.commit()
        db.refresh(essay_analysis)
        
        print(f"✅ Analysis complete!")
        print(f"   Overall score: {essay_analysis.overall_score}/100")
        print(f"{'='*60}\n")
        
        return essay_analysis
        
    except Exception as e:
        # If analysis fails, delete the essay and raise error
        db.delete(essay)
        db.commit()
        
        print(f"❌ Analysis failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )


@router.get("", response_model=List[EssayListItem])
def get_user_essays(
    user_id: str,  # TODO: Get from JWT token later
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Get all essays for a user
    
    Returns a list of essays with basic info and scores.
    Use offset/limit for pagination.
    """
    essays = (
        db.query(Essay)
        .filter(Essay.user_id == user_id)
        .order_by(Essay.submitted_at.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )
    
    # Convert to response format with scores from analysis
    result = []
    for essay in essays:
        item = EssayListItem(
            id=essay.id,
            title=essay.title,
            theme=essay.theme,
            target_hsk_level=essay.target_hsk_level,
            submitted_at=essay.submitted_at,
            char_count=essay.char_count,
            overall_score=essay.analysis.overall_score if essay.analysis else None
        )
        result.append(item)
    
    return result


@router.get("/{essay_id}", response_model=EssayResponse)
def get_essay(
    essay_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a single essay by ID
    
    Returns complete essay content.
    """
    essay = db.query(Essay).filter(Essay.id == essay_id).first()
    
    if not essay:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Essay not found"
        )
    
    return essay


@router.get("/{essay_id}/analysis", response_model=AnalysisResponse)
def get_essay_analysis(
    essay_id: str,
    db: Session = Depends(get_db)
):
    """
    Get analysis results for an essay
    
    Returns complete analysis with scores, details, and recommendations.
    """
    analysis = (
        db.query(EssayAnalysis)
        .filter(EssayAnalysis.essay_id == essay_id)
        .first()
    )
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found for this essay"
        )
    
    return analysis


@router.delete("/{essay_id}", response_model=MessageResponse)
def delete_essay(
    essay_id: str,
    db: Session = Depends(get_db)
):
    """
    Delete an essay and its analysis
    
    Cascade delete also removes the associated analysis.
    """
    essay = db.query(Essay).filter(Essay.id == essay_id).first()
    
    if not essay:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Essay not found"
        )
    
    db.delete(essay)
    db.commit()
    
    return MessageResponse(message="Essay deleted successfully")