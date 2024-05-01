import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/UserController';
import { PostController } from './controllers/PostController';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/AuthService';
import { LogInController } from './controllers/LoginController';
import { AuthGuard } from './services/AuthGuard';
@Module({
  imports: [
    JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [AppController, UserController, PostController, LogInController],
  providers: [AppService, AuthService, AuthGuard],
})
export class AppModule { }
