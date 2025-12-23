"""
Pydantic schemas for User-related requests and responses
"""
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# USER REGISTRATION & LOGIN

class UserRegister(BaseModel):
    """Schema for user registration request"""
    email: EmailStr  # Validates email format
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=100)
    target_hsk_level: int = Field(default=3, ge=1, le=6)
    preferred_language: str = Field(default="en", max_length=10)
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "student@example.com",
                "username": "chineselearner",
                "password": "SecurePass123!",
                "target_hsk_level": 3,
                "preferred_language": "en"
            }
        }


class UserLogin(BaseModel):
    """Schema for user login request"""
    email: EmailStr
    password: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "student@example.com",
                "password": "SecurePass123!"
            }
        }

# USER RESPONSES

class UserResponse(BaseModel):
    """Schema for user data in responses (without password)"""
    id: str
    email: str
    username: str
    target_hsk_level: int
    preferred_language: str
    dark_mode: bool
    created_at: datetime
    last_login: datetime
    
    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy models


class UserUpdate(BaseModel):
    """Schema for updating user settings"""
    target_hsk_level: Optional[int] = Field(None, ge=1, le=6)
    preferred_language: Optional[str] = None
    dark_mode: Optional[bool] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "target_hsk_level": 4,
                "preferred_language": "zh",
                "dark_mode": True
            }
        }

# AUTHENTICATION RESPONSES

class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class TokenData(BaseModel):
    """Schema for decoded token data"""
    user_id: Optional[str] = None