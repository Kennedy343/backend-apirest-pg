import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class CreateProductsBulkDto{
    @ValidateNested({ each: true })
    @Type(()=> CreateProductDto)
    products: CreateProductDto[];
}