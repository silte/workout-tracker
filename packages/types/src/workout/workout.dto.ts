import { WorkoutDataPoint } from './data-point';
import { PositionCoordinates } from './position-coordinates';

export class WorkoutDto {
  workoutKey: string;

  activityId: number;

  startTime: number;

  totalAscent: number;

  totalDescent: number;

  totalDistance: number;

  totalTime: number;

  centerPosition: PositionCoordinates;

  startPosition: PositionCoordinates;

  stopPosition: PositionCoordinates;

  maxSpeed: number;

  maxAltitude: number;

  minAltitude: number;

  avgCadence: number;

  maxCadence: number;

  dataPoints: WorkoutDataPoint[];
}
