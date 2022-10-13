import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}
  private users = [
    {
      id: 1,
      name: 'Tomas Garcia',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  getOrdersByUser(id: number): Order[] {
    const user = this.findOne(id);
    return [
      {
        date: new Date(),
        user,
        products: this.productsService.findAll(),
      },
    ];
  }
}
