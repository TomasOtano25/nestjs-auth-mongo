import { User } from './user.schema';
import { Product } from '../../products/schemas/product.schema';
import { Schema } from '@nestjs/mongoose';

@Schema()
export class Order {
  date: Date;
  user: User;
  products: Product[];
}
