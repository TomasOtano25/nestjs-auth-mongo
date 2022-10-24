import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import {
  AddProducToOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/orders.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get(':id')
  getProduct(@Param('id', MongoIdPipe) productId: string) {
    return this.ordersService.findOne(productId);
  }

  @Get()
  @ApiOperation({ summary: 'List of orders' })
  getOrders() {
    return this.ordersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.delete(id);
  }

  @Delete(':id/product/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }

  @Put(':id/products')
  updateProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProducToOrderDto,
  ) {
    return this.ordersService.addProducts(id, payload.productsIds);
  }
}
