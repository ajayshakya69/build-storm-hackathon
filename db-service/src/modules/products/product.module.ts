import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product.controller';
import { ProductCategoryService } from './product.service';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductModule {}
