import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    precio: number;

    @IsInt()
    @Min(0)
    stock: number;

    @IsString()
    @IsNotEmpty()
    sku: string;
}
