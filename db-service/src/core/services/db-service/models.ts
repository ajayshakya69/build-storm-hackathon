import {
  CategoryModel,
  ProductModel,
} from 'src/modules/products/product.schema';
import { DevProfileModel, UserModel } from 'src/modules/users/users.schema';

export const MONGOOSE_MODELS = {};

export const SQL_MODELS = {
  UserModel: UserModel.setup,
  DevProfileModel: DevProfileModel.setup,
  CategoryModel: CategoryModel.setup,
  ProductModel: ProductModel.setup,
};
