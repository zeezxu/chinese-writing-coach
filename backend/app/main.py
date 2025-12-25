"""
FastAPI main application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.api import essays, drafts, users

# Create app
app = FastAPI(
    title="Chinese Writing Coach API",
    description="AI-powered Chinese writing analysis system",
    version="1.0.0"
)

# CORS middleware (allows frontend to call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(essays.router)
app.include_router(drafts.router)
app.include_router(users.router)

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to Chinese Writing Coach API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy"}