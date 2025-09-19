import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
} from 'class-validator';

/** -------------------- CATEGORY DTOs -------------------- **/

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  @IsString()
  name!: string;

  @ApiProperty({
    example:
      'Devices and gadgets including smartphones, laptops, and accessories.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Home Appliances', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Appliances to make your home comfortable and efficient.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class IdDto {
  @ApiProperty({ example: 'c0a80123-4567-89ab-cdef-0123456789ab' })
  @IsUUID()
  id!: string;
}

export class CategoryIdDto {
  @ApiProperty({ example: 'c0a80123-4567-89ab-cdef-0123456789ab' })
  @IsUUID()
  category_id!: string;
}

export class ProductIdDto {
  @ApiProperty({ example: 'd0b80123-4567-89ab-cdef-0123456789ab' })
  @IsUUID()
  product_id!: string;
}

/** -------------------- PRODUCT DTOs -------------------- **/

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  price!: number;

  @ApiProperty({ example: 1099.99, required: false })
  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @ApiProperty({
    example: [
      'https://example.com/images/iphone15-front.jpg',
      'https://example.com/images/iphone15-back.jpg',
    ],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: 4.8, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: 1200, required: false })
  @IsOptional()
  @IsNumber()
  reviews?: number;

  @ApiProperty({
    example: 'Latest Apple smartphone with advanced camera and performance.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: ['5G', 'OLED Display', 'Face ID', 'Dual Camera'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiProperty({ example: 'Apple', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'c0a80123-4567-89ab-cdef-0123456789ab' })
  @IsUUID()
  category_id!: string;

  @ApiProperty({ example: 'u0b80123-4567-89ab-cdef-0123456789ab' })
  @IsUUID()
  user_id!: string;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'Samsung 4K TV', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 699.99, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 799.99, required: false })
  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @ApiProperty({
    example: ['https://example.com/images/samsung-tv.jpg'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: 850, required: false })
  @IsOptional()
  @IsNumber()
  reviews?: number;

  @ApiProperty({
    example: 'Ultra HD Smart TV with vibrant colors and streaming apps.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: ['4K', 'Smart TV', 'HDR', 'Wi-Fi'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiProperty({ example: 'Samsung', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    example: 'c0a80123-4567-89ab-cdef-0123456789ab',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  category_id?: string;

  @ApiProperty({
    example: 'u1b80123-4567-89ab-cdef-0123456789ab',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  user_id?: string;
}
