import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MogooseTypes } from 'mongoose';

import { ObjectId } from '../../../types/objectId';
import { User } from '../../users/schemas/user.schema';

export type RawWorkoutSummaryDocument = RawWorkoutSummary &
  Document<MogooseTypes.ObjectId>;

@Schema()
class PositionCoordinates {
  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;
}

@Schema({ collection: 'raw-workout-summaries' })
export class RawWorkoutSummary {
  @Prop({
    required: true,
    index: true,
    type: MogooseTypes.ObjectId,
    ref: User.name,
  })
  userId: ObjectId;

  @Prop({ required: true })
  activityId: number;

  @Prop({ required: true })
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
  avgSpeed: number;

  @Prop({ default: null })
  energyConsumption: number;

  @Prop({ default: null, type: PositionCoordinates })
  startPosition: PositionCoordinates;

  @Prop({ default: null, type: PositionCoordinates })
  stopPosition: PositionCoordinates;

  @Prop({ default: null, type: PositionCoordinates })
  centerPosition: PositionCoordinates;

  @Prop({ default: null })
  recoveryTime: number;

  @Prop({ default: null })
  cumulativeRecoveryTime: number;

  @Prop({ default: [] })
  extensions: [];

  @Prop({ default: [], type: [{ type: String }] })
  extensionTypes: string[];

  @Prop({ default: true })
  isEdited: boolean;

  @Prop({ default: true })
  isManuallyAdded: boolean;

  @Prop({ default: null })
  cadence: any;

  @Prop({ default: null })
  avgPace: number;

  @Prop({ default: null })
  hrdata: any;

  @Prop({ default: null })
  commentCount: number;

  @Prop({ default: null })
  pictureCount: number;

  @Prop({ default: null })
  viewCount: number;

  @Prop({ default: null })
  timeOffsetInMinutes: number;

  @Prop({ default: null })
  externalBlobSourceRaw: any;

  @Prop({ default: null })
  rankings: {
    max: number;
    avg: number;
  };
}

export const RawWorkoutSummarySchema =
  SchemaFactory.createForClass(RawWorkoutSummary);
