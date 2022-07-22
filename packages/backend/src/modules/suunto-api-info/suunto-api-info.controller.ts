import { Controller, Get, Body, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ObjectId } from '../../types/objectId';
import { LoggedIn } from '../auth/decorators/loggedIn.decorators';
import { UserId } from '../users/users.decorators';

import { SuuntoApiInfoDto } from './dto/suunto-api-info.dto';
import { UpdateSuuntoApiInfoDto } from './dto/update-suunto-api-info.dto';
import { SuuntoApiInfoService } from './suunto-api-info.service';

@Controller('api/suunto-api-info')
@LoggedIn()
@ApiTags('Suunto API Info')
export class SuuntoApiInfoController {
  constructor(private readonly suuntoApiInfoService: SuuntoApiInfoService) {}

  @Get()
  @ApiOkResponse({ type: SuuntoApiInfoDto })
  async findByUser(@UserId() userId: ObjectId): Promise<SuuntoApiInfoDto> {
    return this.suuntoApiInfoService.findByUser(userId);
  }

  @Patch()
  @ApiOkResponse({ type: SuuntoApiInfoDto })
  @ApiBody({ type: UpdateSuuntoApiInfoDto })
  update(
    @UserId() userId: ObjectId,
    @Body() updateSuuntoApiInfoDto: UpdateSuuntoApiInfoDto,
  ): Promise<SuuntoApiInfoDto> {
    return this.suuntoApiInfoService.update(userId, updateSuuntoApiInfoDto);
  }

  @Post('/sync-data')
  @ApiOkResponse({ schema: { properties: { status: { type: 'string' } } } })
  updateSummaryList(@UserId() userId: ObjectId) {
    return this.suuntoApiInfoService.updateSummaryList(userId);
  }
}
