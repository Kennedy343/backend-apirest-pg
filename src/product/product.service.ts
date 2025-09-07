import { Injectable, ConflictException } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear producto
  async create(createProductDto: CreateProductDto) {
  try {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('sku')) {
      throw new ConflictException(`El SKU "${createProductDto.sku}" ya existe`);
    }
    throw error; // otros errores
  }
}

async createMany(products: CreateProductDto[]) {
  const result = await this.prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  return {
    message: `Se insertaron ${result.count} productos correctamente`,
    insertedCount: result.count,
  };
}


  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  //busqueda avanzada
  async search(searchDto: SearchProductsDto) {
  const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', filters = {} } = searchDto;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (filters.id) where.id = filters.id;
  if (filters.sku) where.sku = filters.sku;
  if (filters.nombre) where.nombre = { contains: filters.nombre, mode: 'insensitive' };
  if (filters.descripcion) where.descripcion = { contains: filters.descripcion, mode: 'insensitive' };

  return this.prisma.product.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: order.toLowerCase(),
    },
  });
}



  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    if (product.stock > 0) {
      throw new BadRequestException('No se puede eliminar un producto con stock mayor a cero');
    }

    return this.prisma.product.delete({ where: { id } });
}

}

