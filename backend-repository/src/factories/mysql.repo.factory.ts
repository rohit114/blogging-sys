import { Pool } from 'mysql2/promise';
import { UserMysqlRepo } from '../impls/user.repo.impl';
import { IBlogPostRepo, IUserRepo } from '../interfaces';
import { BlogPostMySqlRepo } from '../impls/blog.post.impl';

export class MySqlRepoFactory {
    static getUserRepo(pool: Pool): IUserRepo {
        return new UserMysqlRepo(pool);
    }
    static getBlogPostRepo(pool: Pool): IBlogPostRepo {
        return new BlogPostMySqlRepo(pool);
    }
}
