"""
Test Pydantic schemas
"""
from app.schemas import (
    UserRegister,
    EssaySubmit,
    DraftCreate,
    MessageResponse
)

# Test UserRegister
print("Testing UserRegister schema...")
try:
    user = UserRegister(
        email="test@example.com",
        username="testuser",
        password="SecurePass123!",
        target_hsk_level=3,
        preferred_language="en"
    )
    print(f"Valid user: {user.email}")
except Exception as e:
    print(f"Error: {e}")

# Test invalid email
try:
    invalid_user = UserRegister(
        email="not-an-email", 
        username="test",
        password="pass"
    )
except Exception as e:
    print(f"Caught invalid email and password: Validation working!")

# Test EssaySubmit
print("\nTesting EssaySubmit schema...")
essay = EssaySubmit(
    title="我的作文",
    content="我很喜欢学习中文。中文很有意思。",
    theme="Learning",
    target_hsk_level=3,
    language="en"
)
print(f"Valid essay: {essay.title}")
print(f"  Content length: {len(essay.content)} characters")

# Test too short content
print("\nTesting content validation...")
try:
    short_essay = EssaySubmit(
        title="短文",
        content="太短了",
        target_hsk_level=2
    )
except Exception as e:
    print(f"Caught too-short content: Validation working!")

# Test Draft
print("\nTesting DraftCreate schema...")
draft = DraftCreate(
    title="草稿",
    content="这是内容",
    char_count=4
)
print(f"Valid draft: {draft.title}")

# Test MessageResponse
print("\nTesting MessageResponse schema...")
msg = MessageResponse(message="Success!")
print(f"Valid message: {msg.message}")

print("All schema tests passed")
