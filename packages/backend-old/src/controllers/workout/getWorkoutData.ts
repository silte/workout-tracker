import {
  getCadenceStreamExtension,
  getHeartrateStreamExtension,
  getSpeedStreamExtension,
  getDistanceDeltaStreamExtension,
  getAltitudeStreamExtension,
} from "../../model/getWorkoutExtension";

const roundToThousands = (number: number) => Math.round(number / 1000) * 1000;
export const roundToSingleDecimal = (number: number): number =>
  Math.round(number * 10) / 10;

// eslint-disable-next-line import/prefer-default-export
export const parseDataPoints = (
  workoutRawData: IWorkoutRawData
): IWorkoutDataPointData[] => {
  const dataPoints = {} as {
    [timestamp in number]: { [dataPointKey in string]: string | number };
  };

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

  hrData?.forEach(addValueToDatapoint("hr"));
  speedData?.forEach(addValueToDatapoint("speed"));
  distanceData?.forEach(addValueToDatapoint("distance"));
  altitudeData?.forEach(addValueToDatapoint("altitude"));
  cadenceData?.forEach(addValueToDatapoint("cadence"));

  return Object.entries(dataPoints).map(([timestamp, content]) => ({
    timestamp,
    ...content,
  }));
};
