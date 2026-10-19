import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Waves, 
  Activity, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  BatteryCharging, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight, 
  Play, 
  Pause, 
  Cpu, 
  Compass,
  Sliders,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';
import { FloodCalculationResult, SensorNode, HistoricalReading, SchoolLocation } from '../types';

interface DashboardViewProps {
  rainfall: number;
  waterLevel: number;
  riskResult: FloodCalculationResult;
  sensorNodes: SensorNode[];
  history: HistoricalReading[];
  selectedSchool: SchoolLocation;
  isLiveSimulating: boolean;
  onToggleLiveSimulation: () => void;
  onNavigateToSimulator: () => void;
  onNavigateToMap: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  rainfall,
  waterLevel,
  riskResult,
  sensorNodes,
  history,
  selectedSchool,
  isLiveSimulating,
  onToggleLiveSimulation,
  onNavigateToSimulator,
  onNavigateToMap,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(sensorNodes[0].id);
  const [activeTabMetric, setActiveTabMetric] = useState<'water' | 'rain'>('water');
  const [hoveredPoint, setHoveredPoint] = useState<HistoricalReading | null>(null);

  const selectedNode = sensorNodes.find((n) => n.id === selectedNodeId) || sensorNodes[0];

  // SVG Chart Dimensions
  const chartWidth = 620;
  const chartHeight = 180;
  const padding = { top: 20, right: 25, bottom: 30, left: 40 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Max scale for water (e.g. 0 to 6.5m)
  const maxWaterY = 6.0;
  const maxRainY = 60;

  // Calculate points for water level chart
  const waterPoints = history.map((item, idx) => {
    const x = padding.left + (idx / (history.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - (item.waterLevel / maxWaterY) * innerHeight;
    return { x, y, item };
  });

  const waterPathString = waterPoints.reduce((acc, curr, i) => {
    return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Fill area for water chart
  const waterAreaString = `${waterPathString} L ${padding.left + innerWidth} ${padding.top + innerHeight} L ${padding.left} ${padding.top + innerHeight} Z`;

  // Danger threshold line Y (4.5m)
  const dangerLineY = padding.top + innerHeight - (4.5 / maxWaterY) * innerHeight;
  // Warning threshold line Y (3.0m)
  const warningLineY = padding.top + innerHeight - (3.0 / maxWaterY) * innerHeight;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Simulation Watermark & Demonstration Notice */}
      <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-200">
                AQUASHIELD TELEMETRY CONSOLE
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/50">
                ★ Made by Team Atlas
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Station: O.K. Muri, Vengara (PIN 676519), Malappuram District · Kadalundi River Basin · Simulated Demonstration Data
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live stream drift toggle */}
          <button
            onClick={onToggleLiveSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
              isLiveSimulating
                ? 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {isLiveSimulating ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isLiveSimulating ? 'Streaming Telemetry (ON)' : 'Telemetry Paused'}</span>
          </button>

          <button
            onClick={onNavigateToSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open Simulator</span>
          </button>
        </div>
      </div>

      {/* Primary Status Banner */}
      <div className={`p-5 rounded-2xl holo-panel border transition-all ${riskResult.borderColor} shadow-[0_0_25px_rgba(6,182,212,0.08)]`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Current Flood Risk Classification:</span>
              <span 
                className="text-xs font-mono font-bold px-2 py-0.5 rounded border"
                style={{ color: riskResult.color, borderColor: `${riskResult.color}55`, backgroundColor: `${riskResult.color}15` }}
              >
                ● {riskResult.riskLevel}
              </span>
              <span className="text-xs font-mono text-slate-400">Score: {riskResult.riskScore}/100</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
              {riskResult.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {riskResult.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-stretch lg:self-auto justify-end">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-mono text-slate-400">Recommended Action:</div>
              <div className="text-xs text-cyan-200 font-medium max-w-xs">{riskResult.recommendation}</div>
            </div>
            <button
              onClick={onNavigateToMap}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View On Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid (Mandated baseline: Rainfall 25 mm/h, Water level 2.0 m, Risk: LOW) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Rainfall */}
        <div className="p-4 rounded-xl holo-panel space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              Rainfall Rate
            </span>
            <span className="text-[11px] text-cyan-300 font-semibold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
              Tipping Bucket
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-300 tabular-nums">
              {rainfall}
            </span>
            <span className="text-xs font-mono uppercase text-slate-400">mm / hr</span>
          </div>

          <div className="pt-1 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>24h Accumulation:</span>
            <span className="font-mono text-slate-200 tabular-nums font-semibold">142.5 mm</span>
          </div>
        </div>

        {/* Metric 2: Water Level */}
        <div className="p-4 rounded-xl holo-panel space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-cyan-400" />
              River Water Level
            </span>
            <span className="text-[11px] text-cyan-300 font-semibold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
              Ultrasonic HC-SR04
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-300 tabular-nums">
              {waterLevel.toFixed(1)}
            </span>
            <span className="text-xs font-mono uppercase text-slate-400">metres</span>
          </div>

          <div className="pt-1 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Danger Stage:</span>
            <span className="font-mono text-rose-400 tabular-nums font-semibold">4.50 m (Bankfull)</span>
          </div>
        </div>

        {/* Metric 3: Rate of Rise & Hydrodynamic Discharge */}
        <div className="p-4 rounded-xl holo-panel space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              Hydrodynamics
            </span>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center">
              Steady Stage
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
              +0.12
            </span>
            <span className="text-xs font-mono uppercase text-slate-400">m / hr</span>
          </div>

          <div className="pt-1 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Discharge Est:</span>
            <span className="font-mono text-cyan-300 tabular-nums font-semibold">145 m³/sec</span>
          </div>
        </div>

        {/* Metric 4: Catchment Inundation Risk */}
        <div className="p-4 rounded-xl holo-panel space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" style={{ color: riskResult.color }} />
              Catchment Risk
            </span>
            <span 
              className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded"
              style={{ color: riskResult.color, backgroundColor: `${riskResult.color}20` }}
            >
              {riskResult.riskLevel}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums" style={{ color: riskResult.color }}>
              {riskResult.drainageSaturationPercent}%
            </span>
            <span className="text-xs font-mono uppercase text-slate-400">Saturation</span>
          </div>

          <div className="pt-1 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>School Inundation:</span>
            <span className="font-mono text-cyan-300 tabular-nums font-semibold">0% (Safe at +{selectedSchool.elevationMeters}m)</span>
          </div>
        </div>
      </div>

      {/* Center Section: Interactive Hydrograph Chart & Live Sensor Node Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hydrograph Chart (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl holo-panel space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>24-Hour Kadalundi Basin River Hydrograph</span>
              </h3>
              <p className="text-xs text-slate-400">
                Continuous ultrasonic water-elevation telemetry with warning and danger thresholds
              </p>
            </div>

            {/* Metric Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setActiveTabMetric('water')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  activeTabMetric === 'water'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Water Level (m)
              </button>
              <button
                onClick={() => setActiveTabMetric('rain')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  activeTabMetric === 'rain'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Rainfall (mm/h)
              </button>
            </div>
          </div>

          {/* Interactive Chart Canvas (Responsive SVG) */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-52 sm:h-64 select-none"
            >
              <defs>
                <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[1, 2, 3, 4, 5].map((level) => {
                const y = padding.top + innerHeight - (level / maxWaterY) * innerHeight;
                return (
                  <g key={level}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={padding.left + innerWidth}
                      y2={y}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {activeTabMetric === 'water' ? `${level}m` : `${level * 10}mm`}
                    </text>
                  </g>
                );
              })}

              {activeTabMetric === 'water' ? (
                <>
                  {/* Danger Stage Line (4.5m) */}
                  <line
                    x1={padding.left}
                    y1={dangerLineY}
                    x2={padding.left + innerWidth}
                    y2={dangerLineY}
                    stroke="#f43f5e"
                    strokeWidth="1.2"
                    strokeDasharray="5 3"
                  />
                  <text
                    x={padding.left + innerWidth - 5}
                    y={dangerLineY - 5}
                    fill="#f43f5e"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    DANGER CREST (4.5m)
                  </text>

                  {/* Warning Stage Line (3.0m) */}
                  <line
                    x1={padding.left}
                    y1={warningLineY}
                    x2={padding.left + innerWidth}
                    y2={warningLineY}
                    stroke="#f59e0b"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left + innerWidth - 5}
                    y={warningLineY - 5}
                    fill="#f59e0b"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    WARNING STAGE (3.0m)
                  </text>

                  {/* Gradient fill */}
                  <path d={waterAreaString} fill="url(#waterGradient)" />

                  {/* Curve line */}
                  <path
                    d={waterPathString}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points */}
                  {waterPoints.map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r={i === waterPoints.length - 1 ? 5 : 3.5}
                      fill={i === waterPoints.length - 1 ? '#22d3ee' : '#0891b2'}
                      stroke="#050B14"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() => setHoveredPoint(pt.item)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  ))}
                </>
              ) : (
                /* Rainfall Bar Chart */
                <>
                  {history.map((item, idx) => {
                    const barWidth = 26;
                    const x = padding.left + (idx / (history.length - 1)) * (innerWidth - barWidth);
                    const barHeight = (item.rainfall / maxRainY) * innerHeight;
                    const y = padding.top + innerHeight - barHeight;

                    return (
                      <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(item)} onMouseLeave={() => setHoveredPoint(null)}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx="3"
                          fill="url(#rainGradient)"
                          stroke="#38bdf8"
                          strokeWidth="1"
                          opacity={idx === history.length - 1 ? 1 : 0.75}
                        />
                        <text
                          x={x + barWidth / 2}
                          y={y - 4}
                          fill="#38bdf8"
                          fontSize="8"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {item.rainfall}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* Time X-axis Labels */}
              {history.map((item, idx) => {
                const x = padding.left + (idx / (history.length - 1)) * innerWidth;
                return (
                  <text
                    key={idx}
                    x={x}
                    y={chartHeight - 8}
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {item.time}
                  </text>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredPoint && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-900/95 border border-cyan-500/40 text-xs font-mono shadow-xl flex items-center gap-3">
                <span className="text-slate-400">Time: <strong className="text-white">{hoveredPoint.time}</strong></span>
                <span className="text-cyan-400">Water: <strong className="text-white">{hoveredPoint.waterLevel}m</strong></span>
                <span className="text-sky-400">Rain: <strong className="text-white">{hoveredPoint.rainfall}mm/h</strong></span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-cyan-400 inline-block"></span>
                <span>Normal Operating Level</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block"></span>
                <span>Warning 3.0m</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-rose-400 inline-block"></span>
                <span>Danger 4.5m</span>
              </span>
            </div>
            <div className="text-cyan-400/80">Sampling Frequency: 15 min · LoRa Telemetry</div>
          </div>
        </div>

        {/* Right Column: Sensor Node Telemetry Network */}
        <div className="p-5 rounded-2xl holo-panel space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>Sensor Node Network</span>
              </h3>
              <p className="text-xs text-slate-400">Malappuram Field Deployment Nodes</p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              4/4 Active
            </span>
          </div>

          {/* Node selector buttons */}
          <div className="space-y-2">
            {sensorNodes.map((node) => {
              const isSelected = node.id === selectedNode.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white font-mono truncate">
                      {node.name.split('—')[0]}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ONLINE
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{node.location}</p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="text-cyan-300 font-semibold">
                      Level: {node.waterLevel.toFixed(1)} m
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <BatteryCharging className="w-3 h-3 text-emerald-400" />
                      {node.battery}%
                    </span>
                    <span className="text-slate-400">{node.distanceToSchoolKm} km from school</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Node Detail Box */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1.5">
            <div className="text-cyan-400 text-[11px] uppercase tracking-wider font-bold">
              Inspecting: {selectedNode.name}
            </div>
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span className="text-slate-500">Radio Link:</span>
              <span>{selectedNode.signalQuality}</span>
            </div>
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span className="text-slate-500">GPS Coordinates:</span>
              <span>{selectedNode.lat.toFixed(4)}° N, {selectedNode.lng.toFixed(4)}° E</span>
            </div>
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span className="text-slate-500">Telemetry Interval:</span>
              <span>Every 60 seconds (Sleep mode ready)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
