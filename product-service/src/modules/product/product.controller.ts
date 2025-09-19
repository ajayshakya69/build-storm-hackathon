import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductCategoryService } from './product.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateProductDto,
  UpdateProductDto,
  IdDto,
  CategoryIdDto,
  ProductIdDto,
  ProductFilterQueryDto,
} from './product.dto';

@ApiTags('Product & Category')
@Controller('shop')
export class ProductCategoryController {
  constructor(private readonly service: ProductCategoryService) {}

  // ========== CATEGORY ==========
  @Post('categories')
  @ApiOperation({ summary: 'Create a new category' })
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.service.createCategory(body);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  async getCategories() {
    return this.service.getCategories();
  }

  // @Get('categories/id')
  // @ApiOperation({ summary: 'Get category by ID' })
  // async getCategoryById(@Query() query: IdDto) {
  //   return this.service.getCategoryById(query.id);
  // }

  // @Put('categories')
  // @ApiOperation({ summary: 'Update category by ID' })
  // async updateCategory(@Query() query: IdDto, @Body() body: UpdateCategoryDto) {
  //   return this.service.updateCategory(query.id, body);
  // }

  // @Delete('categories')
  // @ApiOperation({ summary: 'Delete category by ID' })
  // async deleteCategory(@Query() query: IdDto) {
  //   return this.service.deleteCategory(query.id);
  // }

  // ========== PRODUCT ==========
  @Post('products')
  @ApiOperation({ summary: 'Create a new product' })
  async createProduct(@Body() body: CreateProductDto) {
    return this.service.createProduct(body);
  }

  @Get('products')
  @ApiOperation({ summary: 'Get all products with categories' })
  async getProducts() {
    return this.service.getAllProject();
  }

  // @Get('products/id')
  // @ApiOperation({ summary: 'Get product by ID' })
  // async getProductById(@Query() query: IdDto) {
  //   return this.service.getProductById(query.id);
  // }

  @Get('filter')
  async filterProducts(@Query() query: ProductFilterQueryDto) {
    return this.service.filterProducts(query);
  }

  // @Put('products')
  // @ApiOperation({ summary: 'Update product by ID' })
  // async updateProduct(@Query() query: IdDto, @Body() body: UpdateProductDto) {
  //   return this.service.updateProduct(query.id, body);
  // }
}
