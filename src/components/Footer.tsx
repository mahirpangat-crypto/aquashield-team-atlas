import React from 'react';
import { Terminal, Heart, LifeBuoy, MapPin, Activity, Sliders, BookOpen } from 'lucide-react';
import atlasAvatar from '../assets/images/team_atlas_avatar.jpg';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenDeployModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenDeployModal }) => {
  return (
    <footer className="mt-16 border-t border-cyan-500/20 bg-[#040810] py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={atlasAvatar}
                alt="AQUASHIELD Emblem"
                className="w-7 h-7 rounded-full object-cover border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              />
              <span className="text-base font-bold font-mono tracking-wider text-white">
                AQUASHIELD <span className="text-cyan-400 font-normal">· FloodGuard</span>
              </span>
            </div>
            <p className="text-cyan-200/90 font-medium text-xs">
              See the Risk. Save Lives.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A high school science fair project engineered by <strong>Team Atlas</strong> (Mahir, Shisna, Asil, and Shidha) in Malappuram, Kerala. 
              Designed to protect vulnerable schoolchildren and rural communities through low-cost, open hydro-telemetry and satellite early warning.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-cyan-400">
              <span>Classes 8, 9 &amp; 10 · Student Research Squad</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Kerala State Science Fair 2026</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              System Modules
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Hydro Telemetry Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('map')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Satellite GIS Map (Malappuram)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('simulator')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Runoff &amp; Overtopping Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Flood Safety Protocols &amp; Helplines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Team Atlas Science Project
                </button>
              </li>
            </ul>
          </div>

          {/* Technical & Open Source */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Technical Resources
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDeployModal}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Run &amp; Deploy Website</span>
                </button>
              </li>
              <li className="text-slate-400">
                Leaflet &amp; Esri World Imagery (No API keys required)
              </li>
              <li className="text-slate-400">
                React 19 &amp; Tailwind CSS v4 Framework
              </li>
              <li className="text-slate-400">
                Designed for Desktop, Tablet &amp; Mobile
              </li>
              <li className="text-emerald-400/90 font-mono text-[11px]">
                Zero Watermarks · 100% Free &amp; Open
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div>
            &copy; 2026 Team Atlas · AquaShield FloodGuard · School Science Fair Prototype
          </div>
          <div className="text-slate-400">
            Educational Demonstration Model · Not an official municipal warning agency
          </div>
        </div>
      </div>
    </footer>
  );
};
