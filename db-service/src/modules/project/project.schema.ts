import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { UserModel } from '../users/users.schema';
import { OrganizationModel } from '../organization/organization.schema';
import { TASK_STATUS } from './project.types';
import { SqlModelsType } from 'src/core/services/db-service/db.types';

export class ProjectModel extends Model<
  InferAttributes<ProjectModel>,
  InferCreationAttributes<ProjectModel>
> {
  declare id: CreationOptional<string>;
  declare organization_id: string;
  declare name: string;
  declare description: string;
  declare specsheet: string;
  declare progress: number;
  declare created_by: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    ProjectModel.init(
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        specsheet: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        progress: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            min: 0,
            max: 100,
          },
        },
        created_by: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'projects',
        modelName: 'ProjectModel',
        timestamps: true,
      },
    );

    return ProjectModel;
  }

  static associate(models: SqlModelsType) {
    ProjectModel.belongsTo(models.OrganizationModel, {
      foreignKey: 'organization_id',
      as: 'organization',
    });

    ProjectModel.belongsTo(models.UserModel, {
      foreignKey: 'created_by',
      as: 'projectManager',
    });
  }
}

export class ProjectMemberModel extends Model<
  InferAttributes<ProjectMemberModel>,
  InferCreationAttributes<ProjectMemberModel>
> {
  declare id: CreationOptional<string>;
  declare project_id: string;
  declare user_id: string;
  declare assigned_at: CreationOptional<Date>;
  declare position: string;
  declare rating: number;
  declare feedback: string;

  static setup(sequelize: Sequelize) {
    ProjectMemberModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        assigned_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        position: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: true,
          validate: {
            min: 0,
            max: 10,
          },
        },
        feedback: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'project_members',
        modelName: 'ProjectMemberModel',
        timestamps: false,
      },
    );
    return ProjectMemberModel;
  }

  static associate(models: SqlModelsType) {
    ProjectMemberModel.belongsTo(models.ProjectModel, {
      foreignKey: 'project_id',
      as: 'project',
    });

    ProjectMemberModel.belongsTo(models.UserModel, {
      foreignKey: 'user_id',
      as: 'member',
    });
  }
}

export class TaskModel extends Model<
  InferAttributes<TaskModel>,
  InferCreationAttributes<TaskModel>
> {
  declare id: CreationOptional<string>;
  declare project_id: string;
  declare assigned_to: string;
  declare title: string;
  declare description: string;
  declare status: string;
  declare percent_complete: number;
  declare created_by: string;
  declare readonly createdAt?: Date;
  declare due_date: Date;
  declare completed_at: Date | null;
  declare response: string;

  static setup(sequelize: Sequelize) {
    TaskModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        assigned_to: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: TASK_STATUS.PENDING,
          validate: {
            isIn: [Object.values(TASK_STATUS)],
          },
        },
        percent_complete: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            min: 0,
            max: 100,
          },
        },
        created_by: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        due_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        completed_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        response: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'tasks',
        modelName: 'TaskModel',
        timestamps: true,
      },
    );
    return TaskModel;
  }

  static associate(models: SqlModelsType) {
    TaskModel.belongsTo(models.ProjectModel, {
      foreignKey: 'project_id',
      as: 'project',
    });

    TaskModel.belongsTo(models.UserModel, {
      foreignKey: 'assigned_to',
      as: 'developer',
    });

    TaskModel.belongsTo(models.UserModel, {
      foreignKey: 'created_by',
      as: 'creator',
    });
  }
}
