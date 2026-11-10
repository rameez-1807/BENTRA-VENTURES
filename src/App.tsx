import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWidget } from './components/FloatingWidget';
import { MobileBottomBar } from './components/nav/MobileBottomBar';
import { QuoteModal } from './components/QuoteModal';
import { QuoteProvider, useQuote } from './context/QuoteContext';
import { ROUTE_ALIASES } from './routes';

// Code-split pages via React.lazy for TRD §6 performance budget
const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const RealtyPage = React.lazy(() => import('./pages/RealtyPage').then(m => ({ default: m.RealtyPage })));
const FacilityServicesPage = React.lazy(() => import('./pages/FacilityServicesPage').then(m => ({ default: m.FacilityServicesPage })));
const ITSolutionsPage = React.lazy(() => import('./pages/ITSolutionsPage').then(m => ({ default: m.ITSolutionsPage })));
const FreshFMCGPage = React.lazy(() => import('./pages/FreshFMCGPage').then(m => ({ default: m.FreshFMCGPage })));
const EventsHospitalityPage = React.lazy(() => import('./pages/EventsHospitalityPage').then(m => ({ default: m.EventsHospitalityPage })));
const ManpowerServicesPage = React.lazy(() => import('./pages/ManpowerServicesPage').then(m => ({ default: m.ManpowerServicesPage })));
const VenturesPage = React.lazy(() => import('./pages/VenturesPage').then(m => ({ default: m.VenturesPage })));
const CorporateOverviewPage = React.lazy(() => import('./pages/CorporateOverviewPage').then(m => ({ default: m.CorporateOverviewPage })));
const PatnaHubPage = React.lazy(() => import('./pages/PatnaHubPage').then(m => ({ default: m.PatnaHubPage })));
const CareersPage = React.lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const AdminPage = React.lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Sub-services (standalone vertical deep-dives)
const ROServicesPage = React.lazy(() => import('./pages/ROServicesPage').then(m => ({ default: m.ROServicesPage })));
const WaterTankCleaningPage = React.lazy(() => import('./pages/WaterTankCleaningPage').then(m => ({ default: m.WaterTankCleaningPage })));
const PestControlPage = React.lazy(() => import('./pages/PestControlPage').then(m => ({ default: m.PestControlPage })));
const DigitalMarketingPage = React.lazy(() => import('./pages/DigitalMarketingPage').then(m => ({ default: m.DigitalMarketingPage })));

// Accessible Loading Fallback for Suspense
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-900/5 py-24" aria-busy="true" aria-live="polite">
    <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-amber-500 animate-spin mb-4" />
    <span className="text-sm font-medium text-slate-600 tracking-wide uppercase">
      Loading Brentra Ecosystem...
    </span>
  </div>
);

// Scroll to top or hash anchor on route transition
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// Main App Container with Context
const AppContent: React.FC = () => {
  const { isOpen, selectedVertical, openQuoteModal, closeQuoteModal } = useQuote();

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800 antialiased selection:bg-[#0A192F] selection:text-white">
      <ScrollToTop />

      {/* Global Brand Header with Collapsible Strip & MegaMenu */}
      <Header onOpenQuoteModal={openQuoteModal} />

      {/* Primary Suspense Router */}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Canonical Core Vertical Pages */}
            <Route path="/" element={<HomePage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/realty-infrastructure" element={<RealtyPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/bentra-facility" element={<FacilityServicesPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/it-digital" element={<ITSolutionsPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/fmcg-beverages" element={<FreshFMCGPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/events-hospitality" element={<EventsHospitalityPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/events-hospitality/:slug" element={<EventsHospitalityPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/manpower-staffing" element={<ManpowerServicesPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/ventures" element={<VenturesPage onOpenQuoteModal={openQuoteModal} />} />

            {/* Corporate Leadership, Hub & Careers */}
            <Route path="/about" element={<CorporateOverviewPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/contact" element={<PatnaHubPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/patna-hub" element={<PatnaHubPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/careers-partners" element={<CareersPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* Sub-vertical dedicated deep dives */}
            <Route path="/services/ro-water-purifier" element={<ROServicesPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/services/water-tank-cleaning" element={<WaterTankCleaningPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/services/pest-control" element={<PestControlPage onOpenQuoteModal={openQuoteModal} />} />
            <Route path="/services/digital-marketing" element={<DigitalMarketingPage onOpenQuoteModal={openQuoteModal} />} />

            {/* Legacy 301/Client Route Aliases */}
            {Object.entries(ROUTE_ALIASES).map(([alias, target]) => (
              <Route key={alias} path={alias} element={<Navigate to={target} replace />} />
            ))}

            {/* Fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Global Enterprise Footer */}
      <Footer onOpenQuoteModal={openQuoteModal} />

      {/* Persistent Floating Conversion Widget (Desktop/Tablet) */}
      <FloatingWidget onOpenQuoteModal={openQuoteModal} />

      {/* Mobile Sticky Bottom Action Bar */}
      <MobileBottomBar onOpenQuoteModal={openQuoteModal} />

      {/* Universal Quote & Booking Modal */}
      <QuoteModal
        isOpen={isOpen}
        onClose={closeQuoteModal}
        initialVertical={selectedVertical}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QuoteProvider>
      <AppContent />
    </QuoteProvider>
  );
};

export default App;
