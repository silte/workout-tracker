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
  avgPower?: any;
  maxPower?: any;
  avgCadence: number;
  maxCadence: number;
  ascent: number;
  descent: number;
  ascentTime: number;
  descentTime: number;
  pte: number;
  peakEpoc: number;
  performanceLevel?: any;
  recoveryTime: number;
  weather?: any;
  minTemperature?: any;
  avgTemperature?: any;
  maxTemperature?: any;
  workoutType?: any;
  feeling: number;
  tags?: any;
  gear: IGear;
  exerciseId: string;
  apps: any[];
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
  physiologicalThresholds?: any;
  overallIntensity?: any;
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
  cadence?: any;
  descent: number;
  descentMax: number;
  descentTime: number;
  distance: number;
  distanceMax: number;
  downhillGrade?: any;
  duration: number;
  energy: number;
  hr: ISummary;
  power?: any;
  recoveryTime: number;
  speed: ISummary;
  strokeRate?: any;
  strokes?: any;
  swimmingStyle?: any;
  swolf?: any;
  temperature?: any;
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
  power?: any;
}

interface ILocationPoint {
  altitude: number;
  bearing?: any;
  ehpe?: any;
  latitude: number;
  longitude: number;
  speed?: any;
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
  downhillGrade?: any;
  duration: number;
  energy: number;
  hr: ISummary;
  power?: any;
  recoveryTime: number;
  speed: ISummary;
  strokeRate?: any;
  strokes?: any;
  swimmingStyle?: any;
  swolf?: any;
  temperature?: any;
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
