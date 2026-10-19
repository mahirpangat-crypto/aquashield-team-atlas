import React from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Droplets, 
  Waves, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  Flame, 
  Info,
  Clock,
  Compass,
  ArrowRight,
  Sparkles,
  Volume2
} from 'lucide-react';
import { FloodCalculationResult, SchoolLocation } from '../types';

interface SimulatorViewProps {
  rainfall: number;
  waterLevel: number;
  riskResult: FloodCalculationResult;
  selectedSchool: SchoolLocation;
  onUpdateValues: (rainfall: number, waterLevel: number) => void;
  onReset: () => void;
  onNavigateToMap: () => void;
  onToggleSiren: () => void;
  sirenActive: boolean;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  rainfall,
  waterLevel,
  riskResult,
  selectedSchool,
  onUpdateValues,
  onReset,
  onNavigateToMap,
  onToggleSiren,
  sirenActive,
}) => {
  // Preset handlers
  const handlePresetNormal = () => {
    // Normal Conditions
    onUpdateValues(15, 1.8);
  };

  const handlePresetHeavyRain = () => {
    // Heavy Rain
    onUpdateValues(75, 3.8);
  };

  const handlePresetHighWater = () => {
    // High Water
    onUpdateValues(110, 5.4);
  };

  const handlePresetMonsoonalSurge = () => {
    // Monsoonal Flash Flood / Surge
    onUpdateValues(175, 7.8);
  };

  // Cross-section calculations for SVG visualizer
  // Riverbed: 0m, Normal bank: 4.5m, Overtopping crest: 6.0m
  const maxVisualWater = 10;
  const riverBankLevel = 4.5;
  const isOvertopping = waterLevel > riverBankLevel;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Educational Demonstration Notice (Prompt Requirement) */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-start gap-3 shadow-md">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-300 uppercase tracking-wide">
            Educational Demonstration Model · School Science Fair Notice
          </div>
          <p className="text-amber-200/90 leading-relaxed font-sans text-xs">
            This simulator is an educational interactive demonstration developed by <strong>Team Atlas</strong> for the School Science Fair. 
            It models hydro-meteorological runoff principles using empirical rainfall-to-discharge ratios, but is <strong>not a certified or validated meteorological flood-prediction system</strong> for municipal emergency declarations.
          </p>
        </div>
      </div>

      {/* Main Simulator Control Deck & Cross Section Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl holo-panel space-y-6 border border-cyan-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                  Scenario Parameter Controls
                </h2>
              </div>
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
                title="Restore default baseline readings (25 mm/h, 2.0m)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset (25mm/h, 2.0m)</span>
              </button>
            </div>

            {/* Slider 1: Rainfall Rate (0 - 200 mm/hour) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <label htmlFor="rainfall-slider" className="text-sm font-semibold text-white">Rainfall Precipitation Intensity</label>
                    <p className="text-[11px] text-slate-400 font-mono">Catchment surface influx rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                    {rainfall}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">mm/hr</span>
                </div>
              </div>

              {/* Slider track */}
              <input
                id="rainfall-slider"
                type="range"
                min="0"
                max="200"
                step="1"
                value={rainfall}
                aria-label="Rainfall Precipitation Intensity in millimeters per hour"
                onChange={(e) => onUpdateValues(Number(e.target.value), waterLevel)}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>0 mm/h (Clear)</span>
                <span>50 mm/h (Moderate)</span>
                <span>100 mm/h (Heavy)</span>
                <span>200 mm/h (Cloudburst)</span>
              </div>
            </div>

            {/* Slider 2: Water Level (0 - 10 metres) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <label htmlFor="water-level-slider" className="text-sm font-semibold text-white">River Hydrostatic Water Elevation</label>
                    <p className="text-[11px] text-slate-400 font-mono">Kadalundi River gauge datum stage</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                    {waterLevel.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">metres</span>
                </div>
              </div>

              {/* Slider track */}
              <input
                id="water-level-slider"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={waterLevel}
                aria-label="River Hydrostatic Water Elevation in metres"
                onChange={(e) => onUpdateValues(rainfall, Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>0.0m (Dry)</span>
                <span>3.0m (Warning)</span>
                <span>4.5m (Bankfull)</span>
                <span>10.0m (Severe Surge)</span>
              </div>
            </div>

            {/* Presets (Prompt Requirement: Normal Conditions, Heavy Rain, and High Water) */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>One-Click Simulation Presets:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={handlePresetNormal}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-left transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-white">Normal</div>
                  <div className="text-[10px] text-cyan-400 font-mono">15 mm/h · 1.8m</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-1">● Risk: LOW</div>
                </button>

                <button
                  onClick={handlePresetHeavyRain}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-white">Heavy Rain</div>
                  <div className="text-[10px] text-amber-300 font-mono">75 mm/h · 3.8m</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-1">▲ Risk: MODERATE</div>
                </button>

                <button
                  onClick={handlePresetHighWater}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-orange-400 text-left transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-white">High Water</div>
                  <div className="text-[10px] text-orange-300 font-mono">110 mm/h · 5.4m</div>
                  <div className="text-[10px] text-orange-400 font-mono mt-1">✖ Risk: HIGH</div>
                </button>

                <button
                  onClick={handlePresetMonsoonalSurge}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-500 text-left transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-white">Monsoon Surge</div>
                  <div className="text-[10px] text-rose-300 font-mono">175 mm/h · 7.8m</div>
                  <div className="text-[10px] text-rose-400 font-mono mt-1">☠ CRITICAL</div>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Dynamic Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl holo-panel space-y-1">
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Est. Time To Crest
              </div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                ~{riskResult.timeToCrestHours} hrs
              </div>
              <p className="text-[11px] text-slate-500">Based on runoff time-lag</p>
            </div>

            <div className="p-4 rounded-xl holo-panel space-y-1">
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Drainage Saturation
              </div>
              <div className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                {riskResult.drainageSaturationPercent}%
              </div>
              <p className="text-[11px] text-slate-500">Culvert backflow risk</p>
            </div>

            <div className="p-4 rounded-xl holo-panel space-y-1">
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                Inundation Buffer
              </div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                {riskResult.inundationRadiusMeters} m
              </div>
              <p className="text-[11px] text-slate-500">Low-lying perimeter</p>
            </div>
          </div>
        </div>

        {/* River Cross-Section & Impact Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* River Elevation Cross-Section Visualizer */}
          <div className="p-5 rounded-2xl holo-panel space-y-4 border border-cyan-500/30">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>River Cross-Section Model</span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">
                Bankfull: 4.5m
              </span>
            </div>

            {/* Cross Section SVG */}
            <div className="relative w-full bg-slate-950 rounded-xl p-3 border border-slate-800">
              <svg viewBox="0 0 320 200" className="w-full h-52 select-none">
                <defs>
                  <linearGradient id="waterCrossGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={riskResult.color} stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#083344" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Riverbed / Earth profile */}
                {/* Left bank (lowland), river trough (center), right bank (school hill) */}
                <path
                  d="M 10 90 L 70 90 L 100 170 L 200 170 L 230 90 L 310 40 L 310 190 L 10 190 Z"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="2"
                />

                {/* Water Level Volume */}
                {/* Max water depth: waterLevel / 10 * 80 px (from 170 up to 90 is 80px) */}
                {(() => {
                  const waterHeightPx = Math.min(130, (waterLevel / maxVisualWater) * 130);
                  const waterSurfaceY = 170 - waterHeightPx;

                  return (
                    <g>
                      {/* Water polygon */}
                      {waterLevel <= 4.5 ? (
                        // Contained within river channel
                        <polygon
                          points={`
                            ${100 - (waterHeightPx * 0.35)},${waterSurfaceY} 
                            ${200 + (waterHeightPx * 0.35)},${waterSurfaceY} 
                            200,170 100,170
                          `}
                          fill="url(#waterCrossGrad)"
                        />
                      ) : (
                        // Overtopping both banks!
                        <polygon
                          points={`
                            10,${Math.min(90, waterSurfaceY)} 
                            10,${waterSurfaceY} 
                            ${Math.min(300, 230 + (waterHeightPx - 80) * 1.5)},${waterSurfaceY} 
                            230,90 200,170 100,170 70,90 10,90
                          `}
                          fill="url(#waterCrossGrad)"
                        />
                      )}

                      {/* Water Surface Line */}
                      <line
                        x1="10"
                        y1={waterSurfaceY}
                        x2="310"
                        y2={waterSurfaceY}
                        stroke={riskResult.color}
                        strokeWidth="2"
                        strokeDasharray={isOvertopping ? '4 2' : undefined}
                      />

                      {/* Label of water level */}
                      <text
                        x="150"
                        y={Math.max(25, waterSurfaceY - 6)}
                        fill="#fff"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        WATER: {waterLevel.toFixed(1)}m
                      </text>
                    </g>
                  );
                })()}

                {/* Danger Bankfull Line at 4.5m (Y = 90) */}
                <line x1="70" y1="90" x2="230" y2="90" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="3 3" />
                <text x="150" y="85" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  BANKFULL THRESHOLD (4.5m)
                </text>

                {/* Labels for Earth & Campus */}
                <text x="35" y="110" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                  Lowland Roads
                </text>
                <text x="245" y="55" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  🏫 Campus (+{selectedSchool.elevationMeters}m)
                </text>
                <text x="150" y="185" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Kadalundi Riverbed (0.0m)
                </text>
              </svg>

              <div className="text-center text-[11px] font-mono mt-1">
                {isOvertopping ? (
                  <span className="text-rose-400 font-bold">
                    ⚠️ OVERTOPPING: River has breached bank margins by +{(waterLevel - riverBankLevel).toFixed(1)}m!
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold">
                    ✓ SAFE CLEARANCE: {(riverBankLevel - waterLevel).toFixed(1)}m freeboard remaining before crest overtop.
                  </span>
                )}
              </div>
            </div>

            {/* Dynamic Calculated Advisory Box */}
            <div className={`p-4 rounded-xl border ${riskResult.borderColor} bg-slate-900/90 space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Risk Assessment:</span>
                <span 
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{ color: riskResult.color, backgroundColor: `${riskResult.color}20` }}
                >
                  {riskResult.riskLevel}
                </span>
              </div>
              <div className="text-sm font-bold text-white">{riskResult.title}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{riskResult.description}</p>
              
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">Recommended Protocol:</div>
                <div className="text-xs text-slate-200 mt-0.5">{riskResult.recommendation}</div>
              </div>

              {/* Siren Alert Toggle in case of High / Critical risk */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={onToggleSiren}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                    sirenActive
                      ? 'bg-rose-950 text-rose-300 border border-rose-500 animate-pulse'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{sirenActive ? 'Stop Emergency Siren' : 'Trigger School Siren'}</span>
                </button>

                <button
                  onClick={onNavigateToMap}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 hover:text-white bg-cyan-950/60 border border-cyan-500/30 flex items-center gap-1 cursor-pointer"
                >
                  <span>Satellite Inundation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
