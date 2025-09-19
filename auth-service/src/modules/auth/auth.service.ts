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
import { randomUUID } from 'crypto';
import { SupabaseService } from 'src/services/supabase/supabase.service';

@Injectable()
export class AuthService {
  private supabase: SupabaseService;
  constructor(
    private readonly internalCallService: InternalCallService,
    private readonly jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async signUpWithPassword(data: SignUpWithPasswordDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userRes = await this.internalCallService.userAxiosInstance.createUser(
      {
        email: data.email,
        name: data.name,
        password: hashedPassword,
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

    HandleAxiosMetaError(userRes);

    const user = userRes.data;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
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

  async uploadFile(file: any) {
    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from('hackathon-build-storm')
      .upload(
        `${file.originalname}-${randomUUID()}-${Date.now()}`,
        file.buffer,
        {
          contentType: file.mimetype,
          upsert: true,
        },
      );

    if (error) {
      throw new BadRequestException(error.message);
    }

    const publicURL = this.supabaseService
      .getClient()
      .storage.from('hackathon-build-storm')
      .getPublicUrl(data.path);
    return publicURL;
  }
}
