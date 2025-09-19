import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { OrganizationModel } from '../organization/organization.schema';
import { UserModel } from '../users/users.schema';
import { MEETING_STATUS } from './meet.types';

export class MeetingModel extends Model<
  InferAttributes<MeetingModel>,
  InferCreationAttributes<MeetingModel>
> {
  declare id: CreationOptional<string>;
  declare organization_id: string;
  declare created_by: string;
  declare title: string;
  declare agenda: string;
  declare scheduled_time: Date;
  declare readonly createdAt?: Date;
  declare meeting_link: string;

  static setup(sequelize: Sequelize) {
    MeetingModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        organization_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        created_by: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        agenda: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        scheduled_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        meeting_link: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'meetings',
        modelName: 'MeetingModel',
        timestamps: true,
      },
    );
  }

  static associate() {
    MeetingModel.belongsTo(OrganizationModel, {
      foreignKey: 'organization_id',
      as: 'organization',
    });

    MeetingModel.belongsTo(UserModel, {
      foreignKey: 'created_by',
      as: 'creator',
    });
  }
}

export class MeetingGuestModel extends Model<
  InferAttributes<MeetingGuestModel>,
  InferCreationAttributes<MeetingGuestModel>
> {
  declare id: CreationOptional<string>;
  declare meeting_id: string;
  declare guest_email: string;
  declare invited_by: string;
  declare status: CreationOptional<MEETING_STATUS>;
  declare invited_at: CreationOptional<Date>;
  declare responded_at: Date | null;

  static setup(sequelize: Sequelize) {
    MeetingGuestModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        meeting_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        guest_email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        invited_by: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(MEETING_STATUS)),
          allowNull: false,
          defaultValue: 'invited',
        },
        invited_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        responded_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'meeting_guests',
        modelName: 'MeetingGuestModel',
        timestamps: false,
      },
    );
  }

  static associate() {
    MeetingGuestModel.belongsTo(MeetingModel, {
      foreignKey: 'meeting_id',
      as: 'meeting',
    });

    MeetingGuestModel.belongsTo(UserModel, {
      foreignKey: 'invited_by',
      as: 'inviter',
    });
  }
}
