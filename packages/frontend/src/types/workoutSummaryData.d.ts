interface ISummaryData {
  activityId: number;
  totalDuration: number;
  totalDistance: number;
  totalAscent: number;
  hrIntensity?: {
    zone1: number;
    zone2: number;
    zone3: number;
    zone4: number;
    zone5: number;
  };
}
