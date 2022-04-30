import { Injectable } from '@nestjs/common';

import { UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async getAuthenticationStatus(user?: UserDocument) {
    return {
      authenticated: Boolean(user),
      payload: user,
    };
  }

  async validateUserByGithub(githubId: string): Promise<UserDocument> {
    return this.usersService.findOneByGithubId(githubId);
  }

  async validateUserByAuth0(auht0Id: string): Promise<UserDocument> {
    return this.usersService.findOneByAuth0Id(auht0Id);
  }
}
