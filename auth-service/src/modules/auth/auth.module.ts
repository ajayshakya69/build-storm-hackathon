import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, PrivateAuthController } from './auth.controllers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // use env var in prod
      signOptions: { expiresIn: '1d' }, // token valid for 1 day
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController, PrivateAuthController],
})
export class AuthModule {}
