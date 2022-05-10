import { PositionCoordinates } from '@local/types';

import { HrData } from '../common-raw/hr-data';

import {
  BaseExtension,
  LapExtension,
  SummaryExtension,
  FitnessExtension,
  HrExtension,
  IntensityExtension,
  LocationExtension,
  PauseMarkerExtension,
  MultisportExtension,
} from './workout-extensions';

export type WorkoutRawContainer = {
  error?: never;
  payload: WorkoutRaw;
  metadata: Metadata;
};

interface Metadata {
  ts: string;
}

export type WorkoutRaw = {
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
  startPosition: PositionCoordinates;
  stopPosition: PositionCoordinates;
  centerPosition: PositionCoordinates;
  maxSpeed: number;
  polyline: string;
  workoutKey: string;
  avgPace: number;
  avgSpeed: number;
  hrdata: HrData;
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
    | BaseExtension
    | LapExtension
    | SummaryExtension
    | FitnessExtension
    | HrExtension
    | IntensityExtension
    | LocationExtension
    | PauseMarkerExtension
    | MultisportExtension
  >;
  minAltitude: number;
  maxAltitude: number;
  clientCalculatedAchievements?: never;
  achievements: never[];
  userReacted: boolean;
};

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
