import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

/**
 * Category Model
 */
export class CategoryModel extends Model<
  InferAttributes<CategoryModel>,
  InferCreationAttributes<CategoryModel>
> {
  declare id: CreationOptional<string>;
  declare name?: string;
  declare description?: string;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    CategoryModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'categories',
        modelName: 'CategoryModel',
        timestamps: true,
      },
    );

    return CategoryModel;
  }

  static associate(models: any) {
    CategoryModel.hasMany(models.ProductModel, {
      foreignKey: 'category_id',
      as: 'products',
    });
  }
}

/**
 * Product Model
 */
export class ProductModel extends Model<
  InferAttributes<ProductModel>,
  InferCreationAttributes<ProductModel>
> {
  declare id: CreationOptional<string>;
  declare name?: string;
  declare price?: number;
  declare originalPrice?: number;
  declare images?: string[];
  declare rating?: number;
  declare reviews?: number;
  declare description?: string;
  declare features?: string[];
  declare inStock?: boolean;
  declare brand?: string;

  declare category_id?: string; // foreign key
  declare user_id?: string; // vendor reference

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    ProductModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        originalPrice: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        images: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: [],
        },
        features: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: [],
        },
        rating: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        reviews: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        inStock: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        // user_id: {
        //   type: DataTypes.UUID,
        //   allowNull: true,
        // },
      },
      {
        sequelize,
        tableName: 'products',
        modelName: 'ProductModel',
        timestamps: true,
      },
    );

    return ProductModel;
  }

  static associate(models: any) {
    ProductModel.belongsTo(models.CategoryModel, {
      foreignKey: 'category_id',
      as: 'category',
    });
    // ProductModel.belongsTo(models.UserModel, {
    //   foreignKey: 'user_id',
    //   as: 'vendor',
    // });
  }
}
