import React from 'react';
import { Shield, Check, Droplets, Sparkles } from 'lucide-react';

export const FloodSafetyBasicsBanner: React.FC = () => {
  const checklistItems = [
    'Follow official weather and disaster-management alerts.',
    'Never walk or drive through floodwater.',
    'Move to safer, higher ground when instructed by authorities.',
    'Keep emergency contacts and essential supplies ready.',
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#030d22] via-[#051636] to-[#040f28] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.18)] p-6 sm:p-8 lg:p-10 text-white">
      {/* Dynamic Futuristic Energy Lines & Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Curved energy trace lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <defs>
            <linearGradient id="energyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="energyGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M -100 200 C 300 80, 600 350, 1300 120"
            fill="none"
            stroke="url(#energyGrad1)"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          <path
            d="M -50 320 C 400 240, 800 60, 1300 280"
            fill="none"
            stroke="url(#energyGrad2)"
            strokeWidth="2"
          />
        </svg>

        {/* Ambient radial lighting flares */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sky-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Main 3-Zone Grid Layout: [FLOOD SAFETY BASICS & Checklist] - [Framed Panoramic Scene] - [BE PREPARED. STAY SAFE.] */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Flood Safety Basics Header + Glowing Turquoise Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.7)] shrink-0">
              <Shield className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase font-sans text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                FLOOD SAFETY BASICS
              </h2>
              <div className="text-[11px] font-mono tracking-widest text-cyan-300/80 uppercase">
                Life-Saving Emergency Protocols
              </div>
            </div>
          </div>

          {/* Checklist with glowing turquoise checkmarks */}
          <ul className="space-y-3 pt-2">
            {checklistItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 group">
                <div className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-400/80 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5 shadow-[0_0_12px_rgba(6,182,212,0.8)] group-hover:border-cyan-300 group-hover:scale-105 transition-all">
                  <Check className="w-3.5 h-3.5 text-cyan-300 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200 leading-snug font-medium group-hover:text-white transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Column: Framed Panoramic Real-World Tropical Flooded Landscape (4 cols) */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative w-full max-w-md rounded-xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] group">
            {/* Framed Glowing Corner Brackets */}
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-300 z-20 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-300 z-20 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-300 z-20 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-300 z-20 pointer-events-none" />

            {/* High-Resolution Kerala Monsoon Flood Landscape Photo */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/kerala_monsoon_flood_panoramic_1792397380699.jpg"
                alt="Framed panoramic real-world scene of a flooded tropical landscape in Kerala with palm trees and partially submerged village houses"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Subtle vignette scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

              {/* In-image caption tag */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-cyan-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-500/30">
                <span className="truncate">Kerala Monsoonal River Basin Inundation</span>
                <span className="text-cyan-400 shrink-0 font-bold">Field Record</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: BE PREPARED. STAY SAFE. Slogan with Light Streak Graphic (3 cols) */}
        <div className="lg:col-span-3 text-center lg:text-right space-y-3">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans uppercase leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              BE PREPARED.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                STAY SAFE.
              </span>
            </h3>

            {/* Futuristic Light Streak Graphic */}
            <div className="relative pt-2 flex items-center justify-center lg:justify-end">
              <div className="h-1 w-36 sm:w-48 bg-gradient-to-r from-transparent via-cyan-400 to-white rounded-full shadow-[0_0_15px_rgba(34,211,238,0.9)]" />
              <div className="absolute right-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
            </div>
          </div>

          <p className="text-xs text-cyan-200/90 font-mono tracking-wide pt-1">
            Early detection mitigates loss of life.
          </p>
        </div>
      </div>

      {/* Bottom Center: Small Attribution Text with Flanking Water Drops */}
      <div className="relative z-10 mt-8 pt-4 border-t border-cyan-500/20 text-center">
        <div className="inline-flex items-center justify-center gap-2 text-xs font-mono text-slate-300">
          <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
          <span className="font-semibold text-white">
            Made by Team ATLAS <span className="text-slate-500 font-normal">|</span> Educational Prototype - Simulated Data Only
          </span>
          <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-0.5">
          Not a real flood warning system.
        </div>
      </div>
    </div>
  );
};
