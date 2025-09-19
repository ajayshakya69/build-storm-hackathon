import { Injectable } from '@nestjs/common';
import { DBAxiosInstance } from './micro-services/db.instance';
import { UserAxiosInstance } from './micro-services/user.instance';

@Injectable()
export class InternalCallService {
  public dbInstance: DBAxiosInstance;
  public userAxiosInstance: UserAxiosInstance;
  constructor() {
    this.dbInstance = new DBAxiosInstance();
    this.userAxiosInstance = new UserAxiosInstance();
  }
}
