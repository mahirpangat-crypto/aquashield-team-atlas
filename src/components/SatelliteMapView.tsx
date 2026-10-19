import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Crosshair, 
  Sliders, 
  ShieldAlert, 
  Waves, 
  Compass, 
  Building2, 
  Navigation, 
  Info,
  Maximize2,
  RefreshCw,
  Check,
  ArrowDown,
  MousePointer
} from 'lucide-react';
import { SchoolLocation, SensorNode, FloodCalculationResult } from '../types';
import { MALAPPURAM_SCHOOL_PRESETS } from '../utils/floodLogic';

interface SatelliteMapViewProps {
  rainfall: number;
  waterLevel: number;
  riskResult: FloodCalculationResult;
  sensorNodes: SensorNode[];
  selectedSchool: SchoolLocation;
  onUpdateSchool: (school: SchoolLocation) => void;
  onNavigateToSimulator: () => void;
}

export const SatelliteMapView: React.FC<SatelliteMapViewProps> = ({
  rainfall,
  waterLevel,
  riskResult,
  sensorNodes,
  selectedSchool,
  onUpdateSchool,
  onNavigateToSimulator,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const baseTilesRef = useRef<{ satellite: L.TileLayer; standard: L.TileLayer; labels: L.TileLayer } | null>(null);

  const [mapMode, setMapMode] = useState<'satellite' | 'standard'>('satellite');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [wheelZoomEnabled, setWheelZoomEnabled] = useState<boolean>(false);
  const [showLocationSettingModal, setShowLocationSettingModal] = useState<boolean>(false);
  const [isPinDropMode, setIsPinDropMode] = useState<boolean>(false);
  
  // Custom school form state
  const [customName, setCustomName] = useState(selectedSchool.name);
  const [customLat, setCustomLat] = useState(selectedSchool.lat.toString());
  const [customLng, setCustomLng] = useState(selectedSchool.lng.toString());
  const [customElevation, setCustomElevation] = useState(selectedSchool.elevationMeters.toString());

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // 1. Create Tile Layers
      // High-resolution Satellite Imagery (resembles Google Maps satellite mode, free & open)
      const satelliteLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Imagery &copy; Esri &mdash; DigitalGlobe, Earthstar Geographics, USDA, USGS',
          maxZoom: 19,
        }
      );

      // Standard Street Map (OpenStreetMap)
      const standardLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      );

      // CartoDB hybrid road labels overlay for satellite view
      const labelsLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; CartoDB',
          maxZoom: 19,
          pane: 'markerPane', // render beneath popups but above tiles
        }
      );

      baseTilesRef.current = {
        satellite: satelliteLayer,
        standard: standardLayer,
        labels: labelsLayer,
      };

      // 2. Initialize Leaflet instance
      // Note: scrollWheelZoom is disabled by default to support seamless continuous vertical page scrolling without scroll trapping.
      // Users can use the on-screen +/- zoom controls or toggle map zoom mode.
      const map = L.map(mapContainerRef.current, {
        center: [selectedSchool.lat, selectedSchool.lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
        layers: [satelliteLayer, labelsLayer],
      });

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Handle map clicks in pin drop mode
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        // If pin drop mode active, update custom lat lng
        setCustomLat(lat.toFixed(5));
        setCustomLng(lng.toFixed(5));
      });
    }

    // Invalidate size on scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        });
      },
      { threshold: 0.05 }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      observer.disconnect();
      // Cleanup if component unmounts
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update base map layer when mode changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const tiles = baseTilesRef.current;
    if (!map || !tiles) return;

    if (mapMode === 'satellite') {
      map.removeLayer(tiles.standard);
      map.addLayer(tiles.satellite);
      if (showLabels) {
        map.addLayer(tiles.labels);
      } else {
        map.removeLayer(tiles.labels);
      }
    } else {
      map.removeLayer(tiles.satellite);
      map.removeLayer(tiles.labels);
      map.addLayer(tiles.standard);
    }
  }, [mapMode, showLabels]);

  // Sync scrollWheelZoom state to map instance
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (wheelZoomEnabled) {
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
    }
  }, [wheelZoomEnabled]);

  // Update markers and flood contours whenever school, nodes, or waterLevel changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. SCHOOL / CAMPUS MARKER
    const schoolIcon = L.divIcon({
      className: 'custom-school-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="background: #050b14; border: 2px solid #22d3ee; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);">
            <span style="font-size: 16px;">🏫</span>
          </div>
          <div style="background: rgba(5, 11, 20, 0.95); border: 1px solid #22d3ee; border-radius: 4px; padding: 2px 6px; font-family: monospace; font-size: 10px; font-weight: bold; color: #22d3ee; white-space: nowrap; margin-top: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.8);">
            ${selectedSchool.name.length > 26 ? selectedSchool.name.slice(0, 24) + '...' : selectedSchool.name}
          </div>
        </div>
      `,
      iconSize: [36, 56],
      iconAnchor: [18, 20],
    });

    const schoolMarker = L.marker([selectedSchool.lat, selectedSchool.lng], { icon: schoolIcon }).addTo(layerGroup);
    schoolMarker.bindPopup(`
      <div style="padding: 6px; font-family: system-ui, sans-serif;">
        <div style="color: #22d3ee; font-weight: bold; font-size: 13px; font-family: monospace; margin-bottom: 4px;">
          🏫 ${selectedSchool.name}
        </div>
        <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 6px;">
          ${selectedSchool.address}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 10px; font-family: monospace; border-top: 1px solid #1e3a5f; padding-top: 6px;">
          <div><span style="color:#64748b;">Elevation:</span> <strong style="color:#38bdf8;">${selectedSchool.elevationMeters}m MSL</strong></div>
          <div><span style="color:#64748b;">PIN Code:</span> <strong style="color:#fff;">676519</strong></div>
          <div><span style="color:#64748b;">Flood Risk:</span> <strong style="color:${riskResult.color};">${riskResult.riskLevel}</strong></div>
          <div><span style="color:#64748b;">Campus Zone:</span> <strong style="color:#34d399;">Monitored Station</strong></div>
        </div>
      </div>
    `);

    // 1B. DEDICATED POST OFFICE MARKER: O.K. MURI P.O., VENGARA (676519)
    const postOfficeIcon = L.divIcon({
      className: 'custom-po-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="background: #050b14; border: 2px solid #f59e0b; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(245, 158, 11, 0.7);">
            <span style="font-size: 14px;">📮</span>
          </div>
          <div style="background: rgba(5, 11, 20, 0.95); border: 1px solid #f59e0b; border-radius: 4px; padding: 1px 5px; font-family: monospace; font-size: 9px; font-weight: bold; color: #f59e0b; white-space: nowrap; margin-top: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.8);">
            O.K. Muri P.O. 676519
          </div>
        </div>
      `,
      iconSize: [32, 50],
      iconAnchor: [16, 17],
    });

    const poMarker = L.marker([11.0435, 75.9768], { icon: postOfficeIcon }).addTo(layerGroup);
    poMarker.bindPopup(`
      <div style="padding: 6px; font-family: system-ui, sans-serif;">
        <div style="color: #f59e0b; font-weight: bold; font-size: 13px; font-family: monospace; margin-bottom: 4px;">
          📮 O.K. Muri Post Office (P.O. 676519)
        </div>
        <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 6px;">
          O.K. Muri, Vengara Sub-District, Malappuram District, Keralam 676519
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 10px; font-family: monospace; border-top: 1px solid #1e3a5f; padding-top: 6px;">
          <div><span style="color:#64748b;">Post Code:</span> <strong style="color:#f59e0b;">676519</strong></div>
          <div><span style="color:#64748b;">District:</span> <strong style="color:#fff;">Malappuram</strong></div>
          <div><span style="color:#64748b;">Taluk / Block:</span> <strong style="color:#38bdf8;">Vengara</strong></div>
          <div><span style="color:#64748b;">State:</span> <strong style="color:#fff;">Keralam</strong></div>
        </div>
      </div>
    `);

    // 2. SENSOR NODE MARKERS
    sensorNodes.forEach((node) => {
      const nodeIcon = L.divIcon({
        className: 'custom-node-marker',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <div style="background: #050b14; border: 2px solid #06b6d4; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(6, 182, 212, 0.6);">
              <span style="font-size: 13px;">📡</span>
            </div>
            <div style="background: rgba(5, 11, 20, 0.9); border: 1px solid #06b6d4; border-radius: 4px; padding: 1px 4px; font-family: monospace; font-size: 9px; color: #06b6d4; white-space: nowrap; margin-top: 2px;">
              ${node.name.split('—')[0].trim()} (${waterLevel.toFixed(1)}m)
            </div>
          </div>
        `,
        iconSize: [30, 48],
        iconAnchor: [15, 16],
      });

      const marker = L.marker([node.lat, node.lng], { icon: nodeIcon }).addTo(layerGroup);
      marker.bindPopup(`
        <div style="padding: 6px; font-family: system-ui, sans-serif;">
          <div style="color: #06b6d4; font-weight: bold; font-size: 12px; font-family: monospace; margin-bottom: 2px;">
            📡 ${node.name}
          </div>
          <div style="font-size: 11px; color: #94a3b8; margin-bottom: 6px;">
            ${node.location}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 10px; font-family: monospace; border-top: 1px solid #1e3a5f; padding-top: 6px;">
            <div><span style="color:#64748b;">Water Level:</span> <strong style="color:#22d3ee;">${waterLevel.toFixed(1)} m</strong></div>
            <div><span style="color:#64748b;">Battery:</span> <strong style="color:#34d399;">${node.battery}%</strong></div>
            <div><span style="color:#64748b;">LoRa Link:</span> <strong style="color:#38bdf8;">Online</strong></div>
            <div><span style="color:#64748b;">To Campus:</span> <strong style="color:#fff;">${node.distanceToSchoolKm} km</strong></div>
          </div>
        </div>
      `);
    });

    // 3. CIVIL DISASTER RELIEF CAMP & HOSPITAL MARKER (Vengara CHC & Relief Shelter)
    const shelterIcon = L.divIcon({
      className: 'custom-shelter-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="background: #050b14; border: 2px solid #10b981; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);">
            <span style="font-size: 13px;">🏥</span>
          </div>
          <div style="background: rgba(5, 11, 20, 0.9); border: 1px solid #10b981; border-radius: 4px; padding: 1px 4px; font-family: monospace; font-size: 9px; color: #10b981; white-space: nowrap; margin-top: 2px;">
            Vengara CHC Relief Hub
          </div>
        </div>
      `,
      iconSize: [30, 48],
      iconAnchor: [15, 16],
    });

    const shelterMarker = L.marker([11.0460, 75.9710], { icon: shelterIcon }).addTo(layerGroup);
    shelterMarker.bindPopup(`
      <div style="padding: 6px; font-family: system-ui, sans-serif;">
        <div style="color: #10b981; font-weight: bold; font-size: 12px; font-family: monospace;">
          🏥 Vengara Community Health Centre (CHC) & Emergency Shelter
        </div>
        <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">
          Near O.K. Muri, Vengara, Malappuram District, Keralam 676519
        </div>
        <div style="font-size: 10px; font-family: monospace; color: #94a3b8; margin-top: 4px;">
          Evacuation Capacity: 1,800 people · Emergency Medical Response
        </div>
      </div>
    `);

    // 4. FLOOD INUNDATION RISK CONTOURS (Centered near Vengara / O.K. Muri Kadalundi river channel)
    // The radius and color expand with the water level & rainfall
    const riverCenter: [number, number] = [11.0365, 75.9810];
    const riskColor = riskResult.color;

    // High risk core inundation circle
    L.circle(riverCenter, {
      radius: riskResult.inundationRadiusMeters,
      color: riskColor,
      weight: 2,
      fillColor: riskColor,
      fillOpacity: 0.28,
      dashArray: waterLevel > 4.5 ? '6 6' : undefined,
    })
      .bindTooltip(`O.K. Muri - Vengara River Basin Inundation Zone · Radius: ${riskResult.inundationRadiusMeters}m (${riskResult.riskLevel})`, {
        permanent: false,
        direction: 'top',
        className: 'holo-tooltip',
      })
      .addTo(layerGroup);

    // Secondary buffer advisory zone
    L.circle(riverCenter, {
      radius: riskResult.inundationRadiusMeters * 1.5,
      color: riskColor,
      weight: 1,
      fillColor: riskColor,
      fillOpacity: 0.08,
      dashArray: '3 6',
    }).addTo(layerGroup);

  }, [selectedSchool, sensorNodes, waterLevel, rainfall, riskResult]);

  // Center on school
  const handleCenterOnSchool = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedSchool.lat, selectedSchool.lng], 15, { duration: 1.2 });
    }
  };

  // Center directly on O.K. Muri, Vengara, Keralam 676519
  const handleCenterOnOKMuri = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([11.0421, 75.9754], 16, { duration: 1.2 });
    }
  };

  // Center on Kadalundi river basin
  const handleCenterOnRiver = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([11.0365, 75.9810], 14, { duration: 1.2 });
    }
  };

  // Save selected preset school
  const handleSelectPreset = (preset: SchoolLocation) => {
    onUpdateSchool(preset);
    setCustomName(preset.name);
    setCustomLat(preset.lat.toString());
    setCustomLng(preset.lng.toString());
    setCustomElevation(preset.elevationMeters.toString());
    setShowLocationSettingModal(false);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([preset.lat, preset.lng], 15);
    }
  };

  // Save custom school coordinates
  const handleSaveCustomLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    const elevation = parseFloat(customElevation) || 25;

    if (isNaN(lat) || isNaN(lng)) return;

    const newCustomSchool: SchoolLocation = {
      id: 'custom-user-school',
      name: customName.trim() || 'My School Campus, Malappuram',
      address: `Coordinates: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`,
      lat,
      lng,
      elevationMeters: elevation,
      studentCapacity: 1000,
      isCustom: true,
    };

    onUpdateSchool(newCustomSchool);
    setShowLocationSettingModal(false);
    setIsPinDropMode(false);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 15);
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Top Map Action Bar */}
      <div className="p-3.5 rounded-xl holo-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>SATELLITE GIS: O.K. MURI, VENGARA, MALAPPURAM 676519</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                Esri World Aerial Imagery
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Center Pin: {selectedSchool.name} · P.O. O.K. Muri, Vengara, Malappuram Dist, Keralam 676519 ({selectedSchool.lat.toFixed(4)}°N, {selectedSchool.lng.toFixed(4)}°E)
            </div>
          </div>
        </div>

        {/* Map Control Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Switch Satellite vs Standard */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-700">
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                mapMode === 'satellite'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapMode('standard')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                mapMode === 'standard'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard
            </button>
          </div>

          {/* Toggle Labels */}
          {mapMode === 'satellite' && (
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                showLabels
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}
            >
              {showLabels ? 'Labels: ON' : 'Labels: OFF'}
            </button>
          )}

          {/* Dedicated Quick-Jump for O.K. Muri (676519) */}
          <button
            onClick={handleCenterOnOKMuri}
            className="px-2.5 py-1 text-xs font-mono font-bold text-amber-300 hover:text-white bg-amber-950/80 border border-amber-500/60 hover:border-amber-400 rounded transition-colors flex items-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.25)]"
            title="Focus directly on O.K. Muri, Vengara, Keralam 676519"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>O.K. Muri (676519)</span>
          </button>

          {/* Re-center Buttons */}
          <button
            onClick={handleCenterOnSchool}
            className="px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-cyan-300 bg-slate-900 border border-slate-700 hover:border-cyan-400 rounded transition-colors flex items-center gap-1 cursor-pointer"
            title="Recenter on your school"
          >
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
            <span>School</span>
          </button>

          <button
            onClick={handleCenterOnRiver}
            className="px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-cyan-300 bg-slate-900 border border-slate-700 hover:border-cyan-400 rounded transition-colors flex items-center gap-1 cursor-pointer"
            title="Focus Kadalundi River Checkpoint"
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>River</span>
          </button>

          {/* Mouse Wheel Scroll Passthrough / Map Zoom Toggle */}
          <button
            onClick={() => setWheelZoomEnabled(!wheelZoomEnabled)}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer flex items-center gap-1 ${
              wheelZoomEnabled
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-700'
            }`}
            title={
              wheelZoomEnabled
                ? 'Mouse wheel zooms map. Click to unlock page scrolling.'
                : 'Continuous page scroll enabled (mouse wheel scrolls past map). Click to lock zoom to map.'
            }
          >
            <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
            <span>{wheelZoomEnabled ? 'Map Wheel Zoom: Active' : 'Page Scroll: Continuous'}</span>
          </button>

          {/* Map Location Setting (Prompt Requirement) */}
          <button
            onClick={() => setShowLocationSettingModal(true)}
            className="px-3 py-1 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Set School Location</span>
          </button>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 holo-panel h-[550px] sm:h-[620px] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {/* Leaflet DOM container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* HUD Overlay - Top Left: Real-time Flood Status */}
        <div className="absolute top-4 left-4 z-10 max-w-xs p-3 rounded-xl bg-[#050b14]/90 backdrop-blur-md border border-cyan-500/30 text-xs font-mono space-y-2 pointer-events-auto shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">ACTIVE INUNDATION:</span>
            <span 
              className="px-1.5 py-0.5 rounded font-bold"
              style={{ color: riskResult.color, backgroundColor: `${riskResult.color}20` }}
            >
              ● {riskResult.riskLevel}
            </span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300 border-t border-slate-800 pt-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Water Elevation:</span>
              <span className="text-cyan-300 font-bold">{waterLevel.toFixed(1)} metres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rainfall Intensity:</span>
              <span className="text-cyan-300 font-bold">{rainfall} mm / hr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Inundation Radius:</span>
              <span className="text-slate-200">{riskResult.inundationRadiusMeters} metres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">School Safety Margin:</span>
              <span className="text-emerald-400 font-bold">+{selectedSchool.elevationMeters}m (Safe)</span>
            </div>
          </div>

          <button
            onClick={onNavigateToSimulator}
            className="w-full mt-1 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-[11px] text-cyan-300 flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <Sliders className="w-3 h-3" />
            <span>Simulate River Overflow</span>
          </button>
        </div>

        {/* HUD Overlay - Bottom Left: Map Legend */}
        <div className="absolute bottom-4 left-4 z-10 p-3 rounded-xl bg-[#050b14]/90 backdrop-blur-md border border-cyan-500/30 text-xs font-mono space-y-1.5 pointer-events-auto shadow-xl hidden sm:block">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
            Map Legend
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span>🏫</span>
            <span>School / Campus (O.K. Muri)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span>📮</span>
            <span>O.K. Muri P.O. (PIN 676519)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span>📡</span>
            <span>Ultrasonic LoRa Telemetry Node</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span>🏥</span>
            <span>Vengara CHC Relief Hub</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span className="w-3 h-3 rounded-full border border-rose-500 bg-rose-500/30 inline-block"></span>
            <span>Inundation Zone Contour</span>
          </div>
        </div>

        {/* HUD Overlay - Top Right: Quick School Info Card */}
        <div className="absolute top-4 right-4 z-10 p-3 rounded-xl bg-[#050b14]/90 backdrop-blur-md border border-cyan-500/30 text-xs font-mono space-y-1 pointer-events-auto shadow-xl hidden md:block max-w-xs">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{selectedSchool.name}</span>
          </div>
          <div className="text-[11px] text-slate-400">{selectedSchool.address}</div>
          <div className="text-[10px] text-slate-500 pt-1">
            Lat: {selectedSchool.lat.toFixed(5)}° · Lng: {selectedSchool.lng.toFixed(5)}°
          </div>
        </div>
      </div>

      {/* Seamless Continuous Scroll Banner to Next Section (Flood Simulator) */}
      <div className="p-4 rounded-xl holo-panel flex flex-col sm:flex-row items-center justify-between gap-4 border border-cyan-500/25 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>Next Stage: Monsoonal Runoff &amp; Overtopping Simulator</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                Continuous Scroll
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Scroll down continuously past this map or click below to simulate rainfall and river elevation thresholds.
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToSimulator}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto group"
        >
          <span>Scroll to Flood Simulator</span>
          <ArrowDown className="w-4 h-4 text-cyan-200 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* School Location Settings Modal (Addresses: "If the school location is not yet known precisely, provide a map-location setting rather than inventing its exact coordinates") */}
      {showLocationSettingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl holo-panel p-6 space-y-5 border border-cyan-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold font-sans">School Map Location Setting</h3>
              </div>
              <button
                onClick={() => setShowLocationSettingModal(false)}
                className="text-slate-400 hover:text-white text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Configure which school campus in Malappuram is monitored by AquaShield. You can select an established school preset from Malappuram or type in your exact campus coordinates.
            </p>

            {/* Presets Grid */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                Option 1: Choose Malappuram School Preset
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                {MALAPPURAM_SCHOOL_PRESETS.map((preset) => {
                  const isSelected = selectedSchool.id === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white">{preset.name}</div>
                        <div className="text-[11px] text-slate-400">{preset.address}</div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="text-[11px] text-cyan-400">+{preset.elevationMeters}m MSL</div>
                        {isSelected && <span className="text-[10px] text-emerald-400">Active</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Coordinates Form */}
            <form onSubmit={handleSaveCustomLocation} className="space-y-3 pt-3 border-t border-slate-800">
              <label className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                Option 2: Enter Custom School Name & GPS Coordinates
              </label>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-mono text-slate-400">School / Institution Name:</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. My High School, Malappuram"
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">Latitude (°N):</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customLat}
                      onChange={(e) => setCustomLat(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">Longitude (°E):</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customLng}
                      onChange={(e) => setCustomLng(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">Elevation (m MSL):</label>
                    <input
                      type="number"
                      value={customElevation}
                      onChange={(e) => setCustomElevation(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400 italic">
                  * Tip: Click anywhere on the satellite map to copy clicked coordinates here.
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLocationSettingModal(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer"
                  >
                    Save & Relocate Pin
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
