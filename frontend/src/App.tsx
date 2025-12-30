// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PracticePage from '@/pages/PracticePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import AnalysisResultsPage from '@/pages/AnalysisResultsPage'; // ← Add this

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/practice" replace />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analysis/:essayId" element={<AnalysisResultsPage />} /> {/* ← Add this */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;