import { DATA_DIR } from "../../constants/filesNames";
import { readJson } from "../../utils/jsonHelper";
import {
  getMultisportExtension,
  getCadenceStreamExtension,
  getSummaryExtension,
} from "../../model/getWorkoutExtension";

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
    maxSpeed,
    maxAltitude,
    minAltitude,
    avgCadence: cadenceExtension?.avgCadence,
    maxCadence: cadenceExtension?.maxCadence,
  };
};
