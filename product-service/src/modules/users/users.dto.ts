import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { USER_ROLE } from 'src/core/constants/user.constants';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab',
    description: 'Supabase auth user ID',
  })
  @IsUUID()
  supabase_id: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsString()
  profile_picture?: string;
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

  @ApiPropertyOptional({ enum: USER_ROLE, example: USER_ROLE.DEVELOPER })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: USER_ROLE;
}
