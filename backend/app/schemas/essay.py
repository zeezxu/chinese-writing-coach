"""
Pydantic schemas for Essay and Draft
"""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# ESSAY SUBMISSION

class EssaySubmit(BaseModel):
    """Schema for submitting a new essay"""
    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(..., min_length=10)  # At least 10 chars
    theme: Optional[str] = Field(None, max_length=100)
    target_hsk_level: int = Field(..., ge=1, le=6)
    language: str = Field(default="en", max_length=10)  # Analysis output language
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "我的日常生活",
                "content": "我每天早上七点起床。然后我刷牙洗脸，吃早饭。八点的时候，我去上班。",
                "theme": "Daily Life",
                "target_hsk_level": 3,
                "language": "en"
            }
        }

# ESSAY RESPONSES

class EssayResponse(BaseModel):
    """Schema for essay data in responses"""
    id: str
    user_id: str
    title: str
    content: str
    theme: Optional[str]
    target_hsk_level: int
    submitted_at: datetime
    char_count: int  # From @property
    
    class Config:
        from_attributes = True


class EssayListItem(BaseModel):
    """Schema for essay in list view (lighter, no full content)"""
    id: str
    title: str
    theme: Optional[str]
    target_hsk_level: int
    submitted_at: datetime
    char_count: int
    overall_score: Optional[int] = None  # From analysis if available
    
    class Config:
        from_attributes = True

# DRAFT SCHEMAS

class DraftCreate(BaseModel):
    """Schema for creating a draft"""
    title: Optional[str] = Field(None, max_length=255)
    content: Optional[str] = None
    theme: Optional[str] = None
    hsk_level: Optional[int] = Field(None, ge=1, le=6)
    char_count: int = Field(default=0, ge=0)


class DraftUpdate(BaseModel):
    """Schema for updating a draft"""
    title: Optional[str] = None
    content: Optional[str] = None
    theme: Optional[str] = None
    hsk_level: Optional[int] = None
    char_count: Optional[int] = None


class DraftResponse(BaseModel):
    """Schema for draft in responses"""
    id: str
    user_id: str
    title: Optional[str]
    content: Optional[str]
    theme: Optional[str]
    hsk_level: Optional[int]
    char_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True