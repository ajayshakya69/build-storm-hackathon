import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { USER_ROLE } from 'src/core/constants/user.constants';

export class SignUpWithPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ enum: USER_ROLE, example: USER_ROLE.CUSTOMER }) // adjust default example
  @IsEnum(USER_ROLE)
  role!: USER_ROLE;
}

export class SignInWithPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password!: string;
}

export class GetSessionFromTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  token!: string;
}
