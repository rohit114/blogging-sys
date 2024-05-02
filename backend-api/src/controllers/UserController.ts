import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserBlockDto, UserDto, UserLogInDto } from '../dto/requests/UserDto';
import { UserService } from '../services/user.service';
import { BaseController } from './BaseController';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/services/AuthGuard';
import { AdminGuard } from 'src/services/AdminGuard';
import { ValidationError, validateOrReject } from 'class-validator';

@Controller('/v1/user')
export class UserController extends BaseController {
  //create a new user
  @Post('create')
  async create(
    @Req() req: Request,
    @Body() payload: Object,
    @Res() res: Response,
  ) {

    try {
      const dto = plainToInstance(UserDto, payload, {
        enableImplicitConversion: true,
      });
      await validateOrReject(dto);
      let response = await UserService.createUser(dto);

      return res
        .status(HttpStatus.CREATED)
        .json(
          this.buildSuccessResponse(response),
        );

    } catch (errors) {

      if (errors instanceof Array && errors.every(err => err instanceof ValidationError)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: 'Validation failed',
          errors: errors.map(err => err.constraints),
          data: null,
        });
      } else {
        throw new Error(errors?.message);
      }
    }
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
