import { AxiosInstanceProvider } from './axios-instance.provider';

export class DBAxiosInstance extends AxiosInstanceProvider {
  constructor() {
    super(process.env.DB_SERVICE_API!);
  }
}
