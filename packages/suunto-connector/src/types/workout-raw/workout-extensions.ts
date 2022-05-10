import { ZoneSummary } from './zone-data';

export type BaseExtension = {
  type: string;
  points: DataPoint[];
};

export type LapExtension = {
  type: string;
  markers: LapMarker[];
};

export type SummaryExtension = {
  type: string;
  avgSpeed: number;
  avgPower?: number;
  maxPower?: number;
  avgCadence: number;
  maxCadence: number;
  ascent: number;
  descent: number;
  ascentTime: number;
  descentTime: number;
  pte: number;
  peakEpoc: number;
  performanceLevel?: number;
  recoveryTime: number;
  weather?: never;
  minTemperature?: number;
  avgTemperature?: number;
  maxTemperature?: number;
  workoutType?: never;
  feeling: number;
  tags?: never;
  gear: Gear;
  exerciseId: string;
  apps: never[];
};

export type FitnessExtension = {
  type: string;
  maxHeartRate: number;
  vo2Max: number;
  estimatedVo2Max: number;
};

export type HrExtension = {
  type: string;
  avgHeartRate: number;
  peakHeartRate: number;
};

export type IntensityExtension = {
  type: string;
  zones: Zones;
  physiologicalThresholds?: never;
  overallIntensity?: never;
};

export type LocationExtension = {
  type: string;
  locationPoints: LocationPoint[];
};

export type PauseMarkerExtension = {
  type: string;
  pauseMarkers: PauseMarker[];
};

export type MultisportExtension = {
  type: string;
  Markers: MultisportMarker[];
};

export type DataPoint = {
  value: number;
  timestamp: number;
};

export type LapMarker = {
  startTime: number;
  endTime: number;
  totals?: LapTotal;
};

export type LapTotal = {
  activityId: string;
  altitude: Summary;
  ascent: number;
  ascentTime: number;
  cadence?: number;
  descent: number;
  descentMax: number;
  descentTime: number;
  distance: number;
  distanceMax: number;
  downhillGrade?: never;
  duration: number;
  energy: number;
  hr: Summary;
  power?: number;
  recoveryTime: number;
  speed: Summary;
  strokeRate?: number;
  strokes?: number;
  swimmingStyle?: never;
  swolf?: never;
  temperature?: number;
  verticalSpeed: Summary;
};

export type Summary = {
  min: number;
  avg: number;
  max: number;
};

export type Zones = {
  heartRate: ZoneSummary;
  speed: ZoneSummary;
  power?: number;
};

export type LocationPoint = {
  altitude: number;
  bearing?: never;
  ehpe?: never;
  latitude: number;
  longitude: number;
  speed?: number;
  timestamp: number;
};

export type MultisportMarker = {
  ActivityID: number;
  StartTime: number;
  EndTime: number;
  Totals: MultisportTotals;
};

export type MultisportTotals = {
  activityId: string;
  altitude: Summary;
  ascent: number;
  ascentTime: number;
  cadence?: Summary;
  descent: number;
  descentMax: number;
  descentTime: number;
  distance: number;
  distanceMax: number;
  downhillGrade?: never;
  duration: number;
  energy: number;
  hr: Summary;
  power?: number;
  recoveryTime: number;
  speed: Summary;
  strokeRate?: number;
  strokes?: number;
  swimmingStyle?: never;
  swolf?: never;
  temperature?: number;
  verticalSpeed: Summary;
};

export type PauseMarker = {
  startTime: number;
  endTime: number;
  automatic: boolean;
};

export type Gear = {
  manufacturer: string;
  name: string;
  serialNumber: string;
  softwareVersion: string;
  hardwareVersion: string;
};
