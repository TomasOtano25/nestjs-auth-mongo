import { FilterQuery, HydratedDocument, Model } from 'mongoose';
import { FiltePaginationDto } from './dtos/FilterPagination.dto';

type GenericReturn = {
  total: number;
  products: HydratedDocument<any, any, any>[];
};

//function<Product, FilterProductsDto>()
export async function genericFindAll<
  GenericType,
  GenericParams extends FiltePaginationDto,
>(model: Model<GenericType>, params?: GenericParams): Promise<GenericReturn> {
  const filters: FilterQuery<GenericType> = {};

  const { limit, offset } = params;

  const [total, products] = await Promise.all([
    model.countDocuments(),
    model.find(filters).skip(offset).limit(limit).exec(),
  ]);

  return { total, products };
}

// async findAll(params?: FilterProductsDto) {
//   const products = await genericFindAll<Product, FilterProductsDto>(
//     this.productModel,
//     params,
//   );

//   console.log(products);
//   return;
// }
