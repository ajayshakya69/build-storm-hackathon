import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InternalCallService } from 'src/services/internal-call/internal-call.service';
import { HandleAxiosMetaError } from 'src/services/internal-call/internal-call.utils';

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
}
