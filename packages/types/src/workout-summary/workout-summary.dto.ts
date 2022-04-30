import { IsMongoId } from 'class-validator';

import { IntesityZone } from './intensity-zone';

export class WorkoutSummary<ObjectIdType = string> {
  @IsMongoId()
  _id: ObjectIdType;

  @IsMongoId()
  userId: ObjectIdType;

  activityId: number;

  // workoutId
  workoutKey: string;

  startTime: number;

  totalTime: number;

  totalDistance: number;

  totalAscent: number;

  totalDescent: number;

  maxSpeed: number;

  hrmax: number;

  hravg: number;

  avgSpeed: number;

  avgCadence: number;

  feeling: number;

  energyConsumption: number;

  hrIntensity: {
    zone1: IntesityZone;
    zone2: IntesityZone;
    zone3: IntesityZone;
    zone4: IntesityZone;
    zone5: IntesityZone;
  };

  multisportSummary: any[];
}
