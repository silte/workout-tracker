interface IRawWorkoutSummaryWrapper {
  error?: any;
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
  avgSpeed?: any;
  avgPower?: any;
  maxPower?: any;
  avgCadence: number;
  maxCadence?: any;
  ascent: number;
  descent: number;
  ascentTime?: any;
  descentTime?: any;
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
  exerciseId?: any;
  apps: any[];
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
