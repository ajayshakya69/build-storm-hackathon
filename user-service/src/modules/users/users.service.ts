import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InternalCallService } from 'src/services/internal-call/internal-call.service';
import { HandleAxiosMetaError } from 'src/services/internal-call/internal-call.utils';
import * as jwt from 'jsonwebtoken';
import { INVALID_TOKEN_ERROR_MESSAGE } from 'src/core/constants/http.constants';

@Injectable()
export class UsersService {
  constructor(private readonly internalCallService: InternalCallService) {}

  async getUserWithId(id: string) {
    const userRes = await this.internalCallService.dbInstance.getUserWithId(id);
    return await HandleAxiosMetaError(userRes);
  }
  async createUserProfile(data: CreateUserDto) {
    const userRes = await this.internalCallService.dbInstance.createUser(data);
    await HandleAxiosMetaError(userRes);
    return 'User created successfully';
  }

  async updateUserProfile(id: string, data: UpdateUserDto) {
    const userRes = await this.internalCallService.dbInstance.updateUser(
      id,
      data,
    );
    await HandleAxiosMetaError(userRes);
    return 'User updated successfully';
  }

  async getUserByEmail(email: string) {
    const userRes =
      await this.internalCallService.dbInstance.getUserWithEmail(email);
    return await HandleAxiosMetaError(userRes);
  }

  async getUserFromToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) {
      throw new UnauthorizedException(INVALID_TOKEN_ERROR_MESSAGE);
    }
    return await this.getUserWithId(decoded.userId);
  }
}
