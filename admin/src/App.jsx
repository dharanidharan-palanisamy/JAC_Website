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

// New Complete Client Pages Management
import AdminHomeContent from './pages/AdminHomeContent';
import AdminProducts from './pages/AdminProducts';
import AdminOtherServices from './pages/AdminOtherServices';
import AdminAbout from './pages/AdminAbout';
import AdminCareers from './pages/AdminCareers';
import AdminProcess from './pages/AdminProcess';
import AdminPrograms from './pages/AdminPrograms';
import AdminLegal from './pages/AdminLegal';
import GlobalModalEscapeHandler from './components/GlobalModalEscapeHandler';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <GlobalModalEscapeHandler />
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
            <Route path="home-content" element={<AdminHomeContent />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="other-services" element={<AdminOtherServices />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="careers" element={<AdminCareers />} />
            <Route path="process" element={<AdminProcess />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="legal" element={<AdminLegal />} />
          </Route>

          {/* Fallback & Legacy Path Aliases */}
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/admin/pages" element={<Navigate to="/" replace />} />
          <Route path="/admin/home-content" element={<Navigate to="/home-content" replace />} />
          <Route path="/admin/services" element={<Navigate to="/services" replace />} />
          <Route path="/admin/products" element={<Navigate to="/products" replace />} />
          <Route path="/admin/other-services" element={<Navigate to="/other-services" replace />} />
          <Route path="/admin/portfolio" element={<Navigate to="/portfolio" replace />} />
          <Route path="/admin/about" element={<Navigate to="/about" replace />} />
          <Route path="/admin/careers" element={<Navigate to="/careers" replace />} />
          <Route path="/admin/process" element={<Navigate to="/process" replace />} />
          <Route path="/admin/programs" element={<Navigate to="/programs" replace />} />
          <Route path="/admin/faqs" element={<Navigate to="/faqs" replace />} />
          <Route path="/admin/enquiries" element={<Navigate to="/enquiries" replace />} />
          <Route path="/admin/settings" element={<Navigate to="/settings" replace />} />
          <Route path="/admin/legal" element={<Navigate to="/legal" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
