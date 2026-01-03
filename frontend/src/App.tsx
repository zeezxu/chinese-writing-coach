// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PracticePage from '@/pages/PracticePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import AnalysisResultsPage from '@/pages/AnalysisResultsPage';
import LanguageSelectionPage from '@/pages/LanguageSelectionPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUserStore } from '@/store/userStore';

function App() {
  const [languageSelected, setLanguageSelected] = useState<boolean>(() => {
    // Check if user has already selected language
    return localStorage.getItem('languageSelected') === 'true';
  });
  const { isAuthenticated } = useUserStore();

  // Show language selection first if not selected
  if (!languageSelected) {
    return (
      <LanguageSelectionPage 
        onLanguageSelected={() => setLanguageSelected(true)} 
      />
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/practice" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/practice" replace /> : <RegisterPage />} 
        />
        <Route 
          path="/forgot-password" 
          element={isAuthenticated ? <Navigate to="/practice" replace /> : <ForgotPasswordPage />} 
        />
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/practice" replace />} />
                  <Route path="/practice" element={<PracticePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/analysis/:essayId" element={<AnalysisResultsPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
