import { Role } from '@local/types';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  Res,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ObjectId } from '../../types/objectId';
import { ValidateEntityId } from '../../utils/validate-entity-id.pipe';
import { Auth } from '../auth/decorators/auht.decorator';
import { LoggedIn } from '../auth/decorators/loggedIn.decorators';
import { UserDataExportDto } from '../user-data/dto/user-data-export.dto';
import { UserDataImportDto } from '../user-data/dto/user-data-import.dto';
import { UserDataService } from '../user-data/user-data.service';

import { UpdateUserDto, UpdateUserOwnUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserId } from './users.decorators';
import { UsersService } from './users.service';

@Controller('api/users')
@LoggedIn()
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => UserDataService))
    private readonly userDataService: UserDataService,
  ) {}

  @Get('my-user')
  @ApiOkResponse({ type: UserDto })
  async findOwnUser(@UserId() userId: ObjectId): Promise<UserDto> {
    return this.usersService.findOne(userId);
  }

  @Get('my-user/my-data')
  @ApiOkResponse({ type: UserDataExportDto })
  async getAllOwnUserData(@UserId() userId: ObjectId, @Res() res: Response) {
    this.getAllOneUserData(userId, res);
  }

  @Post('my-user/my-data')
  @Auth(Role.testUser)
  @ApiBody({ type: UserDataImportDto })
  @ApiOkResponse({ schema: { properties: { payload: { type: 'string' } } } })
  overrideAllOwnUserData(
    @UserId() userId: ObjectId,
    @Body() userData: UserDataImportDto,
  ) {
    return this.userDataService.overrideUserData(userId, userData);
  }

  @Patch('my-user')
  @ApiBody({ type: UpdateUserOwnUserDto })
  @ApiOkResponse({ type: UserDto })
  async updateOwnUser(
    @UserId() userId: ObjectId,
    @Body() updateUserDto: UpdateUserOwnUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Get()
  @Auth(Role.admin)
  @ApiOkResponse({ type: [UserDto] })
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(Role.admin)
  @ApiOkResponse({ type: UserDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Entity id from users collection.',
  })
  async findOne(@Param('id', ValidateEntityId) id: ObjectId): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Get(':id/my-data')
  @Auth(Role.admin)
  @ApiOkResponse({ type: UserDataExportDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Entity id from users collection.',
  })
  async getAllOneUserData(
    @Param('id', ValidateEntityId) userId: ObjectId,
    @Res() res: Response,
  ) {
    const { filename, data } = await this.userDataService.findAllOneUserData(
      userId,
    );

    res.setHeader('Content-disposition', `attachment; filename= ${filename}`);
    res.setHeader('Content-type', 'application/json');

    res.write(JSON.stringify(data), () => {
      res.end();
    });
  }

  @Patch(':id')
  @Auth('admin')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Entity id from users collection.',
  })
  async update(
    @Param('id', ValidateEntityId) id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }
}
