import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  checkHealth(
  ): any {
    const data:string = this.appService.checkHealth();
    return  { status: true, message: `success`, data: {message: data} };
  }

  @Get('user')
  getUserTest(
  ): any {
    return  { status: true, message: `success`, data:{name:"xxxx", mobile: "xxxxxx", email: "xxxxx"} };
  }
}
