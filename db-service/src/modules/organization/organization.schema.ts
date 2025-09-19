import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { UserModel } from '../users/users.schema';
import { InvitationStatusEnum } from './organization.types';
import { SqlModelsType } from 'src/core/services/db-service/db.types';

export class OrganizationModel extends Model<
  InferAttributes<OrganizationModel>,
  InferCreationAttributes<OrganizationModel>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare phone_number: string;
  declare industry_type?: string;
  declare created_by: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    OrganizationModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        industry_type: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        created_by: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },

      {
        sequelize,
        tableName: 'organizations',
        modelName: 'OrganizationModel',
        timestamps: true,
      },
    );

    return OrganizationModel;
  }

  static associate(models: SqlModelsType) {
    OrganizationModel.belongsTo(models.UserModel, {
      foreignKey: 'created_by',
      as: 'manager',
    });
  }
}

export class OrganizationInvitationModel extends Model<
  InferAttributes<OrganizationInvitationModel>,
  InferCreationAttributes<OrganizationInvitationModel>
> {
  declare id: CreationOptional<string>;
  declare organization_id: string;
  declare user_id: string;
  declare status: string;
  declare invitation_token?: string;
  declare responded_at?: Date;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    OrganizationInvitationModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        organization_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: InvitationStatusEnum.PENDING,
          validate: {
            isIn: [Object.values(InvitationStatusEnum)],
          },
        },
        responded_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },

        invitation_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },

      {
        sequelize,
        tableName: 'organizations_members',
        modelName: 'OrganizationMembersModel',
        timestamps: true,
      },
    );

    return OrganizationInvitationModel;
  }

  static associate(models: SqlModelsType) {
    OrganizationInvitationModel.belongsTo(models.UserModel, {
      foreignKey: 'user_id',
      as: 'user',
    });
    OrganizationInvitationModel.belongsTo(models.OrganizationModel, {
      foreignKey: 'organization_id',
      as: 'organization',
    });
  }
}
export class OrganizationMembersModel extends Model<
  InferAttributes<OrganizationMembersModel>,
  InferCreationAttributes<OrganizationMembersModel>
> {
  declare id: CreationOptional<string>;
  declare organization_id: string;
  declare user_id: string;
  declare position?: string;
  declare status?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    OrganizationMembersModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        organization_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },

        position: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },

      {
        sequelize,
        tableName: 'organizations_members',
        modelName: 'OrganizationMembersModel',
        timestamps: true,
      },
    );

    return OrganizationMembersModel;
  }

  static associate(models: SqlModelsType) {
    OrganizationMembersModel.belongsTo(models.UserModel, {
      foreignKey: 'user_id',
      as: 'user',
    });
    OrganizationMembersModel.belongsTo(models.OrganizationModel, {
      foreignKey: 'organization_id',
      as: 'organization',
    });
  }
}
