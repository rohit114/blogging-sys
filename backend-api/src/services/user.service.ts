import { IUser } from '@core/backend-model';
import { UserDto } from '../dto/requests/UserDto';
import repoManager from '../managers/repo.manager';
import { IdGeneratorUtil } from '../utils/idGenerator';
import { getLoggingUtil } from '../utils/logging.util';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const logger = getLoggingUtil('UserService');

export class UserService {
  static async createUser(request: UserDto):Promise<IUser | null> {
    try {
      logger.info('CREATE::USER::INIT', request); //Mask PII data in log
      const user = this.buildUser(request);
      let id = await repoManager.userRepo.createOne(user);
      let createdUser = await repoManager.userRepo.readById(id);
      logger.info('CREATE::USER::DONE::USER_ID', createdUser.userId);
      return createdUser;
    } catch (err) {
      console.error("createUser Err", err.message)
      throw new BadRequestException('User creation failed')
    }
  }

  static async getByUserId(userId: string):Promise<IUser | null> {
    logger.info('GET::USER_DETAIL::INIT::USER_ID', userId);
      let userDetail = await repoManager.userRepo.readByUserId(userId);
      if(!userDetail){
        throw new NotFoundException(`User with userId: ${userId} not found`);
      }
      logger.info('GET::USER_DETAIL::DONE', userDetail); //Mask PII data in log
      return userDetail;
  }

  private static buildUser(request: UserDto):IUser {
    return {
        userId: IdGeneratorUtil.userId(),
        firstName: request.firstName,
        lastName: request.lastName,
        mobile: request.mobile,
        email: request.email,
        isActive: true,
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }

  }
}
