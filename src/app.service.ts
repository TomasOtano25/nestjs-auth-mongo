import { Injectable, Inject } from '@nestjs/common';

import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}

  getHello(): string {
    // console.log(this.configService.apiKey);
    // console.log(this.configService.database.name);
    return 'Hello World!';
  }

  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
