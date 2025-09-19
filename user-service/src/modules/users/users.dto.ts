import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { USER_ROLE } from 'src/core/constants/user.constants';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ enum: USER_ROLE, example: USER_ROLE.CUSTOMER })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role: USER_ROLE;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsString()
  profile_picture?: string;

  @ApiProperty({
    example: 'xxxxx',
    description: 'password',
  })
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsString()
  profile_picture?: string;

  @ApiPropertyOptional({ enum: USER_ROLE, example: USER_ROLE.CUSTOMER })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: USER_ROLE;
}
