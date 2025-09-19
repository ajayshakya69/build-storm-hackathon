import {
  OrganizationInvitationModel,
  OrganizationMembersModel,
  OrganizationModel,
} from 'src/modules/organization/organization.schema';
import {
  ProjectMemberModel,
  ProjectModel,
  TaskModel,
} from 'src/modules/project/project.schema';
import { TodoModel } from 'src/modules/todo/todo.schema';
import { DevProfileModel, UserModel } from 'src/modules/users/users.schema';

export const MONGOOSE_MODELS = {};

export const SQL_MODELS = {
  UserModel: UserModel.setup,
  DevProfileModel: DevProfileModel.setup,
  TodoModel: TodoModel.setup,
  ProjectModel: ProjectModel.setup,
  ProjectMemberModel: ProjectMemberModel.setup,
  TaskModel: TaskModel.setup,
  OrganizationModel: OrganizationModel.setup,
  OrganizationInvitationModel: OrganizationInvitationModel.setup,
  OrganizationMembersModel: OrganizationMembersModel.setup,
};
