interface IWorkoutRawDataContainer {
  error?: never;
  payload: IWorkoutRawData;
  metadata: Metadata;
}

interface Metadata {
  ts: string;
}

interface IWorkoutRawData {
  feedType: string;
  username: string;
  activityId: number;
  key: string;
  workoutName: string;
  description: string;
  startTime: number;
  stopTime: number;
  totalTime: number;
  totalDistance: number;
  startPosition: IPositionCoordinates;
  stopPosition: IPositionCoordinates;
  centerPosition: IPositionCoordinates;
  maxSpeed: number;
  polyline: string;
  workoutKey: string;
  avgPace: number;
  avgSpeed: number;
  hrdata: IHrdata;
  energyConsumption: number;
  cadence: ICadence;
  fullname: string;
  userPhoto?: never;
  coverPhoto?: never;
  stepCount: number;
  reactionCount: number;
  sharingFlags: number;
  comments: never[];
  photos: never[];
  videos: never[];
  rankings: IRankings;
  recoveryTime: number;
  cumulativeRecoveryTime: number;
  totalAscent: number;
  totalDescent: number;
  created: number;
  lastModified: number;
  extensions: Array<
    | IBaseExtension
    | ILapExtension
    | ISummaryExtension
    | IFitnessExtension
    | IHrExtension
    | IIntensityExtension
    | ILocationExtension
    | IPauseMarkerExtension
    | IMultisportExtension
  >;
  minAltitude: number;
  maxAltitude: number;
  clientCalculatedAchievements?: never;
  achievements: never[];
  userReacted: boolean;
}

interface IRankings {
  totalTimeOnRouteRanking: ITotalTimeOnRouteRanking;
}

interface ITotalTimeOnRouteRanking {
  originalRanking: number;
  originalNumberOfWorkouts: number;
}

interface ICadence {
  max: number;
  avg: number;
}

interface IHrdata {
  userMaxHR: number;
  workoutMaxHR: number;
  workoutAvgHR: number;
  hrmax: number;
  max: number;
  avg: number;
}
