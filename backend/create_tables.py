from app.database import init_db

if __name__ == "__main__":
    print("\n" + "="*60)
    print("DATABASE INITIALIZATION")
    print("="*60 + "\n")
    
    init_db()
    
    print("\n" + "="*60)
    print("DONE!")
    print("="*60)
    print("\nYou can now:")
    print("  1. Run the FastAPI server: uvicorn app.main:app --reload")
    print("  2. Test the models: python test_models.py")
    print("  3. Start building API endpoints\n")