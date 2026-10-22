import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Protected Components & Pages
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEnquiries from './pages/AdminEnquiries';
import AdminServices from './pages/AdminServices';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminFAQs from './pages/AdminFAQs';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<Navigate to="/login" replace />} />

          {/* Standalone Protected Admin Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback & Legacy Path Aliases */}
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/admin/enquiries" element={<Navigate to="/enquiries" replace />} />
          <Route path="/admin/services" element={<Navigate to="/services" replace />} />
          <Route path="/admin/portfolio" element={<Navigate to="/portfolio" replace />} />
          <Route path="/admin/faqs" element={<Navigate to="/faqs" replace />} />
          <Route path="/admin/settings" element={<Navigate to="/settings" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
