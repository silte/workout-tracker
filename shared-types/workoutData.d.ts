interface IWorkoutData {
  workoutKey: string;
  activityId: number;
  startTime: number;
  totalAscent: number;
  totalDescent: number;
  totalDistance: number;
  totalTime: number;
  centerPosition: IPositionCoordinates;
  startPosition: IPositionCoordinates;
  stopPosition: IPositionCoordinates;
  maxSpeed: number;
  maxAltitude: number;
  minAltitude: number;
  avgCadence: number;
  maxCadence: number;
  dataPoints: IWorkoutDataPointData[];
}

interface IPositionCoordinates {
  x: number;
  y: number;
}

interface IWorkoutDataPointData {
  timestamp: string;
  hr?: number;
  speed?: number;
  distance?: number;
  altitude?: number;
  cadence?: number;
}
