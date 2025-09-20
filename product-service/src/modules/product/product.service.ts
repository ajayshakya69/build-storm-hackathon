import { Injectable } from '@nestjs/common';
import { InternalCallService } from 'src/services/internal-call/internal-call.service';
import {
  CreateCategoryDto,
  CreateProductDto,
  ProductFilterQueryDto,
} from './product.dto';
import { HandleAxiosMetaError } from 'src/services/internal-call/internal-call.utils';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly internalCallService: InternalCallService) {}

  async createCategory(data: CreateCategoryDto) {
    const res = await this.internalCallService.dbInstance.createCategory(data);
    HandleAxiosMetaError(res);
    return 'Category created successfully';
  }

  async createProduct(data: CreateProductDto) {
    const res = await this.internalCallService.dbInstance.createProduct(data);
    HandleAxiosMetaError(res);
    return 'Product created successfully';
  }

  async getCategories() {
    const res = await this.internalCallService.dbInstance.getAllCategory();
    return HandleAxiosMetaError(res);
  }

  async getAllProject() {
    const res = await this.internalCallService.dbInstance.getAllProducts();
    return HandleAxiosMetaError(res);
  }

  async filterProducts(query: ProductFilterQueryDto) {
    const res = await this.internalCallService.dbInstance.filterProducts(query);
    return HandleAxiosMetaError(res);
  }
}
