import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { USER_ROLE } from 'src/core/constants/user.constants';

export class SignUpWithPasswordDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ enum: USER_ROLE })
  @IsEnum(USER_ROLE)
  role!: USER_ROLE; // role only at signup
}

export class SignInWithPasswordDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}

export class GetSessionFromTokenDto {
  @ApiProperty()
  @IsString()
  token!: string;
}
