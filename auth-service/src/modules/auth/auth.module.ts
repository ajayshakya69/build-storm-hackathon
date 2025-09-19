import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, PrivateAuthController } from './auth.controllers';

@Module({
  providers: [AuthService],
  controllers: [AuthController, PrivateAuthController],
})
export class AuthModule {}
