import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

import { Brand } from '../schemas/brand.schema';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    console.log(brand);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    return brand;
  }

  delete(id: string) {
    const deletedBrand = this.brandModel.findByIdAndDelete(id).exec();

    if (!deletedBrand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    return deletedBrand;
  }
}
