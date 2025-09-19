import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Body,
  ParseUUIDPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UserService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateDevProfileDto,
  UpdateDevProfileDto,
  UserIdDto,
} from './users.dto';
import { InternalCallGuard } from 'src/core/guards/guards';
import { ERROR_MESSAGES } from './users.constant';

@ApiTags('Users & Developers')
@Controller('users')
// @UseGuards(InternalCallGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return this.userService.getAllUser();
  }

  @Get('details')
  @ApiOperation({ summary: 'Get user by id (UUID)' })
  async getUserById(@Query('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Put()
  @ApiOperation({ summary: 'Update a user' })
  async updateUser(@Body() data: UpdateUserDto, @Query('id') id: string) {
    return this.userService.updateUser(id, data);
  }

  @Get('dev')
  @ApiOperation({ summary: 'Get Developer profile by user id' })
  async getDevProfile(@Query() query: UserIdDto) {
    return this.userService.getDevProfileByUserId(query.user_id);
  }

  @Post('dev')
  @ApiOperation({ summary: 'Create developer profile' })
  async createDevProfile(@Body() body: CreateDevProfileDto) {
    return this.userService.createDevProfile(body);
  }

  @Put('dev')
  @ApiOperation({ summary: 'Update developer profile' })
  async updateDevProfile(
    @Body() body: UpdateDevProfileDto,
    @Query() query: UserIdDto,
  ) {
    return this.userService.updateDevProfile(body, query.user_id);
  }
}
