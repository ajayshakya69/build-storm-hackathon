import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { ApiBearerAuth, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { OpenGuard } from 'src/services/internal-call/internal-call.guards';
import { RequestDto } from 'src/core/dtos/request.dto';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('details')
  @ApiProperty({ description: 'Create user with supabase id ( ALL )' })
  @ApiQuery({
    name: 'id',
    required: false,
    description:
      'Optional Supabase user ID. If not provided, uses authenticated user ID.',
    type: String,
  })
  @UseGuards(OpenGuard)
  async getUserWithId(@Req() req: RequestDto, @Query('id') id?: string) {
    return await this.usersService.getUserWithId(id ?? req.user.id);
  }
}

@Controller('_users')
export class PrivateUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('details')
  @ApiProperty({ description: 'Create user with supabase id ( PRIVATE )' })
  async getUserWithId(@Query('id') id: string) {
    return await this.usersService.getUserWithId(id);
  }

  @Post()
  @ApiProperty({ description: 'Create user with supabase id ( PRIVATE )' })
  async createUserProfile(@Body() body: CreateUserDto) {
    return await this.usersService.createUserProfile(body);
  }

  @Put()
  @ApiProperty({ description: 'Create user with supabase id ( PRIVATE )' })
  async updateUserProfile(
    @Body() body: UpdateUserDto,
    @Query('id') id: string,
  ) {
    return await this.usersService.updateUserProfile(id, body);
  }

  @Post('by-email')
  @ApiProperty({ description: 'Get user by email (PRIVATE)' })
  async getUserByEmail(@Body('email') email: string) {
    return await this.usersService.getUserByEmail(email);
  }
}
