import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Headers, Post, Query, Res, UseGuards, ForbiddenException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseController } from './BaseController';
import { Response } from 'express';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from 'src/dto/requests/PostDto';
import { BlogPostService } from 'src/services/post.service';
import { getLoggingUtil } from 'src/utils/logging.util';
import { AuthGuard } from 'src/services/AuthGuard';
import { JwtService } from '@nestjs/jwt';
const logger = getLoggingUtil('BlogPostService');

@Controller('/v1/post')
export class PostController extends BaseController {
    constructor(private readonly jwtService: JwtService) {
        super();
    }
    //create post
    @UseGuards(AuthGuard)
    @Post('create')
    async create(
        @Body() payload: Object,
        @Res() res: Response,
    ) {

        try {
            logger.info('CONTROLLER:CREATE::POST::INIT', {});
            const dto = plainToInstance(CreatePostDto, payload, {
                enableImplicitConversion: true,
            });

            let response = await BlogPostService.create(dto);
            logger.info('CONTROLLER:CREATE::POST::DONE', {});
            return res
                .status(HttpStatus.CREATED)
                .json(
                    this.buildSuccessResponse(response),
                );

        } catch (error) {
            if (error instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: false,
                    message: error.message,
                    data: null,
                });
            } else {
                throw error; //other errors
            }
        }
    }

    //update post by postId
    @UseGuards(AuthGuard)
    @Post('update')
    async update(
        @Body() payload: Object,
        @Res() res: Response,
    ) {
        logger.info('CONTROLLER:UPDATE::POST::INIT', payload);
        const dto = plainToInstance(UpdatePostDto, payload, {
            enableImplicitConversion: true,
        });

        let response = await BlogPostService.update(dto);
        logger.info('CONTROLLER:UPDATE::POST::DONE', payload);
        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );
    }

    //delete post by postId
    @UseGuards(AuthGuard)
    @Delete('delete/:postId')
    async delete(
        @Param('postId') postId: string,
        @Headers() headers: Record<string, string>,
        @Res() res: Response,
    ) {
        try {
            let verifiedUser = this.validateToken(headers.authorization);
            logger.info('CONTROLLER:DELETE::POST::INIT', postId);
            let response = await BlogPostService.deleteByPostId(postId, verifiedUser);
            logger.info('CONTROLLER:DELETE::POST::DONE', postId);
            return res
                .status(HttpStatus.OK)
                .json(
                    this.buildSuccessResponse(response),
                );

        } catch (error) {
            if (error instanceof ForbiddenException) {
                return res.status(HttpStatus.FORBIDDEN).json({
                    status: false,
                    message: error.message,
                    data: null,
                });
            } else {
                throw error; 
            }
        }
    }

    private validateToken(auth: string) {
        const token = auth.split(' ')[1];
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            throw new Error("Err validateToken");
        }
    }

    //get post by postId
    @UseGuards(AuthGuard)
    @Get('detail/:postId')
    async getPost(
        @Param('postId') postId: string,
        @Res() res: Response,
    ) {
        try {
            logger.info('CONTROLLER::POST::DETAIL::INIT', postId);
            let response = await BlogPostService.getByPostId(postId);

            if (!response) {
                throw new NotFoundException(`Post with postId: ${postId} not found`);
            }
            logger.info('CONTROLLER::POST::DETAIL::DONE', postId);
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
                throw error; //other errors
            }
        }
    };

    //getAllPosts with filter and paginanation
    @UseGuards(AuthGuard)
    @Get('all')
    async getAllPosts(
        @Query('author_id') author_id: string,
        @Query('creation_dt') creation_dt: Date,
        @Query('limit') limit: number,
        @Query('page') offset: number,
        @Res() res: Response,
    ) {
        const dto = new FilterPostDto();
        dto.authorId = author_id;
        dto.creation_dt = creation_dt;
        dto.limit = limit;
        dto.page = offset;
        logger.info('CONTROLLER::ALL::POSTS::INIT', dto);
        let response = await BlogPostService.getAllPosts(dto);
        logger.info('CONTROLLER::ALL::POSTS::DONE', {});
        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );
    };
}
