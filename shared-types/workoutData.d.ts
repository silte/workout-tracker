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
  lapData: ILapData;
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

interface ILapData {
  autolap?: (ILapDataPoint|undefined)[]
}

interface ILapDataPoint {
  duration: number;
  distance: number;
  ascent: number;
  descent: number;
  maxHr: number;
  minHr: number;
  avgHr: number;
  avgSpeed: number;
  maxSpeed: number;
  endTime: number;
}