import { IBlogPost } from '@core/backend-model';
export interface IBlogPostRepo {
    readById(id: number): Promise<IBlogPost | null>;
    readByPostId(postId: string): Promise<IBlogPost | null>;
    readAllPosts(page: number, limit: number, authorId?: string, creationDate?: string): Promise<IBlogPost[] | [] | null>;
    createPost(post: IBlogPost): Promise<number>;
    updatePost(post: IBlogPost): Promise<void>;
    deletePost(postid: string): Promise<number>;
}