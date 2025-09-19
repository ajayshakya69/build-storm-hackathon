import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { USER_ROLE } from 'src/core/constants/user.constants';
import { SqlModelsType } from 'src/core/services/db-service/db.types';

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare name?: string;
  declare profile_picture?: string;
  declare role: CreationOptional<USER_ROLE>;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    UserModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
        },

        profile_picture: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
        },

        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: USER_ROLE.AUTHENTICATED,
          validate: {
            isIn: [Object.values(USER_ROLE)],
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
        modelName: 'UserModel',
        timestamps: true,
      },
    );

    return UserModel;
  }
}

export class DevProfileModel extends Model<
  InferAttributes<DevProfileModel>,
  InferCreationAttributes<DevProfileModel>
> {
  declare id: CreationOptional<string>;
  declare user_id: string;
  declare bio?: string;
  declare skills?: string;
  declare rating: CreationOptional<number>;
  declare total_ratings: CreationOptional<number>;
  declare current_organization_id?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    DevProfileModel.init(
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
        bio: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        skills: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        rating: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        total_ratings: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        current_organization_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'developer_profiles',
        modelName: 'DevProfile',
        timestamps: true,
      },
    );

    return DevProfileModel;
  }

  static associate(models: SqlModelsType) {
    DevProfileModel.belongsTo(models.UserModel, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}
