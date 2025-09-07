import { IsOptional, IsInt, Min, IsString, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductFilters {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    sku?: string;
}

export class SearchProductsDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    sortBy?: string = 'id';

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC' = 'ASC';

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductFilters)
    filters?: ProductFilters;
}
