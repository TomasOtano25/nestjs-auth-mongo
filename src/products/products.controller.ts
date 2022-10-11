import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('filter')
  getFilter() {
    return 'yo soy un filtro';
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(
    /*@Res() response: Response,*/ @Param('productId') productId: string,
  ) {
    return this.productsService.findOne(+productId);
    // return this.productsService.findOne(parseInt(productId));
    // return { message: `product ${productId}` };
    // response.status(200).json({ message: `product ${productId}` });
  }

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
