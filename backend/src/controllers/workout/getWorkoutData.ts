import { DATA_DIR } from "../../constants/filesNames";
import { readJson } from "../../utils/jsonHelper";
import {
  getMultisportExtension,
  getCadenceStreamExtension,
  getSummaryExtension,
  getHeartrateStreamExtension,
  getSpeedStreamExtension,
  getDistanceDeltaStreamExtension,
  getAltitudeStreamExtension,
} from "../../model/getWorkoutExtension";

const roundToThousands = (number: number) => Math.round(number / 1000) * 1000;
const roundToSingleDecimal = (number: number) => Math.round(number * 10) / 10;

export const getWorkoutData = (workoutId: string): IWorkoutData => {
  const filename = `${DATA_DIR}/${workoutId}.json`;
  const { payload: workoutData } = <IWorkoutRawDataContainer>readJson(filename);
  const {
    activityId,
    startTime,
    totalAscent,
    totalDescent,
    totalDistance,
    totalTime,
    centerPosition,
    startPosition,
    stopPosition,
    maxSpeed,
    maxAltitude,
    minAltitude,
    workoutKey,
  } = workoutData;
  const cadenceExtension = getSummaryExtension(workoutData);

  const dataPoints = parseDataPoints(workoutData);

  return {
    workoutKey,
    activityId,
    startTime,
    totalAscent,
    totalDescent,
    totalDistance,
    totalTime,
    centerPosition,
    startPosition,
    stopPosition,
    maxSpeed: roundToSingleDecimal(maxSpeed * 3.6),
    maxAltitude,
    minAltitude,
    avgCadence: cadenceExtension?.avgCadence,
    maxCadence: cadenceExtension?.maxCadence,
    dataPoints,
  };
};

const parseDataPoints = (
  workoutRawData: IWorkoutRawData
): IWorkoutDataPointData[] => {
  const roundDataPointTimestampToSeconds = ({
    timestamp,
    value,
  }: IDataPoint): IDataPoint => ({
    timestamp: roundToThousands(timestamp),
    value,
  });
  const addValueToDatapoint = (dataPointName: string) => ({
    timestamp,
    value,
  }: IDataPoint) => {
    if (!(timestamp in dataPoints)) {
      dataPoints[timestamp] = {};
    }
    dataPoints[timestamp][dataPointName] = value;
  };
  const hrData = getHeartrateStreamExtension(workoutRawData).points?.map(
    roundDataPointTimestampToSeconds
  );
  const speedData = getSpeedStreamExtension(workoutRawData)
    .points?.map(roundDataPointTimestampToSeconds)
    .map((dataPoint) => ({
      ...dataPoint,
      value: roundToSingleDecimal(dataPoint.value * 3.6),
    }));

  const distanceData = getDistanceDeltaStreamExtension(
    workoutRawData
  ).points?.map(roundDataPointTimestampToSeconds);
  const altitudeData = getAltitudeStreamExtension(workoutRawData).points?.map(
    roundDataPointTimestampToSeconds
  );
  const cadenceData = getCadenceStreamExtension(workoutRawData).points?.map(
    roundDataPointTimestampToSeconds
  );

  const dataPoints: any = {};
  hrData?.forEach(addValueToDatapoint("hr"));
  speedData?.forEach(addValueToDatapoint("speed"));
  distanceData?.forEach(addValueToDatapoint("distance"));
  altitudeData?.forEach(addValueToDatapoint("altitude"));
  cadenceData?.forEach(addValueToDatapoint("cadence"));

  return Object.entries(dataPoints).map(([timestamp, content]: any) => ({
    timestamp,
    ...content,
  }));
};
