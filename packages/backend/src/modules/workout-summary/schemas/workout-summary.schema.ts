import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MogooseTypes } from 'mongoose';

import { ObjectId } from '../../../types/objectId';
import { User } from '../../users/schemas/user.schema';

import { HrIntensity } from './hr-intensity.schema';

export type WorkoutSummaryDocument = WorkoutSummary &
  Document<MogooseTypes.ObjectId> & { _id: MogooseTypes.ObjectId };

@Schema({ collection: 'workout-summaries' })
export class WorkoutSummary {
  @Prop({
    required: true,
    index: true,
    type: MogooseTypes.ObjectId,
    ref: User.name,
  })
  userId: ObjectId;

  @Prop({ required: true })
  activityId: number;

  @Prop({ required: true, index: true })
  workoutKey: string;

  @Prop({ required: true })
  startTime: number;

  @Prop({ required: true })
  totalTime: number;

  @Prop({ default: null })
  totalDistance: number;

  @Prop({ default: null })
  totalAscent: number;

  @Prop({ default: null })
  totalDescent: number;

  @Prop({ default: null })
  maxSpeed: number;

  @Prop({ default: null })
  hrmax: number;

  @Prop({ default: null })
  hravg: number;

  @Prop({ default: null })
  avgSpeed: number;

  @Prop({ default: null })
  avgCadence: number;

  @Prop({ default: null })
  feeling: number;

  @Prop({ default: null })
  energyConsumption: number;

  @Prop({ default: null, type: HrIntensity })
  hrIntensity: HrIntensity;

  @Prop({ default: [] })
  multisportSummary: [];
}

export const WorkoutSummarySchema =
  SchemaFactory.createForClass(WorkoutSummary);
