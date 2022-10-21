import { User } from './user.entity';
import { Product } from '../../products/schemas/product.schema';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
