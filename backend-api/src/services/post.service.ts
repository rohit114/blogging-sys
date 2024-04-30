import { IBlogPost } from '@core/backend-model';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from '../dto/requests/PostDto';
import repoManager from '../managers/repo.manager';
import { IdGeneratorUtil } from '../utils';
import { getLoggingUtil } from '../utils';
import { BadRequestException, NotFoundException } from '@nestjs/common';
const moment = require('moment-timezone');

const logger = getLoggingUtil('BlogPostService');

export class BlogPostService {
  static async create(request: CreatePostDto): Promise<IBlogPost | null> {
    try {
      logger.info('CREATE::POST::INIT', request);
      const post = this.buildPost(request);
      let id = await repoManager.blogPostRepo.createPost(post);
     
      let createdPost = await repoManager.blogPostRepo.readById(id);
      logger.info('CREATE::POST::DONE::POST_ID', createdPost.postId);
      return createdPost;
    } catch (err) {
      console.error("create post Err", err.message)
      throw new BadRequestException('post creation failed')
    }
  }

  static async getByPostId(postId: string): Promise<IBlogPost | null> {
    logger.info('GET::POST_DETAIL::INIT::POST_ID', postId);
      let postDetail = await repoManager.blogPostRepo.readByPostId(postId);
      logger.info('GET::POST_DETAIL::DONE::POST_ID', postDetail);
      if(!postDetail){
        throw new NotFoundException(`Post with postId: ${postId} not found`);
      }
      return postDetail;
  }
 
  static async getAllPosts(request: FilterPostDto): Promise<IBlogPost[]| [] | null> {
    try {
      logger.info('GET::ALL::POSTS::INIT', request);
      const authorId = (request.authorId)?request.authorId:null;
      const creationDt = (request.creation_dt)?request.creation_dt:null;
      const formattedDate = (creationDt)?moment(creationDt).tz('Asia/Kolkata').format('YYYY-MM-DD'):null;
      const page = (request.page)?request.page:1;
      const limit = (request.limit)?request.limit:5;
      logger.info('creationDt', creationDt);
      logger.info('formattedDate', formattedDate);
      let posts = await repoManager.blogPostRepo.readAllPosts(page, limit, authorId, formattedDate);
      logger.info('GET::ALL::POSTS::DONE', posts);
      return posts;
    } catch (err) {
      console.error("getByPostId Err", err.message)
    }
  }

  static async update(request: UpdatePostDto): Promise<IBlogPost | null> {
    try {
      logger.info('UPDATE::POST::INIT', request);
      const post = this.buildPostForUpdate(request);
      let id = await repoManager.blogPostRepo.updatePost(post);
      await repoManager.blogPostRepo.updatePost(post);
      let updatedPost = await repoManager.blogPostRepo.readByPostId(request.postId);
      logger.info('updatedPost', updatedPost);
      logger.info('UPDATE::POST::DONE::POST_ID', request);
      return updatedPost;
    } catch (err) {
      console.error("update post Err", err.message)
    }
  }
  

  static async deleteByPostId(postId: string): Promise<any | null> {
    try {
      logger.info('DELETE::POST::INIT::POST_ID', postId);
      let ack = await repoManager.blogPostRepo.deletePost(postId);
      logger.info('DELETE::POST::DONE::POST_ID', ack);
      return ack;
    } catch (err) {
      console.error("deleteByPostId Err", err.message)
    }
  }

  private static buildPost(request: CreatePostDto): IBlogPost {
    return {
      postId: IdGeneratorUtil.postId(),
      title: request.title,
      content: request.content,
      author: "todo",
      authorId: request.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  private static buildPostForUpdate(request: UpdatePostDto): any {
    return {
      postId: request.postId,
      title: request.title??null,
      content: request.content??null,
    }
  }
}
