import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { Product } from '../schemas/product.schema';

import { genericFindAll } from '../../common/generic-functions';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // findAll(params?: FilterProductsDto) {
  //   if (params) {
  //     const { limit, offset } = params;
  //     const products = this.productModel
  //       .find()
  //       .skip(offset)
  //       .limit(limit)
  //       .exec();
  //     return products;
  //   }

  //   return this.productModel.find().exec();
  // }

  // async findAll(params?: FilterProductsDto) {
  //   if (params) {
  //     const { limit, offset } = params;
  //     const [total, products] = await Promise.all([
  //       this.productModel.countDocuments(),
  //       this.productModel.find().skip(offset).limit(limit).exec(),
  //     ]);

  //     return { total, products };
  //   }
  //   return this.productModel.find().exec();
  // }

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};

      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }

      const [total, products] = await Promise.all([
        this.productModel.countDocuments(),
        this.productModel
          .find(filters)
          .populate('brand')
          .skip(offset)
          .limit(limit)
          .exec(),
      ]);

      return { total, products };
    }
    return this.productModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    console.log(product);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, changes: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  delete(id: string) {
    const deletedProduct = this.productModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return deletedProduct;
  }
}
