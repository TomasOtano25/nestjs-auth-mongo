import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';

import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { User, UserSchema } from './schemas/user.schema';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
