import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  OrganizationInvitationModel,
  OrganizationModel,
} from './organization.schema';
import { DbService } from 'src/core/services/db-service/db.service';
import {
  CreateOrganizationDto,
  CreateOrganizationInvitationDto,
  UpdateOrganizationDto,
} from './organization.dto';
import { UserModel } from '../users/users.schema';
import { ORG_ERROR_MESSAGE } from './organization.constant';
import { InvitationStatusEnum } from './organization.types';

@Injectable()
export class OrganizationService {
  private readonly OrganizationModel: typeof OrganizationModel;
  private readonly UserModel: typeof UserModel;
  private readonly OrganizationInvitationModel: typeof OrganizationInvitationModel;
  constructor(private readonly dbService: DbService) {
    this.OrganizationModel = this.dbService.sqlService.OrganizationModel;
    this.UserModel = this.dbService.sqlService.UserModel;
    this.OrganizationInvitationModel =
      this.dbService.sqlService.OrganizationInvitationModel;
  }

  async getOrganization(user_id: string) {
    const orgRes = await this.fetchOrganization(user_id);
    if (!orgRes)
      throw new NotFoundException(ORG_ERROR_MESSAGE.ORGANIZATION_NOT_EXISTS);
    return orgRes;
  }

  async createOrganization(data: CreateOrganizationDto) {
    const checkOrg = await this.fetchOrganization(data.created_by);
    if (checkOrg)
      throw new BadRequestException(
        ORG_ERROR_MESSAGE.ORGANIZATION_ALREADY_EXISTS,
      );
    return await this.OrganizationModel.create({ ...data });
  }

  async updateOrganization(data: UpdateOrganizationDto, org_id: string) {
    const orgRes = await this.fetchOrganization(data.created_by);
    if (!orgRes)
      throw new NotFoundException(ORG_ERROR_MESSAGE.ORGANIZATION_NOT_EXISTS);

    return await this.OrganizationModel.update(data, {
      where: { id: org_id },
    });
  }

  async fetchOrganization(user_id: string) {
    return await this.OrganizationModel.findOne({
      where: { created_by: user_id },
      include: [
        {
          model: this.UserModel,
          as: 'manager',
        },
      ],
    });
  }

  async createInvitation(dto: CreateOrganizationInvitationDto) {
    const user = await this.UserModel.findByPk(dto.user_id);
    if (!user) throw new NotFoundException('User not found');

    const org = await this.OrganizationModel.findByPk(dto.organization_id);
    if (!org) throw new NotFoundException('Organization not found');

    const existing = await this.OrganizationInvitationModel.findOne({
      where: { user_id: dto.user_id, organization_id: dto.organization_id },
      order: [['createdAt', 'DESC']], // get the latest one if multiple exist
    });

    if (existing) {
      if (existing.status === InvitationStatusEnum.PENDING) {
        throw new BadRequestException('Invitation already sent and pending');
      }
      if (existing.status === InvitationStatusEnum.ACCEPTED) {
        throw new BadRequestException(
          'User is already a member of the organization',
        );
      }
    }

    return await this.OrganizationInvitationModel.create({
      ...dto,
      status: dto.status ?? InvitationStatusEnum.PENDING,
    });
  }

  async respondInvitation(invitationId: string, status: InvitationStatusEnum) {
    const invitation =
      await this.OrganizationInvitationModel.findByPk(invitationId);
    if (!invitation) throw new NotFoundException('Invitation not found');

    return await this.OrganizationInvitationModel.update(
      { status: status },
      { where: { id: invitation.id } },
    );
  }

  async getOrgInvitations(orgId: string) {
    return this.OrganizationInvitationModel.findAll({
      where: { organization_id: orgId },
      include: [{ model: this.UserModel, as: 'user' }],
    });
  }

  async getUserInvitations(userId: string) {
    return this.OrganizationInvitationModel.findAll({
      where: { user_id: userId },
      include: [{ model: this.OrganizationModel, as: 'organization' }],
    });
  }

  async getInvitationById(orgId: string) {
    return await this.OrganizationInvitationModel.findByPk(orgId, {
      include: [
        {
          model: this.OrganizationModel,
          as: 'organization',
          include: [
            {
              model: this.UserModel,
              as: 'manager',
            },
          ],
        },
        {
          model: this.UserModel,
          as: 'user',
        },
      ],
    });
  }
}
