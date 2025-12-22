# backend/test_database.py
"""
Quick test to verify database setup
"""
from app.database import SessionLocal, init_db
from app.models import User, Essay, Draft, EssayAnalysis, SampleEssay

# Initialize (creates tables if they don't exist)
init_db()

# Create a session
db = SessionLocal()

try:
    # Create a test user
    user = User(
        email="test@example.com",
        username="testuser",
        hashed_password="fake_password_hash",
        target_hsk_level=3,
        preferred_language="en"
    )
    db.add(user)
    db.commit()
    db.refresh(user)  # Get the ID that was auto-generated
    
    print(f"Created user: {user}")
    print(f"  ID: {user.id}")
    print(f"  Email: {user.email}")
    print(f"  Username: {user.username}")
    
    # Create a test essay
    essay = Essay(
        user_id=user.id,
        title="我的第一篇作文",
        content="我很喜欢学习中文。中文是一门很有意思的语言。",
        theme="Learning Chinese",
        target_hsk_level=3
    )
    db.add(essay)
    db.commit()
    db.refresh(essay)
    
    print(f"\nCreated essay: {essay}")
    print(f"  ID: {essay.id}")
    print(f"  Title: {essay.title}")
    print(f"  Char count: {essay.char_count}")
    
    # Query it back
    retrieved_user = db.query(User).filter(User.email == "test@example.com").first()
    print(f"\nRetrieved user: {retrieved_user}")
    print(f"  User has {len(retrieved_user.essays)} essay(s)")
    
    print("\nDatabase is working perfectly!")
    
except Exception as e:
    print(f"\nError: {e}")
    db.rollback()
    
finally:
    db.close()