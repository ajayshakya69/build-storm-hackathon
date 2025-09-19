import { AxiosInstanceProvider } from './axios-instance.provider';

export class DBAxiosInstance extends AxiosInstanceProvider {
  constructor() {
    super(process.env.DB_SERVICE_API!);
  }

  async getUserWithId(id: string) {
    const res = await this.axiosInstance.get('/db/users/details?id=' + id);
    return res?.data;
  }
}
