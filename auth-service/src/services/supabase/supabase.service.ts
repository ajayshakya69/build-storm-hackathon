import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  AdminUserAttributes,
  createClient,
  SignInWithPasswordCredentials,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { SignUpWithPasswordDto } from 'src/modules/auth/auth.dto';
import { InternalCallService } from '../internal-call/internal-call.service';
import { HandleAxiosMetaError } from '../internal-call/internal-call.utils';
import {
  USER_NOT_EXISTS,
  UserDetailsDto,
} from 'src/core/constants/user.constants';

@Injectable()
export class SupabaseService {
  private supabaseAdmin: SupabaseClient;
  private supabaseClient: SupabaseClient;

  constructor(
    private readonly jwtService: JwtService,
    private readonly internalCallService: InternalCallService,
  ) {
    this.supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
    );
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
  }

  getClient(): SupabaseClient {
    return this.supabaseAdmin;
  }

  getBrowserClient(): SupabaseClient {
    return this.supabaseClient;
  }

  async getUserFromToken(
    token: string,
  ): Promise<{ session: User; user: UserDetailsDto }> {
    const tokenData = this.jwtService.verify(token, {
      secret: process.env.SUPABASE_JWT_SECRET,
      ignoreExpiration: false,
    });

    return await this.getUserById(tokenData.sub);
  }

  async getUserById(id: string) {
    const {
      data: { user: session },
      error,
    } = await this.supabaseAdmin.auth.admin.getUserById(id);

    if (!session) throw new NotFoundException(USER_NOT_EXISTS);

    const userRes =
      await this.internalCallService.userAxiosInstance.getUserById(session.id);

    const user: UserDetailsDto = HandleAxiosMetaError(userRes);
    return { session, user };
  }

  async signInWithPassword(credentials: SignInWithPasswordCredentials) {
    return await this.supabaseClient.auth.signInWithPassword(credentials);
  }

  async createUser(data: SignUpWithPasswordDto) {
    return await this.supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        name: data.name,
      },
    });
  }

  async deleteUser(id: string) {
    return await this.supabaseAdmin.auth.admin.deleteUser(id);
  }
}
