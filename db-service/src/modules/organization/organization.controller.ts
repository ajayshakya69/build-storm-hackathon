import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  CreateOrganizationDto,
  CreateOrganizationInvitationDto,
  InvitationIdDto,
  InvitationResponseDto,
  OrgIdDto,
  UpdateOrganizationDto,
} from './organization.dto';
import { IdDto, UserIdDto } from '../users/users.dto';

@Controller('org')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  @ApiOperation({ summary: 'Get Organization by user id (UUID)' })
  async getOrganization(@Query() query: UserIdDto) {
    return await this.organizationService.fetchOrganization(query.user_id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Organization' })
  async createOrganization(@Body() body: CreateOrganizationDto) {
    return await this.organizationService.createOrganization(body);
  }

  @Put()
  @ApiOperation({ summary: 'Updating the Organization' })
  async updateOrganization(
    @Body() body: UpdateOrganizationDto,
    @Query() query: OrgIdDto,
  ) {
    return await this.organizationService.updateOrganization(
      body,
      query.org_id,
    );
  }

  @Get('invitation')
  @ApiOperation({ summary: 'Getting invitation by id' })
  async getInvitationById(@Query() query: IdDto) {
    return await this.organizationService.getInvitationById(query.id);
  }

  @Post('invitation')
  @ApiOperation({ summary: ' creating invitation' })
  async createInvitation(@Body() body: CreateOrganizationInvitationDto) {
    return await this.organizationService.createInvitation(body);
  }

  @Put('invitation')
  @ApiOperation({ summary: 'updating invitation' })
  async updateInvitation(
    @Body() body: InvitationResponseDto,
    @Query() query: InvitationIdDto,
  ) {
    return this.organizationService.respondInvitation(
      query.invitation_id,
      body.status,
    );
  }

  @Get('invitation/user')
  @ApiOperation({ summary: 'Get all invitation of user' })
  async getUserInvitations(@Query() query: UserIdDto) {
    return await this.organizationService.getUserInvitations(query.user_id);
  }

  @Get('invitation/org')
  @ApiOperation({ summary: 'Get all invitations of Organization' })
  async getOrgInvitations(@Query() query: OrgIdDto) {
    return await this.organizationService.getOrgInvitations(query.org_id);
  }
}
