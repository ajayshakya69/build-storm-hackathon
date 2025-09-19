import { CreateUserDto, UpdateUserDto } from 'src/modules/users/users.dto';
import { AxiosInstanceProvider } from './axios-instance.provider';

export class DBAxiosInstance extends AxiosInstanceProvider {
  constructor() {
    super(process.env.DB_SERVICE_API!);
  }

  async getUserWithId(id: string) {
    const res = await this.axiosInstance.get('/db/users/details?id=' + id);
    return res?.data;
  }
  async getUserWithEmail(email: string) {
    const res = await this.axiosInstance.post('/db/users/by-email', { email });
    return res?.data;
  }

  async createUser(data: CreateUserDto) {
    const res = await this.axiosInstance.post('/db/users', data);
    return res?.data;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const res = await this.axiosInstance.put('/db/users?id=' + id, data);
    return res?.data;
  }
}
