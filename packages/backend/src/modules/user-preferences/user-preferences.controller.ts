import { UserPreferenceProperty } from '@local/types';
import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { ObjectId } from '../../types/objectId';
import { LoggedIn } from '../auth/decorators/loggedIn.decorators';
import { UserId } from '../users/users.decorators';

import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import { UserPreferenceDto } from './dto/user-preference.dto';
import { UserPreferencesService } from './user-preferences.service';

@Controller('api/user-preferences')
@LoggedIn()
@ApiTags('User preferences')
export class UserPreferencesController {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [UserPreferenceDto] })
  async findAll(@UserId() userId: ObjectId): Promise<UserPreferenceDto[]> {
    return this.userPreferencesService.findAll(userId);
  }

  @Get(':userPreferenceProperty')
  @ApiOkResponse({ type: UserPreferenceDto })
  @ApiParam({
    name: 'userPreferenceProperty',
    enum: UserPreferenceProperty,
    enumName: 'UserPreferenceProperty',
  })
  async findOne(
    @Param('userPreferenceProperty')
    userPreferenceProperty: UserPreferenceProperty,
    @UserId() userId: ObjectId,
  ): Promise<UserPreferenceDto> {
    return (
      (await this.userPreferencesService.findOneByUserAndProperty(
        userPreferenceProperty,
        userId,
      )) ||
      ({
        key: userPreferenceProperty,
        value: '',
        userId,
      } as UserPreferenceDto) // _id is required for return type
    );
  }

  @Patch()
  @ApiOkResponse({ type: UserPreferenceDto })
  @ApiBody({ type: UpdateUserPreferenceDto })
  async update(
    @UserId() userId: ObjectId,
    @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
  ): Promise<UserPreferenceDto> {
    return this.userPreferencesService.update(userId, updateUserPreferenceDto);
  }
}
