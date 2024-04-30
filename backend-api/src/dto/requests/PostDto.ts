import { Expose } from 'class-transformer';

export class CreatePostDto {
    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'content' })
    content: string;

    @Expose({ name: 'user_id' })
    userId: string;
}

export class FilterPostDto {
    @Expose({ name: 'author_id' })
    authorId?: string;

    @Expose({ name: 'creation_dt' })
    creation_dt?: Date;

    @Expose({ name: 'page' })
    page: number;

    @Expose({ name: 'limit' })
    limit: number;
}

export class UpdatePostDto {
    @Expose({ name: 'user_id' })
    userId: string;

    @Expose({ name: 'post_id' })
    postId: string;

    @Expose({ name: 'title' })
    title?: string;

    @Expose({ name: 'content' })
    content?: string;
}

