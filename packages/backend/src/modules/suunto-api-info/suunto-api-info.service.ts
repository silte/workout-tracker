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

  async create(suuntoApiInfo: Partial<SuuntoApiInfo>): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel.create(suuntoApiInfo);
  }

  async findByUser(userId: ObjectId): Promise<SuuntoApiInfo> {
    return this.suuntoApiModel.findOne({ userId }).exec();
  }

  async update(
    userId: ObjectId,
    updateSuuntoApiInfoDto: UpdateSuuntoApiInfoDto,
  ): Promise<SuuntoApiInfo> {
    const suuntoApiInfo = await this.findByUser(userId);

    if (!suuntoApiInfo) {
      return this.create({ ...updateSuuntoApiInfoDto, userId });
    }

    return this.suuntoApiModel
      .findOneAndUpdate({ userId }, updateSuuntoApiInfoDto, { new: true })
      .exec();
  }
}
