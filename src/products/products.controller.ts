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

@Controller('products')
export class ProductsController {
  @Get('filter')
  getFilter() {
    return 'yo soy un filtro';
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Res() response: Response, @Param('productId') productId: string) {
    // return { message: `product ${productId}` };
    response.status(200).json({ message: `product ${productId}` });
  }

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products limit=>${limit} offset=>${offset} brand=>${brand}`,
    };
  }

  // @Post()
  // create(@Body() payload: any) {
  //   return {
  //     message: 'Action create',
  //     payload,
  //   };
  // }

  @Post()
  create(@Body() payload: any) {
    const { name, price } = payload;
    return {
      message: 'Action create',
      payload,
      name,
      price,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
