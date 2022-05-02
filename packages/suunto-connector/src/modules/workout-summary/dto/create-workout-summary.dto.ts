import { WorkoutSummaryDto } from '@local/types';
import { OmitType } from '@nestjs/mapped-types';

import { ObjectId } from '../../../types/objectId';

class TempClass extends WorkoutSummaryDto<ObjectId> {}

export class CreateWorkoutSummaryDto extends OmitType(TempClass, ['_id']) {}
