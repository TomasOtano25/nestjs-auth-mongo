import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('filter')
  getFilter() {
    return 'yo soy un filtro';
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return { message: `product ${productId}` };
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
