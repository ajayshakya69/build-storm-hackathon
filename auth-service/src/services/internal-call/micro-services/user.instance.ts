import { AxiosInstanceProvider } from './axios-instance.provider';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

export class UserAxiosInstance extends AxiosInstanceProvider {
  constructor() {
    super(process.env.USER_SERVICE_API!);
  }

  async getUserById(id: string) {
    const res = await this.axiosInstance.get('/_users/details?id=' + id);
    return res?.data;
  }

  async createUser(data: CreateUserDto) {
    const res = await this.axiosInstance.post('/_users', data);
    return res?.data;
  }
  async updateUser(id: string, data: UpdateUserDto) {
    const res = await this.axiosInstance.put('/_users?id=' + id, data);
    return res?.data;
  }
}
