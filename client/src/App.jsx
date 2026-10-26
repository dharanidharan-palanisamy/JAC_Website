import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Common & Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import GlobalModalEscapeHandler from './components/common/GlobalModalEscapeHandler';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import OtherServicesPage from './pages/OtherServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProcessPage from './pages/ProcessPage';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareersPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Public Layout Wrapper with Navbar & Footer
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFA] text-neutral-900 selection:bg-blue-100 selection:text-neutral-900">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <GlobalModalEscapeHandler />
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/other-services" element={<OtherServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
