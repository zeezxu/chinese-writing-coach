"""
User API endpoints

Handles user authentication, registration, and settings
"""
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, PasswordResetToken
from app.schemas import (
    UserRegister,
    UserLogin,
    UserResponse,
    UserUpdate,
    Token,
    MessageResponse
)
from app.auth import (
    get_password_hash,
    authenticate_user,
    create_access_token,
    get_current_active_user,
    verify_password
)
from app.config import get_settings

settings = get_settings()

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register_user(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    """
    Register a new user with hashed password and return JWT token
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

    # Create user with hashed password
    user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=get_password_hash(user_data.password),
        target_hsk_level=user_data.target_hsk_level,
        preferred_language=user_data.preferred_language
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Create access token
    access_token = create_access_token(data={"sub": user.id})

    return Token(access_token=access_token, user=user)


@router.post("/login", response_model=Token)
def login_user(
    user_data: UserLogin,
    db: Session = Depends(get_db)
):
    """
    Login with email and password, returns JWT token
    """
    # Authenticate user
    user = authenticate_user(user_data.email, user_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update last login time
    user.last_login = datetime.now(timezone.utc)
    db.commit()

    # Create access token
    access_token = create_access_token(data={"sub": user.id})

    return Token(access_token=access_token, user=user)


@router.get("/me", response_model=UserResponse)
def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get current authenticated user's information
    """
    return current_user


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


@router.put("/me/settings", response_model=UserResponse)
def update_user_settings(
    settings: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update current user's settings (requires authentication)
    """
    # Update settings
    if settings.target_hsk_level is not None:
        current_user.target_hsk_level = settings.target_hsk_level
    if settings.preferred_language is not None:
        current_user.preferred_language = settings.preferred_language
    if settings.dark_mode is not None:
        current_user.dark_mode = settings.dark_mode

    db.commit()
    db.refresh(current_user)

    return current_user

# Password Reset Endpoints

@router.post("/forgot-password", response_model=MessageResponse)
def request_password_reset(
    email: str,
    db: Session = Depends(get_db)
):
    """
    Request a password reset email
    
    In production, this would send an email with a reset link.
    For now, it logs the token to console.
    """
    # Find user by email
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # Don't reveal if email exists or not (security best practice)
        return MessageResponse(
            message="If an account with that email exists, a password reset link has been sent."
        )
    
    # Delete any existing unused tokens for this user
    db.query(PasswordResetToken).filter(
        PasswordResetToken.user_id == user.id,
        PasswordResetToken.used == 'N'
    ).delete()
    
    # Create new reset token
    reset_token = PasswordResetToken(
        user_id=user.id,
        token=PasswordResetToken.generate_token(),
        expires_at=PasswordResetToken.create_expiry()
    )
    
    db.add(reset_token)
    db.commit()
    
    # In production, send email here
    # For now, log to console
    print(f"\n{'='*60}")
    print(f"PASSWORD RESET TOKEN for {user.email}")
    print(f"Token: {reset_token.token}")
    print(f"Reset URL: http://localhost:5173/reset-password?token={reset_token.token}")
    print(f"Expires at: {reset_token.expires_at}")
    print(f"{'='*60}\n")
    
    return MessageResponse(
        message="If an account with that email exists, a password reset link has been sent."
    )


@router.post("/reset-password", response_model=MessageResponse)
def reset_password(
    token: str,
    new_password: str,
    db: Session = Depends(get_db)
):
    """
    Reset password using a valid token
    """
    # Validate password length
    if len(new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long"
        )
    
    # Find the token
    reset_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == token
    ).first()
    
    if not reset_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Check if token is valid
    if not reset_token.is_valid():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Get the user
    user = db.query(User).filter(User.id == reset_token.user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.hashed_password = get_password_hash(new_password)
    
    # Mark token as used
    reset_token.used = 'Y'
    
    db.commit()
    
    print(f"Password reset successful for user: {user.email}")
    
    return MessageResponse(message="Password has been reset successfully. You can now login with your new password.")


@router.get("/verify-reset-token/{token}")
def verify_reset_token(
    token: str,
    db: Session = Depends(get_db)
):
    """
    Verify if a reset token is valid (used by frontend)
    """
    reset_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == token
    ).first()
    
    if not reset_token or not reset_token.is_valid():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    return {"valid": True, "message": "Token is valid"}
