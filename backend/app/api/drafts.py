"""
Draft API endpoints

Handles saving and managing essay drafts
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Draft, User
from app.schemas import (
    DraftCreate,
    DraftUpdate,
    DraftResponse,
    MessageResponse
)
from app.auth import get_current_active_user

router = APIRouter(prefix="/api/drafts", tags=["Drafts"])


@router.post("", response_model=DraftResponse, status_code=status.HTTP_201_CREATED)
def create_draft(
    draft_data: DraftCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Create a new draft (requires authentication)

    Drafts are auto-saved while the user is writing.
    """
    draft = Draft(
        user_id=current_user.id,
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
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get all drafts for the authenticated user (requires authentication)

    Returns drafts ordered by most recently updated.
    """
    drafts = (
        db.query(Draft)
        .filter(Draft.user_id == current_user.id)
        .order_by(Draft.updated_at.desc())
        .all()
    )
    
    return drafts


@router.get("/{draft_id}", response_model=DraftResponse)
def get_draft(
    draft_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get a single draft by ID (requires authentication)

    User can only access their own drafts.
    """
    draft = db.query(Draft).filter(Draft.id == draft_id).first()

    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found"
        )

    # Ensure user can only access their own drafts
    if draft.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this draft"
        )

    return draft


@router.put("/{draft_id}", response_model=DraftResponse)
def update_draft(
    draft_id: str,
    draft_data: DraftUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update a draft (requires authentication)

    Updates the draft with new content. updated_at is automatically updated.
    User can only update their own drafts.
    """
    draft = db.query(Draft).filter(Draft.id == draft_id).first()

    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found"
        )

    # Ensure user can only update their own drafts
    if draft.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this draft"
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
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Delete a draft (requires authentication)

    User can only delete their own drafts.
    """
    draft = db.query(Draft).filter(Draft.id == draft_id).first()

    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft not found"
        )

    # Ensure user can only delete their own drafts
    if draft.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this draft"
        )

    db.delete(draft)
    db.commit()

    return MessageResponse(message="Draft deleted successfully")