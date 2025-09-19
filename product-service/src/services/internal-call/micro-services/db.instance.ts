import {
  CreateCategoryDto,
  CreateProductDto,
  ProductFilterQueryDto,
  UpdateCategoryDto,
  UpdateProductDto,
} from 'src/modules/product/product.dto';
import { AxiosInstanceProvider } from './axios-instance.provider';
import { HandleAxiosMetaError } from '../internal-call.utils';

export class DBAxiosInstance extends AxiosInstanceProvider {
  constructor() {
    super(process.env.DB_SERVICE_API!);
  }

  async createCategory(data: CreateCategoryDto) {
    const res = await this.axiosInstance.post('/db/shop/categories', data);
    return res.data;
  }

  async updateCategory(id: string, updatedData: UpdateCategoryDto) {
    const res = await this.axiosInstance.put(
      '/db/shop/categories?id=' + id,
      updatedData,
    );
    return res.data;
  }

  async createProduct(data: CreateProductDto) {
    const res = await this.axiosInstance.post('/db/shop/products', data);
    return res.data;
  }

  async updateProduct(id: string, updatedData: UpdateProductDto) {
    const res = await this.axiosInstance.put(
      '/db/shop/products?id=' + id,
      updatedData,
    );

    return res.data;
  }

  async getAllCategory() {
    const res = await this.axiosInstance.get('/db/shop/categories');
    return res.data;
  }

  async getAllProducts() {
    const res = await this.axiosInstance.get('/db/shop/products');
    return res.data;
  }

  async getProductByid(id: string) {
    const res = await this.axiosInstance.get('/db/shop/products/id?id=' + id);
    return res.data;
  }

  async filterProducts(queryData: ProductFilterQueryDto) {
    const res = await this.axiosInstance.get('/db/shop/filter', {
      params: queryData,
    });
    return res.data;
  }
}
