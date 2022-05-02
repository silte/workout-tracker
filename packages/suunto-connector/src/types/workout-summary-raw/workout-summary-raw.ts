import { PositionCoordinates } from '@local/types';

import { HrData } from '../common-raw/hr-data';

export type WorkoutSummaryRawWrapper = {
  error?: never;
  payload: WorkoutSummaryRaw[];
  metadata: Metadata;
};

export type WorkoutSummaryRaw = {
  activityId: number;
  startTime: number;
  totalTime: number;
  totalDistance: number;
  totalAscent: number;
  totalDescent: number;
  startPosition: PositionCoordinates;
  stopPosition: PositionCoordinates;
  centerPosition: PositionCoordinates;
  maxSpeed: number;
  recoveryTime: number;
  cumulativeRecoveryTime: number;
  rankings: Ranking;
  extensions: Extension[];
  extensionTypes: string[];
  isEdited: boolean;
  isManuallyAdded: boolean;
  workoutKey: string;
  cadence: Cadence;
  avgPace: number;
  avgSpeed: number;
  hrdata: HrData;
  energyConsumption: number;
  commentCount: number;
  pictureCount: number;
  viewCount: number;
  timeOffsetInMinutes: number;
  externalBlobSourceRaw: ExternalBlobSource;
};

type Metadata = {
  workoutcount: string;
  until: string;
};

export type ExternalBlobSource = {
  path: string;
  gen: number;
  type: string;
};

export type Cadence = {
  max: number;
  avg: number;
};

export type Extension = {
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
  gear: Gear;
  exerciseId?: never;
  apps: never[];
};

type Gear = {
  manufacturer: string;
  name: string;
  serialNumber: string;
  softwareVersion: string;
  hardwareVersion: string;
};

export type Ranking = {
  totalTimeOnRouteRanking: TotalTimeOnRouteRanking;
};

type TotalTimeOnRouteRanking = {
  originalRanking: number;
  originalNumberOfWorkouts: number;
};
