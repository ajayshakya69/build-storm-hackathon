import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DbService } from 'src/core/services/db-service/db.service';
import {
  CreateDevProfileDto,
  CreateUserDto,
  UpdateDevProfileDto,
  UpdateUserDto,
} from './users.dto';
import { DevProfileModel, UserModel } from './users.schema';
import { ERROR_MESSAGES } from './users.constant';

@Injectable()
export class UserService {
  private readonly UserModel: typeof UserModel;
  private readonly DevProfileModel: typeof DevProfileModel;
  constructor(private readonly dbService: DbService) {
    this.UserModel = this.dbService.sqlService.UserModel;
    this.DevProfileModel = this.dbService.sqlService.DevProfileModel;
  }

  async getUserById(id: string) {
    const user = await this.UserModel.findOne({ where: { id } });
    if (!user) throw new NotFoundException(ERROR_MESSAGES.USER_NOT_EXIST);
    return user;
  }

  async getAllUser() {
    return await this.UserModel.findAll();
  }

  async getUserByEmail(email: string) {
    const user = await this.UserModel.findOne({
      where: { email },
    });
    return user;
  }

  async createUser(data: CreateUserDto) {
    const checkUser = await this.getUserByEmail(data.email);
    if (checkUser)
      throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXIST);

    console.log('this is probem');
    try {
      const res = await this.UserModel.create({
        ...data,
        id: data.supabase_id,
      });
      return res;
    } catch (error: any) {
      console.log(error);
    }
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.getUserById(id);
    return await this.UserModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async getDevProfileByUserId(id: string) {
    const user = await this.DevProfileModel.findOne({
      where: { user_id: id },
    });
    if (!user) throw new NotFoundException(ERROR_MESSAGES.USER_NOT_EXIST);
    return user;
  }

  async createDevProfile(data: CreateDevProfileDto) {
    const checkProfile = await this.DevProfileModel.findOne({
      where: { user_id: data.user_id },
    });
    if (checkProfile)
      throw new BadRequestException(ERROR_MESSAGES.PROFILE_ALREADY_EXIST);

    return await this.DevProfileModel.create({ ...data });
  }
  async updateDevProfile(data: UpdateDevProfileDto, user_id: string) {
    const checkProfile = await this.getDevProfileByUserId(user_id);
    if (!checkProfile)
      throw new BadRequestException(ERROR_MESSAGES.PROFILE_NOT_EXIST);
    return await this.DevProfileModel.update(data, {
      where: { user_id: user_id },
    });
  }
}
