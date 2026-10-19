import { FloodCalculationResult, FloodRiskLevel, HistoricalReading, SensorNode, SchoolLocation } from '../types';

export const INITIAL_TELEMETRY = {
  rainfall: 25, // 25 mm/hour
  waterLevel: 2.0, // 2.0 metres
  rateOfRise: 0.12, // m/h
  dischargeRate: 145, // m3/s
  soilMoisture: 42, // %
  lastUpdated: 'Live Demonstration Clock',
};

// Default Malappuram School choices for the map location setting
export const MALAPPURAM_SCHOOL_PRESETS: SchoolLocation[] = [
  {
    id: 'ok-muri-vengara',
    name: 'O.K. Muri Campus & P.O., Vengara',
    address: 'P.O. O.K. Muri, Vengara, Malappuram Dist, Keralam 676519',
    lat: 11.0421,
    lng: 75.9754,
    elevationMeters: 28,
    studentCapacity: 1600,
  },
  {
    id: 'ghss-malappuram',
    name: 'Government Higher Secondary School (GHSS), Malappuram',
    address: 'Down Hill, Malappuram, Kerala 676519',
    lat: 11.0505,
    lng: 76.0711,
    elevationMeters: 42,
    studentCapacity: 1450,
  },
  {
    id: 'kv-malappuram',
    name: 'Kendriya Vidyalaya Malappuram',
    address: 'Near Civil Station, Munduparamba, Malappuram 676509',
    lat: 11.0722,
    lng: 76.0825,
    elevationMeters: 56,
    studentCapacity: 920,
  },
  {
    id: 'msp-hss',
    name: 'MSP Higher Secondary School, Malappuram',
    address: 'MSP Camp Road, Malappuram, Kerala 676505',
    lat: 11.0428,
    lng: 76.0782,
    elevationMeters: 38,
    studentCapacity: 1800,
  },
  {
    id: 'st-gemmas',
    name: "St. Gemma's Girls Higher Secondary School",
    address: 'Up Hill, Malappuram, Kerala 676505',
    lat: 11.0489,
    lng: 76.0645,
    elevationMeters: 48,
    studentCapacity: 1250,
  },
  {
    id: 'kadalundi-catchment-school',
    name: 'Kadalundi River Basin Model School (Riverbank Zone)',
    address: 'Kottakkal - Malappuram Bypass Road, Kerala',
    lat: 11.0185,
    lng: 76.0124,
    elevationMeters: 14,
    studentCapacity: 850,
  },
];

export const INITIAL_SENSOR_NODES: SensorNode[] = [
  {
    id: 'node-01',
    name: 'Node Alpha — Vengara Kadalundi Basin Bridge',
    location: 'O.K. Muri - Vengara River Checkpoint',
    lat: 11.0365,
    lng: 75.9810,
    waterLevel: 2.0,
    status: 'ONLINE',
    battery: 94,
    signalQuality: '-72 dBm (LoRa 868MHz)',
    distanceToSchoolKm: 0.9,
  },
  {
    id: 'node-02',
    name: 'Node Beta — O.K. Muri Primary Catchment Canal',
    location: 'Parakkanni Road Storm Drain Inflow, O.K. Muri',
    lat: 11.0435,
    lng: 75.9772,
    waterLevel: 1.4,
    status: 'ONLINE',
    battery: 88,
    signalQuality: '-64 dBm (LoRa 868MHz)',
    distanceToSchoolKm: 0.2,
  },
  {
    id: 'node-03',
    name: 'Node Gamma — Vengara Town Junction Culvert',
    location: 'Vengara Main Road Underpass Sump',
    lat: 11.0490,
    lng: 75.9680,
    waterLevel: 1.1,
    status: 'ONLINE',
    battery: 91,
    signalQuality: '-68 dBm (LoRa 868MHz)',
    distanceToSchoolKm: 1.2,
  },
  {
    id: 'node-04',
    name: 'Node Delta — Kannamangalam Ridge Probe',
    location: 'O.K. Muri Foothill Soil Saturation Node',
    lat: 11.0515,
    lng: 75.9830,
    waterLevel: 0.8,
    status: 'ONLINE',
    battery: 97,
    signalQuality: '-79 dBm (LoRa 868MHz)',
    distanceToSchoolKm: 1.4,
  },
];

export const DEMO_24H_HISTORY: HistoricalReading[] = [
  { time: '00:00', waterLevel: 1.6, rainfall: 8 },
  { time: '03:00', waterLevel: 1.7, rainfall: 12 },
  { time: '06:00', waterLevel: 1.8, rainfall: 15 },
  { time: '09:00', waterLevel: 1.9, rainfall: 20 },
  { time: '12:00', waterLevel: 2.1, rainfall: 28 },
  { time: '15:00', waterLevel: 2.2, rainfall: 32 },
  { time: '18:00', waterLevel: 2.1, rainfall: 26 },
  { time: '21:00', waterLevel: 2.0, rainfall: 25 },
];

/**
 * Calculates flood risk from rainfall (mm/h) and river water level (m)
 */
export function calculateFloodRisk(rainfall: number, waterLevel: number): FloodCalculationResult {
  // Scientific weight: Water level contributes 60%, rainfall intensity contributes 40%
  // Normal river stage: < 3.0m
  // Warning stage: 3.0m - 4.5m
  // Danger stage: 4.5m - 6.0m
  // Inundation/Overtopping stage: > 6.0m
  
  // Rain thresholds:
  // Normal/Light: < 50 mm/h
  // Heavy: 50 - 90 mm/h
  // Very Heavy: 90 - 130 mm/h
  // Extreme / Monsoonal Cloudburst: > 130 mm/h

  let riskLevel: FloodRiskLevel = 'LOW';
  let riskScore = 15;

  // Normalized scoring 0 - 100
  const waterScore = Math.min(100, (waterLevel / 8.5) * 100);
  const rainScore = Math.min(100, (rainfall / 160) * 100);
  riskScore = Math.round(waterScore * 0.6 + rainScore * 0.4);

  if (waterLevel >= 6.0 || rainfall >= 130 || riskScore >= 75) {
    riskLevel = 'CRITICAL';
  } else if (waterLevel >= 4.5 || rainfall >= 90 || riskScore >= 52) {
    riskLevel = 'HIGH';
  } else if (waterLevel >= 3.0 || rainfall >= 50 || riskScore >= 32) {
    riskLevel = 'MODERATE';
  } else {
    riskLevel = 'LOW';
  }

  // Calculate dynamic radius around water channels in meters
  const inundationRadiusMeters = Math.round(150 + (waterLevel / 10) * 850 + (rainfall / 200) * 400);

  // Time to crest (hours)
  const timeToCrestHours = Math.max(0.8, Number((14 - (waterLevel * 1.1 + (rainfall / 25))).toFixed(1)));

  // Drainage saturation percent
  const drainageSaturationPercent = Math.min(100, Math.round((waterLevel * 8.5) + (rainfall * 0.28)));

  switch (riskLevel) {
    case 'CRITICAL':
      return {
        riskLevel: 'CRITICAL',
        riskScore,
        title: 'Severe Flood Alert · Immediate Evacuation',
        color: '#f43f5e', // rose-500
        badgeBg: 'bg-rose-500/10 text-rose-400',
        borderColor: 'border-rose-500/40',
        description: 'River channels have breached bankfull capacity. Rapid inundation in low-lying school catchments and arterial roadways.',
        recommendation: 'Sound school evacuation sirens. Move all students and staff to upper floor shelter or designated uphill relief camps. Alert District Disaster Management Authority (KSDMA 1070).',
        timeToCrestHours,
        drainageSaturationPercent,
        inundationRadiusMeters,
      };
    case 'HIGH':
      return {
        riskLevel: 'HIGH',
        riskScore,
        title: 'High Flood Risk · Yellow/Orange Alert',
        color: '#f97316', // orange-500
        badgeBg: 'bg-orange-500/10 text-orange-400',
        borderColor: 'border-orange-500/40',
        description: 'Water levels approaching critical danger marks. Surface runoff saturation causing extensive street waterlogging and drain backups.',
        recommendation: 'Suspend outdoor school activities. Stage student emergency transport. Secure ground-floor laboratory equipment and electrical panels.',
        timeToCrestHours,
        drainageSaturationPercent,
        inundationRadiusMeters,
      };
    case 'MODERATE':
      return {
        riskLevel: 'MODERATE',
        riskScore,
        title: 'Moderate Advisory · Heightened Vigilance',
        color: '#f59e0b', // amber-500
        badgeBg: 'bg-amber-500/10 text-amber-400',
        borderColor: 'border-amber-500/40',
        description: 'Moderate rise in stream discharge. Drainage channels operating near 70% capacity. Slow drainage in foothill depressions.',
        recommendation: 'Monitor automated IoT water-level telemetry closely. Inspect campus drainage culverts. Keep school emergency response squad on standby.',
        timeToCrestHours,
        drainageSaturationPercent,
        inundationRadiusMeters,
      };
    case 'LOW':
    default:
      return {
        riskLevel: 'LOW',
        riskScore,
        title: 'Nominal Conditions · Flood Risk Low',
        color: '#06b6d4', // cyan-500
        badgeBg: 'bg-cyan-500/10 text-cyan-400',
        borderColor: 'border-cyan-500/30',
        description: 'All river stages and runoff channels within safe hydrodynamic margins. Infiltration rates adequate for current precipitation.',
        recommendation: 'Standard baseline monitoring. System performing continuous sensor health diagnostics and battery telemetry.',
        timeToCrestHours,
        drainageSaturationPercent,
        inundationRadiusMeters,
      };
  }
}
