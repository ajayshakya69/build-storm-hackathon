import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InternalCallService } from 'src/services/internal-call/internal-call.service';
import { HandleAxiosMetaError } from 'src/services/internal-call/internal-call.utils';
import { HTTP_RESPONSE_CODES } from 'src/core/constants/http.constants';
import { SignUpWithPasswordDto } from './auth.dto';
import { SignInWithPasswordDto } from 'src/services/supabase/subabase.dto'; // you can move this into auth.dto
import { USER_ROLE } from 'src/core/constants/user.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly internalCallService: InternalCallService,
    private readonly jwtService: JwtService,
  ) {}

  async signUpWithPassword(data: SignUpWithPasswordDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userRes = await this.internalCallService.userAxiosInstance.createUser(
      {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role,
      },
    );

    HandleAxiosMetaError(userRes);

    return { message: 'Signed up successfully' };
  }

  async signInWithPassword(data: SignInWithPasswordDto) {
    const userRes =
      await this.internalCallService.userAxiosInstance.getUserByEmail(
        data.email,
      );

    const user = HandleAxiosMetaError(userRes);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { ...user, userId: user.id };

    const token = await this.jwtService.signAsync(payload);

    return { accessToken: token };
  }

  async changeRole(id: string, role: USER_ROLE) {
    const userRes = await this.internalCallService.userAxiosInstance.updateUser(
      id,
      {
        role,
      },
    );
    return HandleAxiosMetaError(userRes);
  }

  async getSessionFromToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
