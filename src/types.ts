export type FloodRiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface FloodTelemetry {
  rainfall: number; // mm/hour (0 - 200)
  waterLevel: number; // metres (0 - 10)
  rateOfRise: number; // m/hour
  dischargeRate: number; // m3/s
  soilMoisture: number; // %
  lastUpdated: string;
}

export interface SensorNode {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  waterLevel: number;
  status: 'ONLINE' | 'STANDBY' | 'WARNING' | 'ALERT';
  battery: number;
  signalQuality: string;
  distanceToSchoolKm: number;
}

export interface SchoolLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  elevationMeters: number;
  studentCapacity: number;
  isCustom?: boolean;
}

export interface FloodCalculationResult {
  riskLevel: FloodRiskLevel;
  riskScore: number; // 0 - 100
  title: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  description: string;
  recommendation: string;
  timeToCrestHours: number;
  drainageSaturationPercent: number;
  inundationRadiusMeters: number;
}

export interface HistoricalReading {
  time: string;
  waterLevel: number;
  rainfall: number;
}
