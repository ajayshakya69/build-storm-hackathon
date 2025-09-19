import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsEnum } from 'class-validator';
import { InvitationStatusEnum } from './organization.types';

//
// Organization DTO
//
export class CreateOrganizationDto {
  @ApiProperty({ example: 'Tech Corp Pvt Ltd' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Saas platform' })
  @IsString()
  industry_type?: string;

  @ApiProperty({ example: '+91-9876543210' })
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: 'User ID of the manager who created the organization',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  created_by: string;
}

export class UpdateOrganizationDto {
  @ApiProperty({ example: 'Tech Corp Pvt Ltd' })
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Saas platform' })
  @IsString()
  industry_type?: string;

  @ApiProperty({ example: '+91-9876543210' })
  @IsString()
  phone_number?: string;

  @ApiProperty({
    description: 'User ID of the manager who created the organization',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  created_by: string;
}

//
// Organization Invitation DTO
//
export class CreateOrganizationInvitationDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  organization_id: string;

  @ApiPropertyOptional({
    enum: InvitationStatusEnum,
    default: InvitationStatusEnum.PENDING,
  })
  @IsEnum(InvitationStatusEnum)
  @IsOptional()
  status?: InvitationStatusEnum;
}

export class InvitationResponseDto {
  @ApiProperty({
    enum: InvitationStatusEnum,
    example: InvitationStatusEnum.ACCEPTED,
    description: 'New status of the invitation',
  })
  @IsEnum(InvitationStatusEnum)
  status: InvitationStatusEnum;
}

//
// Organization Member DTO
//
export class CreateOrganizationMemberDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  organization_id: string;

  @ApiPropertyOptional({
    description: 'Position of the member in the organization',
    example: 'Software Engineer',
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional({ description: 'Membership status', example: 'active' })
  @IsString()
  @IsOptional()
  status?: string;
}

export class OrgIdDto {
  @ApiProperty({ example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab' })
  @IsUUID()
  org_id: string;
}

export class UserIdDto {
  @ApiProperty({ example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab' })
  @IsUUID()
  user_id: string;
}

export class InvitationIdDto {
  @ApiProperty({ example: 'a7b5c92e-9a44-4b6c-8f83-1234567890ab' })
  @IsUUID()
  invitation_id: string;
}
