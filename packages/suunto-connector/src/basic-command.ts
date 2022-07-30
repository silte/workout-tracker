import { Logger, Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { SuuntoApiInfoService } from './modules/suunto-api-info/suunto-api-info.service';
import { WorkoutHandlerService } from './modules/workout-handler/workout-handler.service';
import { WorkoutListHandlerService } from './modules/workout-list-handler/workout-list-handler.service';
import { isValidObjectId, ObjectId, parseObjectId } from './types/objectId';

@Injectable()
@Command({
  name: 'fetch-workouts',
  arguments: '<userId>',
  argsDescription: { userId: 'id from users collection' },
})
export class FetchUserWorkoutsCommand extends CommandRunner {
  private readonly logger = new Logger(FetchUserWorkoutsCommand.name);

  constructor(
    private readonly suuntoApiInfoService: SuuntoApiInfoService,
    private readonly workoutListHandlerService: WorkoutListHandlerService,
    private readonly workoutHandlerService: WorkoutHandlerService,
  ) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    const userIdStr = passedParam[0];

    if (!this.vefiryUserId(userIdStr)) {
      this.logger.error(`Invalid user id: ${userIdStr}`);
      return;
    }

    const userId = parseObjectId(userIdStr);

    if (!(await this.verifyUserHasSuuntoConnection(userId))) {
      this.logger.error(`User ${userId} has no suunto connection`);
      return;
    }

    try {
      await this.suuntoApiInfoService.setFetchStatus(userId, true);
      await this.suuntoApiInfoService.clearFetchMessages(userId);

      const { apiToken } = await this.suuntoApiInfoService.findByUser(userId);

      await this.workoutListHandlerService.updateWorkoutList(apiToken, userId);
      await this.workoutHandlerService.fetchWorkoutsFromList(apiToken, userId);
      await this.workoutListHandlerService.buildWorkoutSummaryDataCache(userId);
    } catch (error) {
      const getErroMessage = () => {
        if (typeof error !== 'object') return error;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ('message' in error) return (error as any).message;

        return error.toString();
      };

      await this.suuntoApiInfoService.addMessageItem(
        userId,
        `Error: ${getErroMessage()}`,
      );
      throw error;
    } finally {
      await this.suuntoApiInfoService.setFetchStatus(userId, false);
    }
  }

  private vefiryUserId(userId: string): boolean {
    return isValidObjectId(userId);
  }

  private async verifyUserHasSuuntoConnection(
    userId: ObjectId,
  ): Promise<boolean> {
    const suuntoApiInfo = await this.suuntoApiInfoService.findByUser(userId);
    return Boolean(suuntoApiInfo?.apiToken);
  }
}
