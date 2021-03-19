interface IBaseExtension {
  type: string;
  points: IDataPoint[];
}

interface ILapExtension {
  type: string;
  markers: ILapMarker[];
}

interface ISummaryExtension {
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
  gear: IGear;
  exerciseId: string;
  apps: never[];
}

interface IFitnessExtension {
  type: string;
  maxHeartRate: number;
  vo2Max: number;
  estimatedVo2Max: number;
}

interface IHrExtension {
  type: string;
  avgHeartRate: number;
  peakHeartRate: number;
}

interface IIntensityExtension {
  type: string;
  zones: IZones;
  physiologicalThresholds?: never;
  overallIntensity?: never;
}

interface ILocationExtension {
  type: string;
  locationPoints: ILocationPoint[];
}

interface IPauseMarkerExtension {
  type: string;
  pauseMarkers: IPauseMarker[];
}

interface IMultisportExtension {
  type: string;
  Markers: IMultisportMarker[];
}

interface IDataPoint {
  value: number;
  timestamp: number;
}

interface ILapMarker {
  startTime: number;
  endTime: number;
  totals?: ILapTotal;
}

interface ILapTotal {
  activityId: string;
  altitude: ISummary;
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
  hr: ISummary;
  power?: number;
  recoveryTime: number;
  speed: ISummary;
  strokeRate?: number;
  strokes?: number;
  swimmingStyle?: never;
  swolf?: never;
  temperature?: number;
  verticalSpeed: ISummary;
}

interface ISummary {
  min: number;
  avg: number;
  max: number;
}

interface IZones {
  heartRate: IZoneSummary;
  speed: IZoneSummary;
  power?: number;
}

interface ILocationPoint {
  altitude: number;
  bearing?: never;
  ehpe?: never;
  latitude: number;
  longitude: number;
  speed?: number;
  timestamp: number;
}

interface IMultisportMarker {
  ActivityID: number;
  StartTime: number;
  EndTime: number;
  Totals: IMultisportTotals;
}

interface IMultisportTotals {
  activityId: string;
  altitude: ISummary;
  ascent: number;
  ascentTime: number;
  cadence?: ISummary;
  descent: number;
  descentMax: number;
  descentTime: number;
  distance: number;
  distanceMax: number;
  downhillGrade?: never;
  duration: number;
  energy: number;
  hr: ISummary;
  power?: number;
  recoveryTime: number;
  speed: ISummary;
  strokeRate?: number;
  strokes?: number;
  swimmingStyle?: never;
  swolf?: never;
  temperature?: number;
  verticalSpeed: ISummary;
}

interface IPauseMarker {
  startTime: number;
  endTime: number;
  automatic: boolean;
}

interface IGear {
  manufacturer: string;
  name: string;
  serialNumber: string;
  softwareVersion: string;
  hardwareVersion: string;
}
