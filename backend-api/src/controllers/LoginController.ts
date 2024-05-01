import { BadRequestException, Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserLogInDto } from "src/dto/requests/UserDto";
import { UserService } from "src/services/user.service";
import { BaseController } from "./BaseController";
import { Request, Response } from 'express';
import { AuthService } from "src/services/AuthService";

@Controller('/v1/user/auth')
export class LogInController extends BaseController {
    constructor(private readonly authService:AuthService){
        super();
    }
    @Post('login')
    async login(
        @Req() req: Request,
        @Body() payload: Object,
        @Res() res: Response,
    ) {
        try {
            const dto = plainToInstance(UserLogInDto, payload, {
                enableImplicitConversion: true,
            });
            let response = await this.authService.login(dto);
            
            return res
                .status(HttpStatus.OK)
                .json(
                    this.buildSuccessResponse(response),
                );
        } catch (error) {
            throw new BadRequestException('Something went wrong');
        }

    }
}