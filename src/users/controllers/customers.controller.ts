import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Post()
  create(@Body() payload: any) {
    return {
      messaga: 'Action crete',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
