import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInWithPasswordDto {
  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'john@1234',
  })
  @IsString()
  password: string;
}

export class UpdateRoleDto {
  @ApiProperty({
    description: 'User role',
    example: 'ADMIN',
  })
  @IsString()
  role: string;
}
