import workoutListModel, {
  IWorkoutSummaryModel,
} from "../models/workout-list-model";

export const findWorkoutSummariesByUser = async (
  userId: string
): Promise<IWorkoutSummaryModel[] | null> => workoutListModel.find({ userId });

export const findWorkoutSummaryById = async (
  id: string
): Promise<IWorkoutSummaryModel | null> => workoutListModel.findById(id);

export const createWorkoutListItem = async (
  workoutSummary: IWorkoutSummaryModel | IWorkoutSummary
): Promise<IWorkoutSummaryModel | null> =>
  workoutListModel.create(workoutSummary);
