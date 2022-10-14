import { Injectable, Inject } from '@nestjs/common';

import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    console.log(this.configService.apiKey);
    console.log(this.configService.database.name);
    return 'Hello World!';
  }

  getTasks() {
    return this.tasks;
  }
}
