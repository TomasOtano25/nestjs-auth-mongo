import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { ProductsService } from '../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);

    const hashPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = hashPassword;

    const model = await newUser.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  update(id: string, changes: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
