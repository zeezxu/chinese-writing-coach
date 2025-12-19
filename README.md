# Chinese Writing Coach

AI-powered Chinese writing tutor that provides personalized feedback on essays.

## Features

- ✏️ **Practice Writing**: Write essays based on HSK level and theme
- 🤖 **AI Analysis**: Get detailed feedback on vocabulary, grammar, and sentence quality
- 📚 **Explore**: Read sample essays with interactive word definitions
- 📊 **Track Progress**: Monitor your improvement over time

## Tech Stack

**Backend:**
- FastAPI (Python)
- PostgreSQL
- Claude 3.5 Sonnet API
- jieba (Chinese NLP)

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Vite

## Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Documentation

Once backend is running, visit: http://localhost:8000/docs

## License

MIT
