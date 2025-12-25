"""
Draft API endpoints

Handles saving and managing essay drafts
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Draft
from app.schemas import (
    DraftCreate,
    DraftUpdate,
    DraftResponse,
    MessageResponse
)

router = APIRouter(prefix="/api/drafts", tags=["Drafts"])


@router.post("", response_model=DraftResponse, status_code=status.HTTP_201_CREATED)
def create_draft(
    draft_data: DraftCreate,
    user_id: str,  # TODO: Get from JWT token later
    db: Session = Depends(get_db)
):
    """
    Create a new draft
    
    Drafts are auto-saved while the user is writing.
    """
    draft = Draft(
        user_id=user_id,
        title=draft_data.title,
        content=draft_data.content,
        theme=draft_data.theme,
        hsk_level=draft_data.hsk_level,
        char_count=draft_data.char_count
    )
    
    db.add(draft)
    db.commit()
    db.refresh(draft)
    
    return draft


@router.get("", response_model=List[DraftResponse])
def get_user_drafts(
    user_id: str,  # TODO: Get from JWT token later
    db: Session = Depends(get_db)
):
    """
    Get all drafts for a user
    
    Returns drafts ordered by most recently updated.
    """
    drafts = (
        db.query(Draft)
        .filter(Draft.user_id == user_id)
        .order_by(Draft.updated_at.desc())
        .all()
    )
    
    return drafts


@router.get("/{draft_id}", response_model=DraftResponse)
def get_draft(
    draft_id: str,
    db: Session = Depends(get_db)
):
    """Get a single draft by ID"""
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found"
        )
    
    return draft


@router.put("/{draft_id}", response_model=DraftResponse)
def update_draft(
    draft_id: str,
    draft_data: DraftUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a draft
    
    Updates the draft with new content. updated_at is automatically updated.
    """
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found"
        )
    
    # Update fields (only if provided)
    if draft_data.title is not None:
        draft.title = draft_data.title
    if draft_data.content is not None:
        draft.content = draft_data.content
    if draft_data.theme is not None:
        draft.theme = draft_data.theme
    if draft_data.hsk_level is not None:
        draft.hsk_level = draft_data.hsk_level
    if draft_data.char_count is not None:
        draft.char_count = draft_data.char_count
    
    db.commit()
    db.refresh(draft)
    
    return draft


@router.delete("/{draft_id}", response_model=MessageResponse)
def delete_draft(
    draft_id: str,
    db: Session = Depends(get_db)
):
    """Delete a draft"""
    draft = db.query(Draft).filter(Draft.id == draft_id).first()
    
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found"
        )
    
    db.delete(draft)
    db.commit()
    
    return MessageResponse(message="Draft deleted successfully")