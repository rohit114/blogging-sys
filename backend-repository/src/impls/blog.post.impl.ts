import { BlogPostImpl, IBlogPost } from "@core/backend-model";
import { MySqlBaseRepo, MySqlColumnValue } from "./base/base.mysql.repo";
import { BlogPostFormat } from "@core/backend-model/src/impls/formats";
import { TableName } from '../common/constants';
import { IBlogPostRepo } from "index";

export class BlogPostMySqlRepo extends MySqlBaseRepo implements IBlogPostRepo {
    async readById(id: number): Promise<IBlogPost | null> {
        let query: string[] = [];
        query.push('SELECT * ');
        query.push(`FROM ${TableName.POSTS}`);
        query.push('WHERE id=?;');

        let data = await this.selectByQueryAndValues(query.join(' '), [id]);
        if (data == null || data.length == 0) return null;
        return BlogPostImpl.buildFromRow(data[0] as BlogPostFormat)
    }

    async readByPostId(postId: string): Promise<IBlogPost | null> {
        let query: string[] = [];
        query.push('SELECT * ');
        query.push(`FROM ${TableName.POSTS}`);
        query.push('WHERE post_id=?;');

        let data = await this.selectByQueryAndValues(query.join(' '), [postId]);
        if (data == null || data.length == 0) return null;
        return BlogPostImpl.buildFromRow(data[0] as BlogPostFormat)
    }

    async readAllPostId(page: number, limit: number, authorId?: string, creationDate?: string): Promise<IBlogPost[] | [] | null> {
        let query: string[] = [];
        let whereClauseValues: any[] = [];
        const offset = (page - 1) * limit;
        query.push('SELECT * ');
        query.push(`FROM ${TableName.POSTS}`);
        if (authorId && creationDate) {
            query.push('WHERE author_id = ? AND created_at >= ? ');
            whereClauseValues.push(authorId)
            whereClauseValues.push(creationDate)
        } else if (authorId) {
            query.push('WHERE author_id = ? ');
            whereClauseValues.push(authorId)
        } else if (creationDate) {
            query.push('WHERE created_at >= ? ');
            whereClauseValues.push(creationDate)
        }
        query.push('ORDER BY created_at DESC ');
        query.push(`LIMIT ${limit} OFFSET ${offset} ;`);

        let data = await this.selectByQueryAndValues(query.join(' '), whereClauseValues);
        if (data == null || data.length == 0) return null;
        return this.buildPosts(data);
    }

    buildPosts(data: Object[]): IBlogPost[] | [] {
        let posts: IBlogPost[] = [];
        data.forEach(eachData => {
            posts.push(BlogPostImpl.buildFromRow(eachData as BlogPostFormat))
        })
        return posts;
    }

    async createPost(post: IBlogPost): Promise<number> {
        let colVals: MySqlColumnValue[] = this.buildMySqlColValForPost(post);
        let insertId = await this.insertOne(TableName.POSTS, colVals);
        return insertId;
    }

    async updatePost(post: IBlogPost): Promise<any> {
        let query: string[] = [];
        let colVals: string[] = [];
        query.push(`UPDATE ${TableName.POSTS}`)
        if (post.title && post.content) {
            query.push(`SET title = ?, content = ?`)
            colVals.push(post.title);
            colVals.push(post.content);
        } else if (post.title) {
            query.push(`SET title = ?`)
            colVals.push(post.title);
        } else if (post.content) {
            query.push(`SET content = ?`)
            colVals.push(post.content);
        } else {
            throw new Error("title or content field missing");
        }
        query.push(`WHERE post_id = ?;`);

        const ack = await this.updateByQueyAndValue(query.join(' '), colVals, [post.postId]);
        return ack;

    }


    async deletePost(postId: string): Promise<any> {
        let query: string[] = [];
        query.push(`DELETE FROM posts`)
        query.push(`WHERE post_id = ?`);
        const ack = await this.deleteByWhereClause(query.join(' '), [postId]);
        return ack;

    }

    private buildMySqlColValForPost(post: IBlogPost) {
        let colVals: MySqlColumnValue[] = [];
        let row: BlogPostFormat = BlogPostImpl.buildRow(post);

        for (const key in row) {
            if (row.hasOwnProperty(key)) {
                const value = row[key as keyof BlogPostFormat];
                colVals.push(new MySqlColumnValue(key, value));
            }
        }
        return colVals;
    }

}