# backend/app/models/essay.py
"""
Essay and Draft models
"""
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid

from app.database import Base

class Essay(Base):
    """Submitted essay model"""
    __tablename__ = "essays"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    
    # Essay content
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    theme = Column(String(100))
    target_hsk_level = Column(Integer, nullable=False)
    
    # Metadata
    submitted_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
    
    # Relationships
    user = relationship("User", back_populates="essays")
    analysis = relationship("EssayAnalysis", back_populates="essay", uselist=False, cascade="all, delete-orphan")
    
    # Computed property
    @property
    def char_count(self) -> int:
        import re
        chinese_chars = re.findall(r'[\u4e00-\u9fa5]', self.content)
        return len(chinese_chars)
    
    def __repr__(self):
        return f"<Essay {self.title[:30]} ({self.char_count} chars)>"



class Draft(Base):
    """Draft essay model"""
    __tablename__ = "drafts"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    
    # Draft content
    title = Column(String(255))
    content = Column(Text)
    theme = Column(String(100))
    hsk_level = Column(Integer)
    char_count = Column(Integer, default=0)
    
    # Metadata
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), index=True)
    
    # Relationships
    user = relationship("User", back_populates="drafts")
    
def __repr__(self):
    return f"<Draft {self.title[:30] if self.title else 'Untitled'} ({self.char_count}/500 chars)>"