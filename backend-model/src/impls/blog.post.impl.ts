import { IBlogPost } from "src/interface/blog-post";
import { BlogPostFormat } from "./formats/blog.post.format";

export class BlogPostImpl implements IBlogPost {
    postId: string;
    title: string;
    content: string;
    author: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(postId: string, title: string,
        content: string,
        author: string,
        authorId: string,
        createdAt: Date,
        updatedAt: Date) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.author = author;
        this.authorId = authorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }

    static buildRow(post: IBlogPost): BlogPostFormat {
        return {
            post_id: post.postId,
            title: post.title,
            content: post.content,
            author: post.author,
            author_id: post.authorId,
            created_at: post.createdAt,
            updated_at: post.updatedAt,
        };
    }

    static buildFromRow(post: BlogPostFormat): IBlogPost {
        return {
            postId: post.post_id,
            title: post.title,
            content: post.content,
            author: post.author,
            authorId: post.author_id,
            createdAt: post.created_at,
            updatedAt: post.updated_at
        };
    }
}