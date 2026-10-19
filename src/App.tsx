/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { AnimatedSection } from './components/AnimatedSection';
import { HeroHome } from './components/HeroHome';
import { DashboardView } from './components/DashboardView';
import { SatelliteMapView } from './components/SatelliteMapView';
import { SimulatorView } from './components/SimulatorView';
import { SafetyTipsView } from './components/SafetyTipsView';
import { AboutView } from './components/AboutView';
import { DeployModal } from './components/DeployModal';
import { Footer } from './components/Footer';
import { 
  MALAPPURAM_SCHOOL_PRESETS, 
  INITIAL_SENSOR_NODES, 
  DEMO_24H_HISTORY, 
  calculateFloodRisk 
} from './utils/floodLogic';
import { playEmergencySiren, stopEmergencySiren } from './utils/soundEffects';
import { SchoolLocation, HistoricalReading } from './types';

export default function App() {
  // Baseline initial state (mandated by prompt: Rainfall: 25 mm/h, Water level: 2.0 m, Risk: LOW)
  const [rainfall, setRainfall] = useState<number>(25);
  const [waterLevel, setWaterLevel] = useState<number>(2.0);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedSchool, setSelectedSchool] = useState<SchoolLocation>(MALAPPURAM_SCHOOL_PRESETS[0]);
  const [sensorNodes, setSensorNodes] = useState(INITIAL_SENSOR_NODES);
  const [history, setHistory] = useState<HistoricalReading[]>(DEMO_24H_HISTORY);
  
  // Interactive features
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(false);
  const [sirenActive, setSirenActive] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Compute real-time flood risk based on current values
  const riskResult = calculateFloodRisk(rainfall, waterLevel);

  // Smooth scroll to a section by element id
  const handleScrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    const sectionIds = ['home', 'dashboard', 'map', 'simulator', 'safety', 'about'];
    const handleScroll = () => {
      // Toggle back to top button visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Detect which section is currently centered/active in viewport
      const scrollPosition = window.scrollY + 160;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live simulation stream drift effect
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setWaterLevel((prev) => {
        const delta = (Math.random() - 0.48) * 0.08;
        return Math.max(0.5, Math.min(9.5, Number((prev + delta).toFixed(2))));
      });

      setRainfall((prev) => {
        const delta = Math.round((Math.random() - 0.48) * 2);
        return Math.max(0, Math.min(195, prev + delta));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Update sensor node readings in sync with river water level
  useEffect(() => {
    setSensorNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        waterLevel: Math.max(0.2, Number((waterLevel * (node.id === 'node-01' ? 1 : 0.7 + Math.random() * 0.2)).toFixed(2))),
      }))
    );
  }, [waterLevel]);

  // Toggle siren sound
  const handleToggleSiren = () => {
    if (sirenActive) {
      stopEmergencySiren();
      setSirenActive(false);
    } else {
      playEmergencySiren(riskResult.riskLevel === 'CRITICAL' ? 700 : 500);
      setSirenActive(true);
    }
  };

  // Automatically adjust siren if risk jumps to critical and siren is on
  useEffect(() => {
    if (sirenActive) {
      playEmergencySiren(riskResult.riskLevel === 'CRITICAL' ? 750 : 500);
    }
  }, [riskResult.riskLevel, sirenActive]);

  // Clean up audio if unmounted
  useEffect(() => {
    return () => {
      stopEmergencySiren();
    };
  }, []);

  // Update values from simulator
  const handleUpdateValues = (newRainfall: number, newWaterLevel: number) => {
    setRainfall(newRainfall);
    setWaterLevel(newWaterLevel);
  };

  // Reset to default baseline (25 mm/h, 2.0m)
  const handleReset = () => {
    setRainfall(25);
    setWaterLevel(2.0);
    if (sirenActive) {
      stopEmergencySiren();
      setSirenActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans bg-grid-pattern">
      {/* Sticky Top Header with Active Section Sync */}
      <Header
        currentTab={activeSection}
        onSelectTab={handleScrollToSection}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        sirenActive={sirenActive}
        onToggleSiren={handleToggleSiren}
      />

      {/* Main Single-Page Continuous Vertical Scroll Stream */}
      <main className="flex-1 space-y-16 lg:space-y-24 py-6">
        {/* Section 1: Home Overview */}
        <AnimatedSection id="home">
          <HeroHome
            rainfall={rainfall}
            waterLevel={waterLevel}
            riskResult={riskResult}
            selectedSchool={selectedSchool}
            onNavigate={handleScrollToSection}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
          />
        </AnimatedSection>

        {/* Section Divider with Holographic Accent */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Section 2: Hydro Telemetry Dashboard */}
        <AnimatedSection id="dashboard">
          <DashboardView
            rainfall={rainfall}
            waterLevel={waterLevel}
            riskResult={riskResult}
            sensorNodes={sensorNodes}
            history={history}
            selectedSchool={selectedSchool}
            isLiveSimulating={isLiveSimulating}
            onToggleLiveSimulation={() => setIsLiveSimulating(!isLiveSimulating)}
            onNavigateToSimulator={() => handleScrollToSection('simulator')}
            onNavigateToMap={() => handleScrollToSection('map')}
          />
        </AnimatedSection>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Section 3: Satellite GIS Map View */}
        <AnimatedSection id="map">
          <SatelliteMapView
            rainfall={rainfall}
            waterLevel={waterLevel}
            riskResult={riskResult}
            sensorNodes={sensorNodes}
            selectedSchool={selectedSchool}
            onUpdateSchool={setSelectedSchool}
            onNavigateToSimulator={() => handleScrollToSection('simulator')}
          />
        </AnimatedSection>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Section 4: Flood Simulator */}
        <AnimatedSection id="simulator">
          <SimulatorView
            rainfall={rainfall}
            waterLevel={waterLevel}
            riskResult={riskResult}
            selectedSchool={selectedSchool}
            onUpdateValues={handleUpdateValues}
            onReset={handleReset}
            onNavigateToMap={() => handleScrollToSection('map')}
            onToggleSiren={handleToggleSiren}
            sirenActive={sirenActive}
          />
        </AnimatedSection>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Section 5: Safety Tips */}
        <AnimatedSection id="safety">
          <SafetyTipsView />
        </AnimatedSection>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Section 6: About Team Atlas & Science Fair Project */}
        <AnimatedSection id="about">
          <AboutView
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
            onNavigateToSimulator={() => handleScrollToSection('simulator')}
          />
        </AnimatedSection>
      </main>

      {/* Deploy & Run Instructions Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => handleScrollToSection('home')}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 hover:border-cyan-300 hover:text-white hover:bg-cyan-900 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer group"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Site Footer */}
      <Footer
        onSelectTab={handleScrollToSection}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />
    </div>
  );
}
