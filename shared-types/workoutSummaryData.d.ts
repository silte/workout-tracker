interface IWorkoutSummaryData {
  activityId: number;
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
  multisportSummary?: IWorkoutMultisportSummaryData[];
}

interface IWorkoutMultisportSummaryData {
  activityId: number;
  duration: number;
  distance: number;
  ascent: number;
  maxHr: number;
  avgHr: number;
  maxSpeed: number;
  avgSpeed: number;
}
