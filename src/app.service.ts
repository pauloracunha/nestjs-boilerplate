import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { app_name: `${process.env.APP_NAME}` };
  }
}
