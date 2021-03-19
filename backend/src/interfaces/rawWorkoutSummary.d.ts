interface IRawWorkoutSummaryWrapper {
  error?: never;
  payload: IRawWorkoutSummary[];
  metadata: IMetadata;
}

interface IMetadata {
  workoutcount: string;
  until: string;
}

interface IRawWorkoutSummary {
  activityId: number;
  startTime: number;
  totalTime: number;
  totalDistance: number;
  totalAscent: number;
  totalDescent: number;
  startPosition: IPositionCoordinates;
  stopPosition: IPositionCoordinates;
  centerPosition: IPositionCoordinates;
  maxSpeed: number;
  recoveryTime: number;
  cumulativeRecoveryTime: number;
  rankings: IRankings;
  extensions: IExtension[];
  extensionTypes: string[];
  isEdited: boolean;
  isManuallyAdded: boolean;
  workoutKey: string;
  cadence: ICadence;
  avgPace: number;
  avgSpeed: number;
  hrdata: IHrdata;
  energyConsumption: number;
  commentCount: number;
  pictureCount: number;
  viewCount: number;
  timeOffsetInMinutes: number;
  externalBlobSourceRaw: IExternalBlobSourceRaw;
}

interface IExternalBlobSourceRaw {
  path: string;
  gen: number;
  type: string;
}

interface IHrdata {
  userMaxHR: number;
  workoutMaxHR: number;
  workoutAvgHR: number;
  max: number;
  avg: number;
  hrmax: number;
}

interface ICadence {
  max: number;
  avg: number;
}

interface IExtension {
  type: string;
  avgSpeed?: number;
  avgPower?: number;
  maxPower?: number;
  avgCadence: number;
  maxCadence?: number;
  ascent: number;
  descent: number;
  ascentTime?: number;
  descentTime?: number;
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
  exerciseId?: never;
  apps: never[];
}

interface IGear {
  manufacturer: string;
  name: string;
  serialNumber: string;
  softwareVersion: string;
  hardwareVersion: string;
}

interface IRankings {
  totalTimeOnRouteRanking: ITotalTimeOnRouteRanking;
}

interface ITotalTimeOnRouteRanking {
  originalRanking: number;
  originalNumberOfWorkouts: number;
}
