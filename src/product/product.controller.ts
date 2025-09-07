import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-product.dto';
import { CreateProductsBulkDto } from './dto/crate-product-bulk.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Get()
  findAll() {
    return this.productService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  //busqueda avanzada
  @Post('search')
  search(@Body() searchDto: SearchProductsDto) {
    return this.productService.search(searchDto);
  }


  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('inserts')
  async createBulk(@Body() bulkDto: CreateProductsBulkDto){
    return this.productService.createMany(bulkDto.products)
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
