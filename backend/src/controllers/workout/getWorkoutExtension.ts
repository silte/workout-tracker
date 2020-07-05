const getAltitudeStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "AltitudeStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
const getCadenceStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "CadenceStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
const getDistanceDeltaStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "DistanceDeltaStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
const getDistanceLapExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "DistanceLapExtension"
  );
  return typeof extension !== "undefined"
    ? <ILapExtension>extension
    : <ILapExtension>{};
};
const getFitnessExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "FitnessExtension"
  );
  return typeof extension !== "undefined"
    ? <IFitnessExtension>extension
    : <IFitnessExtension>{};
};
const getHeartRateExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "HeartRateExtension"
  );
  return typeof extension !== "undefined"
    ? <IHrExtension>extension
    : <IHrExtension>{};
};
const getHeartrateStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "HeartrateStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
const getIBIStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "IBIStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
const getIntensityExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "IntensityExtension"
  );
  return typeof extension !== "undefined"
    ? <IIntensityExtension>extension
    : <IIntensityExtension>{};
};
const getLocationStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "LocationStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <ILocationExtension>extension
    : <ILocationExtension>{};
};
const getManualLapStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "ManualLapStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <ILapExtension>extension
    : <ILapExtension>{};
};
const getMultisportMarker = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "MultisportMarker"
  );
  return typeof extension !== "undefined"
    ? <IMultisportExtension>extension
    : <IMultisportExtension>{};
};
const getPauseMarkerExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "PauseMarkerExtension"
  );
  return typeof extension !== "undefined"
    ? <IPauseMarkerExtension>extension
    : <IPauseMarkerExtension>{};
};
const getPowerStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "PowerStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
const getSpeedStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "SpeedStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
const getSummaryExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "SummaryExtension"
  );
  return typeof extension !== "undefined"
    ? <ISummaryExtension>extension
    : <ISummaryExtension>{};
};
const getVerticalSpeedStreamExtension = (workoutRawData: IWorkoutRawData) => {
  const extension = workoutRawData.extensions.find(
    (extension) => extension.type === "VerticalSpeedStreamExtension"
  );
  return typeof extension !== "undefined"
    ? <IBaseExtension>extension
    : <IBaseExtension>{};
};
