import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MogooseTypes } from 'mongoose';

import { ObjectId } from '../../../types/objectId';
import { User } from '../../users/schemas/user.schema';

export type SuuntoApiInfoDocument = SuuntoApiInfo &
  Document<MogooseTypes.ObjectId> & { _id: ObjectId };

@Schema({ collection: 'suunto-api-infos', timestamps: true })
export class SuuntoApiInfo {
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: MogooseTypes.ObjectId,
    ref: User.name,
  })
  userId: ObjectId;

  @Prop({ default: null })
  apiToken: string;

  @Prop({ default: false })
  isFetching: boolean;

  @Prop({ default: [], type: [{ type: String }] })
  fetchMessage: string[];
}

export const SuuntoApiInfoSchema = SchemaFactory.createForClass(SuuntoApiInfo);
