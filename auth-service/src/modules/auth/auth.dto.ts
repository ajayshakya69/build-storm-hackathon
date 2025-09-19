import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { USER_ROLE } from 'src/core/constants/user.constants';
import { SignInWithPasswordDto } from 'src/services/supabase/subabase.dto';

export class ChangeRoleDto {
  @ApiProperty({ example: USER_ROLE.DEVELOPER, enum: USER_ROLE })
  @IsEnum(USER_ROLE)
  role: USER_ROLE;
}

export class SignUpWithPasswordDto extends SignInWithPasswordDto {
  @ApiProperty({
    description: 'name',
    example: 'john',
  })
  @IsString()
  name?: string;
}

export class GetSessionFromTokenDto {
  @ApiProperty({
    description: 'Session token to retrieve session details',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
