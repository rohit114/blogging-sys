import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, Req, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseController } from './BaseController';
import { Request, Response } from 'express';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from 'src/dto/requests/PostDto';
import { BlogPostService } from 'src/services/post.service';
import { getLoggingUtil } from 'src/utils/logging.util';
const logger = getLoggingUtil('BlogPostService');

@Controller('/v1/post')
export class PostController extends BaseController {
    //create post
    @Post('create')
    async create(
        @Body() payload: Object,
        @Res() res: Response,
    ) {
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
    }

    //update post by postId
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
    @Delete('delete/:postId')
    async delete(
        @Param('postId') postId: string,
        @Res() res: Response,
    ) {
        logger.info('CONTROLLER:DELETE::POST::INIT', postId);
        let response = await BlogPostService.deleteByPostId(postId);
        logger.info('CONTROLLER:DELETE::POST::DONE', postId);
        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );
    }

    //get post by postId
    @Get('detail/:postId')
    async getPost(
        @Param('postId') postId: string,
        @Res() res: Response,
    ) {
        try {
            logger.info('CONTROLLER::POST::DETAIL::INIT', postId);
            let response =  await BlogPostService.getByPostId(postId);
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
