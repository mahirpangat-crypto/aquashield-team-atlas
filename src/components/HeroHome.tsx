import React from 'react';
import { 
  ShieldAlert, 
  Droplets, 
  Waves, 
  Activity, 
  MapPin, 
  Sliders, 
  Radio, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';
import { FloodCalculationResult, SchoolLocation } from '../types';

interface HeroHomeProps {
  rainfall: number;
  waterLevel: number;
  riskResult: FloodCalculationResult;
  selectedSchool: SchoolLocation;
  onNavigate: (tab: string) => void;
  onOpenDeployModal: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  rainfall,
  waterLevel,
  riskResult,
  selectedSchool,
  onNavigate,
  onOpenDeployModal,
}) => {
  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner: Science Fair Project Notification */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>School Science & Technology Fair 2026 · Malappuram District, Kerala</span>
          <span className="text-slate-500 hidden md:inline">·</span>
          <span className="text-slate-400 hidden md:inline">Team Atlas Research Project</span>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[11px] bg-cyan-900/60 px-2 py-0.5 rounded border border-cyan-400/30 text-cyan-200">
            Simulated Demonstration Telemetry
          </span>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative rounded-2xl holo-panel p-6 sm:p-10 lg:p-12 overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.12)]">
        {/* Holographic background ambient glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-cyan-400 bg-cyan-950/90 px-3 py-1 rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Autonomous Hydro-Meteorological Early Warning System</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Made by Team Atlas</span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
              AQUASHIELD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">FloodGuard</span>
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-cyan-200/90 tracking-wide glow-cyan-text">
              See the Risk. Save Lives.
            </p>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            A hyper-realistic smart flood alert and disaster management platform engineered by 
            <strong className="text-white font-semibold"> Team Atlas</strong>. 
            Combining real-time ultrasonic river telemetry, precision rainfall gauging, interactive meteorological satellite maps for O.K. Muri &amp; Vengara, and predictive runoff simulations.
          </p>

          {/* Prompt baseline readings callout cards */}
          <div className="pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Current Live Monitoring Indicators (Demonstration Baseline)</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Rainfall card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/25 hover:border-cyan-400/60 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>Precipitation Rate</span>
                  <Droplets className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold font-mono text-cyan-300 tabular-nums">
                    {rainfall}
                  </span>
                  <span className="text-xs font-mono text-slate-400">mm / hour</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Tipping Bucket Sensor · Moderate Shower</span>
                </div>
              </div>

              {/* Water level card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/25 hover:border-cyan-400/60 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>River Water Level</span>
                  <Waves className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold font-mono text-cyan-300 tabular-nums">
                    {waterLevel.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-slate-400">metres</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Ultrasonic HC-SR04 · Normal Stage</span>
                </div>
              </div>

              {/* Flood risk card */}
              <div className={`p-4 rounded-xl bg-slate-900/80 border transition-colors ${riskResult.borderColor}`}>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>Calculated Flood Risk</span>
                  <ShieldAlert className="w-4 h-4" style={{ color: riskResult.color }} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono tracking-wider tabular-nums" style={{ color: riskResult.color }}>
                    {riskResult.riskLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-400">({riskResult.riskScore}/100)</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 truncate">
                  Safe · Channels within capacity
                </div>
              </div>
            </div>

            <div className="mt-2 text-right">
              <span className="text-[11px] text-slate-400 italic">
                * Note: Clearly labeled simulated demonstration telemetry for educational evaluation.
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Explore Live Dashboard</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onNavigate('map')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-medium text-sm transition-all hover:border-cyan-400 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Satellite Map: Malappuram</span>
            </button>

            <button
              onClick={() => onNavigate('simulator')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-all hover:text-white cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-sky-400" />
              <span>Run Flood Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected School Quick Context */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Designated Monitoring Centre / School:</div>
            <div className="text-sm font-semibold text-white">{selectedSchool.name}</div>
            <div className="text-xs text-slate-400">{selectedSchool.address} · Elevation: {selectedSchool.elevationMeters}m MSL</div>
          </div>
        </div>
        <button
          onClick={() => onNavigate('map')}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors cursor-pointer whitespace-nowrap self-end sm:self-auto"
        >
          Change School Location
        </button>
      </div>
    </div>
  );
};
