// dev-profile.dto.ts
import {
  IsUUID,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { USER_ROLE } from 'src/core/constants/user.constants';

export class CreateDevProfileDto {
  @ApiProperty({ description: 'UUID of the user' })
  @IsUUID()
  user_id: string;

  @ApiPropertyOptional({
    description: 'Developer bio',
    example: 'Fullstack Developer specializing in NestJS & React',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'List of skills (comma-separated)',
    example: 'NestJS, React, PostgreSQL',
  })
  @IsOptional()
  @IsString()
  skills?: string;

  @ApiPropertyOptional({
    description: 'Developer rating (average)',
    example: 4.5,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({
    description: 'Total number of ratings received',
    example: 120,
  })
  @IsOptional()
  @IsNumber()
  total_ratings?: number;

  @ApiPropertyOptional({
    description: 'Last updated timestamp',
    type: String,
    format: 'date-time',
  })
  @ApiPropertyOptional({
    description: 'UUID of the current organization',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  current_organization_id?: string;
}

export class UpdateDevProfileDto {
  @ApiPropertyOptional({
    description: 'Developer bio',
    example: 'Backend Engineer with expertise in microservices',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'List of skills (comma-separated)',
    example: 'Node.js, Docker, Kubernetes',
  })
  @IsOptional()
  @IsString()
  skills?: string;

  @ApiPropertyOptional({
    description: 'Developer rating (average)',
    example: 4.8,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({
    description: 'Total number of ratings received',
    example: 90,
  })
  @IsOptional()
  @IsNumber()
  total_ratings?: number;

  @ApiPropertyOptional({
    description: 'Last updated timestamp',
    type: String,
    format: 'date-time',
  })
  @ApiPropertyOptional({
    description: 'UUID of the current organization',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  current_organization_id?: string;
}

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

  @ApiPropertyOptional({ enum: USER_ROLE, example: USER_ROLE.AUTHENTICATED })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: USER_ROLE;
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

export class IdDto {
  @ApiProperty({ example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab' })
  @IsUUID()
  id: string;
}

export class UserIdDto {
  @ApiProperty({ example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab' })
  @IsUUID()
  user_id: string;
}

export class OrgIdDto {
  @ApiProperty({ example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab' })
  @IsUUID()
  org_id: string;
}

export class EmailDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class SupabaseIdDto {
  @ApiProperty({ example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab' })
  @IsUUID()
  supabase_id: string;
}
