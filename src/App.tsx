import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWidget } from './components/FloatingWidget';
import { QuoteModal } from './components/QuoteModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ITSolutionsPage } from './pages/ITSolutionsPage';
import { FreshFMCGPage } from './pages/FreshFMCGPage';
import { RealtyPage } from './pages/RealtyPage';
import { FacilityServicesPage } from './pages/FacilityServicesPage';
import { ManpowerServicesPage } from './pages/ManpowerServicesPage';
import { ROServicesPage } from './pages/ROServicesPage';
import { WaterTankCleaningPage } from './pages/WaterTankCleaningPage';
import { PestControlPage } from './pages/PestControlPage';
import { DigitalMarketingPage } from './pages/DigitalMarketingPage';
import { EventsHospitalityPage } from './pages/EventsHospitalityPage';
import { VenturesPage } from './pages/VenturesPage';
import { CorporateOverviewPage } from './pages/CorporateOverviewPage';
import { PatnaHubPage } from './pages/PatnaHubPage';
import { CareersPage } from './pages/CareersPage';

export const App: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState<string>('realty-infrastructure');
  const location = useLocation();

  // Scroll to top on route change or hash anchor
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, location.hash]);

  const handleOpenQuoteModal = (vertical?: string) => {
    if (vertical) {
      setSelectedVertical(vertical);
    }
    setQuoteModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800 antialiased selection:bg-[#0A192F] selection:text-white">
      {/* Global Header */}
      <Header onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Router */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          {/* 7 Dedicated Core Service Vertical Pages */}
          <Route path="/realty-infrastructure" element={<RealtyPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/construction-services" element={<RealtyPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          <Route path="/it-solutions" element={<ITSolutionsPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/it-services" element={<ITSolutionsPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          <Route path="/manpower-housekeeping" element={<ManpowerServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/manpower-services" element={<ManpowerServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          <Route path="/ro-water-purifier" element={<ROServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/ro-services" element={<ROServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          <Route path="/water-tank-cleaning" element={<WaterTankCleaningPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/tank-cleaning" element={<WaterTankCleaningPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          <Route path="/pest-control" element={<PestControlPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/pest-control-services" element={<PestControlPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          <Route path="/digital-marketing" element={<DigitalMarketingPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/marketing-services" element={<DigitalMarketingPage onOpenQuoteModal={handleOpenQuoteModal} />} />

          {/* Facility Overview & Additional Divisions */}
          <Route path="/facility-services" element={<FacilityServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/brentra-facility" element={<FacilityServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/home-services" element={<FacilityServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/urban-services" element={<FacilityServicesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/fresh-fmcg" element={<FreshFMCGPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/events-hospitality" element={<EventsHospitalityPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/ventures" element={<VenturesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          {/* Corporate Governance & Hub Pages */}
          <Route path="/corporate-overview" element={<CorporateOverviewPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/patna-hub" element={<PatnaHubPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/careers" element={<CareersPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          <Route path="*" element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />} />
        </Routes>
      </main>

      {/* Global Enterprise Footer */}
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Persistent Floating Conversion Widget */}
      <FloatingWidget onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Universal Quote & Booking Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialVertical={selectedVertical}
      />
    </div>
  );
};

export default App;
