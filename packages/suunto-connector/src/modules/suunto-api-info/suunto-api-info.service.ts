import { UpdateSuuntoApiInfoDto } from '@local/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ObjectId } from '../../types/objectId';

import {
  SuuntoApiInfo,
  SuuntoApiInfoDocument,
} from './schemas/suunto-api-info.schema';

@Injectable()
export class SuuntoApiInfoService {
  constructor(
    @InjectModel(SuuntoApiInfo.name)
    private suuntoApiModel: Model<SuuntoApiInfoDocument>,
  ) {}

  async findByUser(userId: ObjectId): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel.findOne({ userId }).exec();
  }

  async update(
    userId: ObjectId,
    updateSuuntoApiInfoDto: UpdateSuuntoApiInfoDto,
  ): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel
      .findOneAndUpdate({ userId }, updateSuuntoApiInfoDto, { new: true })
      .exec();
  }

  async addMessageItem(
    userId: ObjectId,
    message: string,
  ): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel
      .findOneAndUpdate(
        { userId },
        { $push: { fetchMessage: message } },
        { new: true },
      )
      .exec();
  }

  async clearFetchMessages(userId: ObjectId): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel
      .findOneAndUpdate({ userId }, { fetchMessage: [] }, { new: true })
      .exec();
  }

  async setFetchStatus(
    userId: ObjectId,
    fetchStatus: boolean,
  ): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel
      .findOneAndUpdate(
        { userId },
        { $set: { isFetching: fetchStatus } },
        { new: true },
      )
      .exec();
  }

  async clearMEssages(userId: ObjectId): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel
      .findOneAndUpdate({ userId }, { messages: [] }, { new: true })
      .exec();
  }
}
