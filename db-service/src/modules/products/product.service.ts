import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/core/services/db-service/db.service';
import { CategoryModel, ProductModel } from './product.schema';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateProductDto,
  UpdateProductDto,
} from './product.dto';

@Injectable()
export class ProductCategoryService {
  private readonly CategoryModel: typeof CategoryModel;
  private readonly ProductModel: typeof ProductModel;

  constructor(private readonly dbService: DbService) {
    this.CategoryModel = this.dbService.sqlService.CategoryModel;
    this.ProductModel = this.dbService.sqlService.ProductModel;
  }

  // ================= CATEGORY =================
  async createCategory(dto: CreateCategoryDto) {
    return await this.CategoryModel.create(dto);
  }

  async getCategories() {
    return await this.CategoryModel.findAll();
  }

  async getCategoryById(id: string) {
    const category = await this.CategoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    const category = await this.CategoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');
    return category.update(dto);
  }

  async deleteCategory(id: string) {
    const category = await this.CategoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');
    await category.destroy();
    return { message: 'Category deleted successfully' };
  }

  // ================= PRODUCT =================
  async createProduct(dto: CreateProductDto) {
    try {
      const res = await this.ProductModel.create(dto);
      return res;
    } catch (err: any) {
      console.log(err);
    }
  }

  async getProducts() {
    return await this.ProductModel.findAll({
      include: [{ model: this.CategoryModel, as: 'category' }],
    });
  }

  async getProductById(id: string) {
    const product = await this.ProductModel.findByPk(id, {
      include: [{ model: this.CategoryModel, as: 'category' }],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const product = await this.ProductModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    return product.update(dto);
  }

  async deleteProduct(id: string) {
    const product = await this.ProductModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    await product.destroy();
    return { message: 'Product deleted successfully' };
  }
}
