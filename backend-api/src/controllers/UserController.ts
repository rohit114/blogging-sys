import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserBlockDto, UserDto, UserLogInDto } from '../dto/requests/UserDto';
import { UserService } from '../services/user.service';
import { BaseController } from './BaseController';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/services/AuthGuard';
import { AdminGuard } from 'src/services/AdminGuard';

@Controller('/v1/user')
export class UserController extends BaseController {
  //create a new user
  @Post('create')
  async create(
    @Req() req: Request,
    @Body() payload: Object,
    @Res() res: Response,
  ) {
    const dto = plainToInstance(UserDto, payload, {
      enableImplicitConversion: true,
    });

    let response = await UserService.createUser(dto);

    return res
      .status(HttpStatus.CREATED)
      .json(
        this.buildSuccessResponse(response),
      );
  }

  //get post details by userId
  @UseGuards(AuthGuard)
  @Get('details/:userId')
  async getUser(
    @Param('userId') userId: string,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      let response = await UserService.getByUserId(userId);

      return res
        .status(HttpStatus.OK)
        .json(
          this.buildSuccessResponse(response),
        );

    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: error.message,
          data: null,
        });
      } else {
        throw error; // Rethrow the error if it's not a NotFoundException
      }
    }
  };

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Post('block')
  async BlockUnblockUser(
    @Req() req: Request,
    @Body() payload: Object,
    @Res() res: Response,
  ) {
    const dto = plainToInstance(UserBlockDto, payload, {
      enableImplicitConversion: true,
    });
    let response = await UserService.blockUnblockUser(dto);
    return res
      .status(HttpStatus.OK)
      .json(
        this.buildSuccessResponse(response),
      );
  }
}
