import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

import { Order } from '../schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  delete(id: string) {
    const deletedOrder = this.orderModel.findByIdAndDelete(id).exec();

    if (!deletedOrder) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return deletedOrder;
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);

    order.products.pull(productId);

    return order.save();
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);

    if (order) {
      productsIds.forEach((pId) => {
        // order.products.push(pId);
        order.products.addToSet(pId);
      });
    }

    return order.save();
  }
}
