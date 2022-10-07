import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CategoriesController } from './categories/categories.controller';
import { OrdersController } from './orders/orders.controller';
import { UsersController } from './users/users.controller';
import { CustomersController } from './customers/customers.controller';
import { BrandsController } from './brands/brands.controller';

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
  providers: [AppService],
})
export class AppModule {}
