import { exec } from 'child_process';

import { UpdateSuuntoApiInfoDto } from '@local/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
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

  async updateSummaryList(userId: ObjectId): Promise<{ status: string }> {
    const suuntoApiInfo = await this.findByUser(userId);

    if (!suuntoApiInfo) {
      return { status: 'No suunto api info found' };
    }

    const startCommand = this.configService.get<string>(
      'suuntoStartUpdateCommand',
    );

    this.update(userId, {
      isFetching: true,
      fetchMessage: ['Starting update process'],
    });

    exec(`${startCommand} ${userId}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    return { status: 'Sync started' };
  }
}
