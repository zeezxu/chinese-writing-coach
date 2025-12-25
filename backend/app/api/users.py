"""
User API endpoints

Handles user creation and settings (auth will be added later)
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import (
    UserRegister,
    UserResponse,
    UserUpdate,
    MessageResponse
)

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    """
    Register a new user (simplified - no real auth yet)
    
    TODO: Add password hashing and JWT tokens
    """
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username already exists
    existing_username = db.query(User).filter(User.username == user_data.username).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create user (storing plain password for now - will hash later!)
    user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=f"PLAIN_{user_data.password}",  # TODO: Hash this!
        target_hsk_level=user_data.target_hsk_level,
        preferred_language=user_data.preferred_language
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return user


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    db: Session = Depends(get_db)
):
    """Get user by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user


@router.put("/{user_id}/settings", response_model=UserResponse)
def update_user_settings(
    user_id: str,
    settings: UserUpdate,
    db: Session = Depends(get_db)
):
    """Update user settings"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update settings
    if settings.target_hsk_level is not None:
        user.target_hsk_level = settings.target_hsk_level
    if settings.preferred_language is not None:
        user.preferred_language = settings.preferred_language
    if settings.dark_mode is not None:
        user.dark_mode = settings.dark_mode
    
    db.commit()
    db.refresh(user)
    
    return user