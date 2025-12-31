// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PracticePage from '@/pages/PracticePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import AnalysisResultsPage from '@/pages/AnalysisResultsPage';
import LanguageSelectionPage from '@/pages/LanguageSelectionPage';

function App() {
  const [languageSelected, setLanguageSelected] = useState<boolean>(() => {
    // Check if user has already selected language
    return localStorage.getItem('languageSelected') === 'true';
  });

  if (!languageSelected) {
    return (
      <LanguageSelectionPage 
        onLanguageSelected={() => setLanguageSelected(true)} 
      />
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/practice" replace />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analysis/:essayId" element={<AnalysisResultsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;