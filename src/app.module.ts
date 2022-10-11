import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products/products.controller';
import { CategoriesController } from './products/categories/categories.controller';
import { OrdersController } from './orders/orders.controller';
import { UsersController } from './users/users.controller';
import { CustomersController } from './customers/customers.controller';
import { BrandsController } from './products/brands/brands.controller';
import { ProductsService } from './products/products/products.service';
import { BrandsService } from './products/brands/brands.service';
import { CategoriesService } from './products/categories/categories.service';
import { UsersService } from './users/users.service';
import { OrdersService } from './orders/orders.service';
import { CustomersService } from './customers/customers.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [
    AppService,
    ProductsService,
    BrandsService,
    CategoriesService,
    UsersService,
    OrdersService,
    CustomersService,
  ],
})
export class AppModule {}
