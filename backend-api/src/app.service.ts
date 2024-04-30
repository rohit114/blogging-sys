import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  checkHealth(): string {
    return 'I am alive!';
  }
}
