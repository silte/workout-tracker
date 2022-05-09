import { UpdateSuuntoApiInfoDto } from '@local/types';
import { Controller, Get, Body, Patch, Post } from '@nestjs/common';

import { ObjectId } from '../../types/objectId';
import { UserId } from '../users/users.decorators';

import { SuuntoApiInfoService } from './suunto-api-info.service';

@Controller('api/suunto-api-info')
export class SuuntoApiInfoController {
  constructor(private readonly suuntoApiInfoService: SuuntoApiInfoService) {}

  @Get()
  findByUser(@UserId() userId: ObjectId) {
    return this.suuntoApiInfoService.findByUser(userId);
  }

  @Patch()
  update(
    @UserId() userId: ObjectId,
    @Body() updateSuuntoApiInfoDto: UpdateSuuntoApiInfoDto,
  ) {
    return this.suuntoApiInfoService.update(userId, updateSuuntoApiInfoDto);
  }

  @Post('/sync-data')
  updateSummaryList(@UserId() userId: ObjectId) {
    return this.suuntoApiInfoService.updateSummaryList(userId);
  }
}
