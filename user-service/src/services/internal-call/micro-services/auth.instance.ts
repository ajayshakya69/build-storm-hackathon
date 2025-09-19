import { AxiosInstanceProvider } from './axios-instance.provider';

export class AuthAxiosInstance extends AxiosInstanceProvider {
  constructor() {
    super(process.env.AUTH_SERVICE_API!);
  }

  async getSessionFromToken(token: string) {
    const res = await this.axiosInstance.post('/_auth/details', { token });
    return res?.data;
  }
}
