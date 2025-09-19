import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import {
  ChangeRoleDto,
  GetSessionFromTokenDto,
  SignUpWithPasswordDto,
} from './auth.dto';
import { SignInWithPasswordDto } from 'src/services/supabase/subabase.dto';
import { AuthenticatedGuard } from './auth.guards';
import { RequestDto } from 'src/core/dtos/request.dto';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiProperty({ description: 'Sign up with email and password ( ALL )' })
  async signUp(@Body() body: SignUpWithPasswordDto) {
    return await this.authService.signUpWithPassword(body);
  }

  @Post('sign-in')
  @ApiProperty({ description: 'Sign in with password ( ALL )' })
  async signInWithPassword(@Body() body: SignInWithPasswordDto) {
    return this.authService.signInWithPassword(body);
  }

  @Post('change-role')
  @UseGuards(AuthenticatedGuard)
  @ApiProperty({ description: 'Update user role ( AUTHENTICATED )' })
  async changeRole(@Query() query: ChangeRoleDto, @Req() req: RequestDto) {
    return await this.authService.changeRole(req.user.id, query.role);
  }
}

@Controller('_auth')
@ApiBearerAuth()
export class PrivateAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('details')
  @ApiProperty({
    description: 'Get session details with supabse id ( PRIVATE )',
  })
  async getSessionBySupabaseId(@Query('id') id: string) {
    return await this.authService.getSessionBySupabaseId(id);
  }

  @Post('details')
  @ApiProperty({
    description: 'Get session details with token ( PRIVATE )',
  })
  async getSessionFromToken(@Body() body: GetSessionFromTokenDto) {
    return await this.authService.getSessionFromToken(body.token);
  }
}
