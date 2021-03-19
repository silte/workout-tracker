interface IWorkoutSummary {
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
  avgSpeed?: number;
  avgCadence: number;
  feeling: number;
  energyConsumption: number;
  hrIntensity: IZoneSummary;
  multisportSummary?: IWorkoutMultisportSummary[];
}

interface IWorkoutMultisportSummary {
  activityId: number;
  duration: number;
  distance: number;
  ascent: number;
  maxHr: number;
  avgHr: number;
  maxSpeed: number;
  avgSpeed: number;
}

interface IZoneSummary {
  zone1: IZoneSummaryValue;
  zone2: IZoneSummaryValue;
  zone3: IZoneSummaryValue;
  zone4: IZoneSummaryValue;
  zone5: IZoneSummaryValue;
}

interface IZoneSummaryValue {
  totalTime: number;
  lowerLimit: number;
}
