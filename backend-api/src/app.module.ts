import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/UserController';
import { PostController } from './controllers/PostController';

@Module({
  imports: [],
  controllers: [AppController, UserController, PostController],
  providers: [AppService],
})
export class AppModule {}
