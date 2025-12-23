"""
Pydantic schemas for API request/response validation
"""
from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserResponse,
    UserUpdate,
    Token,
    TokenData
)
from app.schemas.essay import (
    EssaySubmit,
    EssayResponse,
    EssayListItem,
    DraftCreate,
    DraftUpdate,
    DraftResponse
)
from app.schemas.analysis import (
    AnalysisResponse,
    AnalysisSummary,
    SampleEssayResponse,
    SampleEssayListItem
)
from app.schemas.common import (
    MessageResponse,
    ErrorResponse,
    PaginatedResponse
)

__all__ = [
    # User
    "UserRegister",
    "UserLogin",
    "UserResponse",
    "UserUpdate",
    "Token",
    "TokenData",
    # Essay
    "EssaySubmit",
    "EssayResponse",
    "EssayListItem",
    "DraftCreate",
    "DraftUpdate",
    "DraftResponse",
    # Analysis
    "AnalysisResponse",
    "AnalysisSummary",
    "SampleEssayResponse",
    "SampleEssayListItem",
    # Common
    "MessageResponse",
    "ErrorResponse",
    "PaginatedResponse",
]