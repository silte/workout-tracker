export const getAltitudeStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "AltitudeStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getCadenceStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "CadenceStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getDistanceDeltaStreamExtension = (
  workoutRawData: IWorkoutRawData
) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "DistanceDeltaStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getDistanceLapExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "DistanceLapExtension"
  );
  return typeof extension !== "undefined"
    ? <ILapExtension>extension
    : <ILapExtension>{};
};
export const getFitnessExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "FitnessExtension"
  );
  return typeof extension !== "undefined"
    ? <IFitnessExtension>extension
    : <IFitnessExtension>{};
};
export const getHeartRateExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "HeartRateExtension"
  );
  return typeof extension !== "undefined"
    ? <IHrExtension>extension
    : <IHrExtension>{};
};
export const getHeartrateStreamExtension = (
  workoutRawData: IWorkoutRawData
) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "HeartrateStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getIBIStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "IBIStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getIntensityExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "IntensityExtension"
  );
  return typeof extension !== "undefined"
    ? <IIntensityExtension>extension
    : <IIntensityExtension>{};
};
export const getLocationStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "LocationStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <ILocationExtension>extension
    : <ILocationExtension>{};
};
export const getManualLapStreamExtension = (
  workoutRawData: IWorkoutRawData
) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "ManualLapStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <ILapExtension>extension
    : <ILapExtension>{};
};
export const getMultisportExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "MultisportMarker"
  );
  return typeof extension !== "undefined"
    ? <IMultisportExtension>extension
    : <IMultisportExtension>{};
};
export const getPauseMarkerExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "PauseMarkerExtension"
  );
  return typeof extension !== "undefined"
    ? <IPauseMarkerExtension>extension
    : <IPauseMarkerExtension>{};
};
export const getPowerStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "PowerStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getSpeedStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "SpeedStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getSummaryExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "SummaryExtension"
  );
  return typeof extension !== "undefined"
    ? <ISummaryExtension>extension
    : <ISummaryExtension>{};
};
export const getVerticalSpeedStreamExtension = (
  workoutRawData: IWorkoutRawData
) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "VerticalSpeedStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
