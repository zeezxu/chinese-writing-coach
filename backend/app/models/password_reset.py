# backend/app/models/password_reset.py
"""
Password Reset Token model
"""
from sqlalchemy import Column, String, DateTime, ForeignKey
from datetime import datetime, timezone, timedelta
import uuid
import secrets

from app.database import Base


class PasswordResetToken(Base):
    """Password reset token for user password recovery"""
    __tablename__ = "password_reset_tokens"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    token = Column(String(64), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    expires_at = Column(DateTime, nullable=False)
    used = Column(String(1), default='N')  # 'Y' or 'N'

    @staticmethod
    def generate_token():
        """Generate a secure random token"""
        return secrets.token_urlsafe(32)

    @staticmethod
    def create_expiry():
        """Create expiry time (1 hour from now)"""
        return datetime.now(timezone.utc) + timedelta(hours=1)

    def is_valid(self):
        """Check if token is still valid"""
        now = datetime.now(timezone.utc)
        # Handle both timezone-aware and naive datetimes from database
        expires_at = self.expires_at
        if expires_at.tzinfo is None:
            # If stored datetime is naive, assume it's UTC
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        return self.used == 'N' and expires_at > now
