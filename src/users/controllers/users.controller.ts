import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
