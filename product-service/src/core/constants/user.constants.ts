export enum USER_ROLE {
  DEVELOPER = 'DEVELOPER',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  AUTHENTICATED = 'AUTHENTICATED',
}

export interface UserDetailsDto {
  id: string;
  email: string;
  name?: string;
  profile_picture?: string;
  role: USER_ROLE;
  createdAt?: Date;
  updatedAt?: Date;
}

export const USER_NOT_EXISTS = 'User not exists';
