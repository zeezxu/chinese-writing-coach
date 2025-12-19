# backend/app/config.py
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings"""
    
    # App
    app_name: str = "Chinese Writing Coach"
    debug: bool = True
    
    # OpenAI API
    openai_api_key: str
    
    # Database
    database_url: str = "sqlite:///./chinese_writing.db"
    
    # JWT (for later)
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440  # 24 hours
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    """Get cached settings"""
    return Settings()

# Usage example:
# from app.config import get_settings
# settings = get_settings()
# api_key = settings.openai_api_key