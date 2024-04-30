import { mysqlPool } from '../config/mysql.config';
import { IBlogPostRepo, IUserRepo, MySqlRepoFactory } from '@core/backend-repository';
import { BaseManager } from './base.manager';

class RepoManager extends BaseManager {
  public readonly userRepo: IUserRepo;
  public readonly blogPostRepo: IBlogPostRepo;

  constructor() {
    super('RepoManager');

    this.logger.info('MANAGER::INIT', 'REPOSITORY');

    this.userRepo = MySqlRepoFactory.getUserRepo(mysqlPool);
    this.blogPostRepo = MySqlRepoFactory.getBlogPostRepo(mysqlPool);

    this.logger.info('MANAGER::INITIALIZED', 'REPOSITORY');
  }
}

let repoManager = new RepoManager();

export default repoManager;
