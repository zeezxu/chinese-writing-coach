
"""
Database connection and session management

Sets up SQLite database connection and provides:
- Database engine
- Session factory
- Base class for all models
- Database initialization function
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment (.env file)
# Default to SQLite if not specified
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./chinese_writing.db")

print(f"Database URL: {DATABASE_URL}")

# Create database engine
# For SQLite, we need check_same_thread=False to allow multiple threads
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=False  # Set to True to see SQL queries (useful for debugging)
)

# Create session factory
# Sessions are used to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
# All your models inherit from this
Base = declarative_base()


def get_db():
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
   
    # Import all models here so SQLAlchemy knows about them
    # This MUST be done before calling Base.metadata.create_all()
    from app.models.user import User
    from app.models.essay import Essay, Draft
    from app.models.analysis import EssayAnalysis, SampleEssay
    
    print("Creating database tables")
    print(f"   Models to create: User, Essay, Draft, EssayAnalysis, SampleEssay")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    print("Database initialized successfully!")
    print(f"   Tables created in: {DATABASE_URL}")