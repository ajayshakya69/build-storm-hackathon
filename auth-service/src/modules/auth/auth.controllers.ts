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
import { AuthenticatedGuard } from './auth.guards';
import { RequestDto } from 'src/core/dtos/request.dto';
import {
  GetSessionFromTokenDto,
  SignInWithPasswordDto,
  SignUpWithPasswordDto,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpWithPasswordDto) {
    return await this.authService.signUpWithPassword(body);
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInWithPasswordDto) {
    return await this.authService.signInWithPassword(body);
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
    return await this.authService.getSessionFromToken(id);
  }

  @Post('details')
  @ApiProperty({
    description: 'Get session details with token ( PRIVATE )',
  })
  async getSessionFromToken(@Body() body: GetSessionFromTokenDto) {
    return await this.authService.getSessionFromToken(body.token);
  }
}
