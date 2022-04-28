import rawWorkoutListModel, {
  IRawWorkoutSummaryModel,
} from "../models/raw-workout-list-model";

export const findRawWorkoutSummariesByUser = async (
  userId: string
): Promise<IRawWorkoutSummaryModel[] | null> =>
  rawWorkoutListModel.find({ userId });

export const findRawWorkoutSummaryById = async (
  id: string
): Promise<IRawWorkoutSummaryModel | null> => rawWorkoutListModel.findById(id);

export const createRawWorkoutSummary = async (
  workoutSummary: IRawWorkoutSummaryModel | IRawWorkoutSummary
): Promise<IRawWorkoutSummaryModel | null> =>
  rawWorkoutListModel.create(workoutSummary);
