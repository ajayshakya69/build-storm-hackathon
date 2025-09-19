import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { UserModel } from '../users/users.schema';
import { TODO_STATUS } from './todo.types';
import { SqlModelsType } from 'src/core/services/db-service/db.types';

export class TodoModel extends Model<
  InferAttributes<TodoModel>,
  InferCreationAttributes<TodoModel>
> {
  declare id: CreationOptional<string>;
  declare user_id: string;
  declare title: string;
  declare description: string;
  declare status: string;
  declare percent_complete: CreationOptional<number>;
  declare due_date: Date | null;
  declare completed_at: Date | null;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    TodoModel.init(
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
          defaultValue: TODO_STATUS.PENDING,
          validate: {
            isIn: [Object.values(TODO_STATUS)],
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
        due_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        completed_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'todos',
        modelName: 'TodoModel',
      },
    );
    return TodoModel;
  }
  static associate(models: SqlModelsType) {
    TodoModel.belongsTo(models.UserModel, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}
