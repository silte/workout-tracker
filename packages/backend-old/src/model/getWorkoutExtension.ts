export const getAltitudeStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "AltitudeStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getCadenceStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "CadenceStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getDistanceDeltaStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) =>
      currentExtension.type === "DistanceDeltaStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getDistanceLapExtension = (
  workoutRawData: IWorkoutRawData
): ILapExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "DistanceLapExtension"
  );
  return typeof extension !== "undefined"
    ? <ILapExtension>extension
    : <ILapExtension>{};
};
export const getFitnessExtension = (
  workoutRawData: IWorkoutRawData
): IFitnessExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "FitnessExtension"
  );
  return typeof extension !== "undefined"
    ? <IFitnessExtension>extension
    : <IFitnessExtension>{};
};
export const getHeartRateExtension = (
  workoutRawData: IWorkoutRawData
): IHrExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "HeartRateExtension"
  );
  return typeof extension !== "undefined"
    ? <IHrExtension>extension
    : <IHrExtension>{};
};
export const getHeartrateStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "HeartrateStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getIBIStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "IBIStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getIntensityExtension = (
  workoutRawData: IWorkoutRawData
): IIntensityExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "IntensityExtension"
  );
  return typeof extension !== "undefined"
    ? <IIntensityExtension>extension
    : <IIntensityExtension>{};
};
export const getLocationStreamExtension = (
  workoutRawData: IWorkoutRawData
): ILocationExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "LocationStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <ILocationExtension>extension
    : <ILocationExtension>{};
};
export const getManualLapStreamExtension = (
  workoutRawData: IWorkoutRawData
): ILapExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "ManualLapStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <ILapExtension>extension
    : <ILapExtension>{};
};
export const getMultisportExtension = (
  workoutRawData: IWorkoutRawData
): IMultisportExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "MultisportMarker"
  );
  return typeof extension !== "undefined"
    ? <IMultisportExtension>extension
    : <IMultisportExtension>{};
};
export const getPauseMarkerExtension = (
  workoutRawData: IWorkoutRawData
): IPauseMarkerExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "PauseMarkerExtension"
  );
  return typeof extension !== "undefined"
    ? <IPauseMarkerExtension>extension
    : <IPauseMarkerExtension>{};
};
export const getPowerStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "PowerStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getSpeedStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "SpeedStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
export const getSummaryExtension = (
  workoutRawData: IWorkoutRawData
): ISummaryExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) => currentExtension.type === "SummaryExtension"
  );
  return typeof extension !== "undefined"
    ? <ISummaryExtension>extension
    : <ISummaryExtension>{};
};
export const getVerticalSpeedStreamExtension = (
  workoutRawData: IWorkoutRawData
): IBaseExtension => {
  const extension = workoutRawData.extensions.find(
    (currentExtension) =>
      currentExtension.type === "VerticalSpeedStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
