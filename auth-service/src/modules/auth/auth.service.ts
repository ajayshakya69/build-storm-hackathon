import { BadRequestException, Injectable } from '@nestjs/common';
import { InternalCallService } from 'src/services/internal-call/internal-call.service';
import { HandleAxiosMetaError } from 'src/services/internal-call/internal-call.utils';
import { HTTP_RESPONSE_CODES } from 'src/core/constants/http.constants';
import { SupabaseService } from 'src/services/supabase/supabase.service';
import { SignUpWithPasswordDto } from './auth.dto';
import { SignInWithPasswordDto } from 'src/services/supabase/subabase.dto';
import { USER_ROLE } from 'src/core/constants/user.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly internalCallService: InternalCallService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async signUpWithPassword(data: SignUpWithPasswordDto) {
    const { data: supaUser, error } =
      await this.supabaseService.createUser(data);

    console.log('supabase ajay', error, data);
    if (error) {
      throw new BadRequestException(
        error.message ?? HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR.MESSAGE,
      );
    }

    console.log('database ajay', error);
    const userRes = await this.internalCallService.userAxiosInstance.createUser(
      {
        email: supaUser.user.email!,
        name: supaUser.user.user_metadata?.name,
        supabase_id: supaUser.user.id,
      },
    );

    if (!userRes?.meta?.success)
      await this.supabaseService.deleteUser(supaUser.user.id);

    HandleAxiosMetaError(userRes);

    return 'Signed up successsfully';
  }

  async signInWithPassword(data: SignInWithPasswordDto) {
    return this.supabaseService.signInWithPassword(data);
  }

  async changeRole(id: string, role: USER_ROLE) {
    const userRes = await this.internalCallService.userAxiosInstance.updateUser(
      id,
      { role },
    );
    return HandleAxiosMetaError(userRes);
  }

  async getSessionBySupabaseId(id: string) {
    return this.supabaseService.getUserById(id);
  }
  async getSessionFromToken(token: string) {
    return this.supabaseService.getUserFromToken(token);
  }
}
