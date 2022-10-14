import { Injectable, Inject } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    console.log(this.configService.get('API_KEY'));
    console.log(this.configService.get('DATABASE_NAME'));
    return 'Hello World!';
  }

  getTasks() {
    return this.tasks;
  }
}
