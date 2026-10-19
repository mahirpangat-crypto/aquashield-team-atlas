import React, { useState } from 'react';
import { Menu, X, Terminal, Volume2, VolumeX } from 'lucide-react';
import atlasAvatar from '../assets/images/team_atlas_avatar.jpg';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenDeployModal: () => void;
  sirenActive: boolean;
  onToggleSiren: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenDeployModal,
  sirenActive,
  onToggleSiren,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'map', label: 'Map View' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'safety', label: 'Safety Tips' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050B14]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with Themed Profile Picture */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Futuristic Themed Profile Picture Avatar */}
          <button
            onClick={() => handleNavClick('about')}
            title="AQUASHIELD FloodGuard System Official Emblem · Team Atlas (Classes 8, 9 & 10)"
            className="relative group/avatar shrink-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_22px_rgba(6,182,212,0.6)] transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:shadow-[0_0_28px_rgba(6,182,212,0.9)]">
              <img
                src={atlasAvatar}
                alt="AQUASHIELD FloodGuard System Official Emblem"
                className="w-full h-full rounded-full object-cover bg-[#050B14]"
              />
            </div>
            {/* Active Radar Pulse Indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#050B14] rounded-full shadow-[0_0_8px_#34d399] animate-pulse" />
          </button>

          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-0.5"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold tracking-wider text-slate-100 font-mono group-hover:text-cyan-300 transition-colors">
                  AQUASHIELD
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono tracking-tight text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  FloodGuard
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.35)] hover:border-emerald-300 transition-colors">
                  <img
                    src={atlasAvatar}
                    alt=""
                    className="w-4 h-4 rounded-full object-cover border border-emerald-400/80"
                  />
                  <span>Made by Team Atlas</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal tracking-wide hidden sm:block">
                See the Risk. Save Lives. <span className="text-slate-600">·</span> <span className="text-cyan-400/80">Autonomous Hydro Alert System</span>
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-md transition-all text-sm font-medium whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-900/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Siren Alert Demo Button */}
          <button
            onClick={onToggleSiren}
            title={sirenActive ? 'Mute emergency siren demo' : 'Test emergency audio buzzer'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              sirenActive
                ? 'bg-rose-950/80 text-rose-300 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse'
                : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-slate-200 hover:border-slate-500'
            }`}
          >
            {sirenActive ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="whitespace-nowrap">{sirenActive ? 'Siren Active' : 'Test Siren'}</span>
          </button>

          {/* Project Details Modal Trigger */}
          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors shadow-[0_0_12px_rgba(6,182,212,0.15)]"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Science Fair Telemetry</span>
            <span className="md:hidden">Telemetry</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-800/80 space-y-1 pb-2">
          <div className="px-3 py-2 mb-2 flex items-center gap-3 bg-cyan-950/30 rounded-lg border border-cyan-500/20">
            <img
              src={atlasAvatar}
              alt="Team Atlas Avatar"
              className="w-9 h-9 rounded-full object-cover border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
            />
            <div>
              <p className="text-xs text-cyan-300 font-mono font-bold">Team Atlas · Classes 8, 9 &amp; 10</p>
              <p className="text-[11px] text-slate-400">See the Risk. Save Lives. · Malappuram</p>
            </div>
          </div>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 flex gap-2">
            <button
              onClick={onToggleSiren}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono border ${
                sirenActive
                  ? 'bg-rose-950/80 text-rose-300 border-rose-500'
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}
            >
              {sirenActive ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{sirenActive ? 'Siren On' : 'Test Siren'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
