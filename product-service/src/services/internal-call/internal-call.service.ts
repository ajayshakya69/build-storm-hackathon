import { Injectable } from '@nestjs/common';
import { DBAxiosInstance } from './micro-services/db.instance';
import { AuthAxiosInstance } from './micro-services/auth.instance';

@Injectable()
export class InternalCallService {
  public dbInstance: DBAxiosInstance;
  public authAxiosInstance: AuthAxiosInstance;
  constructor() {
    this.dbInstance = new DBAxiosInstance();
    this.authAxiosInstance = new AuthAxiosInstance();
  }
}
