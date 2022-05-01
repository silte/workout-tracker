import { Logger, Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { SuuntoApiInfoService } from './modules/suunto-api-info/suunto-api-info.service';
import { isValidObjectId, ObjectId, parseObjectId } from './types/objectId';

@Injectable()
@Command({
  name: 'fetch-workouts',
  arguments: '<userId>',
  argsDescription: { userId: 'id from users collection' },
})
export class FetchUserWorkoutsCommand implements CommandRunner {
  private readonly logger = new Logger(FetchUserWorkoutsCommand.name);

  constructor(private readonly suuntoApiInfoService: SuuntoApiInfoService) {}

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

    this.logger.log(`Fetching workouts for user ${userId}`);
  }

  vefiryUserId(userId: string): boolean {
    return isValidObjectId(userId);
  }

  async verifyUserHasSuuntoConnection(userId: ObjectId): Promise<boolean> {
    const suuntoApiInfo = await this.suuntoApiInfoService.findByUser(userId);
    return Boolean(suuntoApiInfo?.apiToken);
  }
}
