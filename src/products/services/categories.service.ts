import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategorysDto } from '../dtos/categories.dto';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    console.log(category);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  async update(id: string, changes: UpdateCategorysDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return category;
  }

  delete(id: string) {
    const deletedCategory = this.categoryModel.findByIdAndDelete(id).exec();

    if (!deletedCategory) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return deletedCategory;
  }
}
