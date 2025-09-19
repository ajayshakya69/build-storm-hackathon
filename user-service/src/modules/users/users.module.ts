import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrivateUsersController, UsersController } from './users.controllers';

@Module({
  providers: [UsersService],
  controllers: [UsersController, PrivateUsersController],
})
export class UsersModule {}
