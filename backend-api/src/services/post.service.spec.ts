import { BlogPostService } from './post.service';
import { IBlogPost, IUser } from '@core/backend-model';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from 'src/dto/requests/PostDto';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/requests/UserDto';
import { NotFoundException } from '@nestjs/common';
import { RandomGenerator } from '../utils';

let mockUser: IUser = {
    userId: '1',
    firstName: 'Rohit',
    lastName: 'Kumar',
    mobile: '1234567890',
    email: 'Rohit@example.com',
    isActive: true,
    isBlocked: false,
    accessToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),

};

const userRequest: UserDto = {
    firstName: 'Rohit',
    lastName: 'Kumar',
    mobile: '1234567890',
    email: 'Rohit@example.com',
};
let mockUserId = '1';
let mockPost: IBlogPost = {
    postId: "1",
    title: "Test title",
    content: "Test blog content",
    author: "test_user",
    authorId: mockUserId,
    createdAt: new Date(),
    updatedAt: new Date()
};

let request: CreatePostDto = {
    title: 'Test title two',
    content: 'blog content 2',
    userId: mockUserId,
};

let mockAuthorId = mockUserId;
let mockPostId = '1';

let updatePostDto: UpdatePostDto = {
    userId: mockAuthorId,
    postId: mockPostId,
    title: "updated title",
    content: "updated content"
}

let postFilterDto: FilterPostDto = {
    page: 1,
    limit: 2
}
describe('BlogPostService', () => {

    // Mock RepoManager
    const mockRepoManager = {
        postRepo: {
            createPost: jest.fn(),
            updatePost: jest.fn(),
            deletePost: jest.fn(),
            readById: jest.fn(),
            readByPostId: jest.fn(),
            readAllPosts: jest.fn()
        },
        userRepo: {
            createOne: jest.fn(),
            readById: jest.fn(),
            readByUserId: jest.fn(),
        },
    };

    describe('createPost', () => {
        it('should create a new post', async () => {
            userRequest.email = RandomGenerator.generateRandomEmail(8);
            userRequest.mobile = RandomGenerator.generateRandomNumber(10);
            const result = await UserService.createUser(userRequest);
            mockUserId = result.userId;
            const resultKeys = Object.keys(result);
            const mockUserKeys = Object.keys(mockUser);
            mockUserKeys.forEach((key) => {
                // Check if the all the keys are expected as IUser
                expect(resultKeys.includes(key)).toBeDefined();

                // Check if the value corresponding to the key is not empty
                expect(result[key]).toBeDefined();
            });
            // Check if any redundant key is present
            const extraKeys = resultKeys.filter((key) => !mockUserKeys.includes(key));
            expect(extraKeys).toEqual([]);
        });


        it('should create a new post', async () => {
            request.userId = mockUserId;
            const result = await BlogPostService.create(request);
            mockAuthorId = result.authorId;
            mockPostId = result.postId;
            const resultKeys = Object.keys(result);
            const mockPostKeys = Object.keys(mockPost);
            mockPostKeys.forEach((key) => {
                // Check if the all the keys are expected as IUser
                expect(resultKeys.includes(key)).toBeDefined();

                // Check if the value corresponding to the key is not empty
                expect(result[key]).toBeDefined();
            });
            // Check if any redundant key is present
            const extraKeys = resultKeys.filter((key) => !mockPostKeys.includes(key));
            expect(extraKeys).toEqual([]);
        });
    });

    describe('readByPostId', () => {
        it('should return post details', async () => {
            const result = await BlogPostService.getByPostId(mockPostId);
            expect(result).toBeDefined();
        });

        it('should throw NotFoundException if post not found', async () => {
            const mockPostId = '0';
            await expect(BlogPostService.getByPostId(mockPostId)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('updateByPostId', () => {
        it('should return updated post', async () => {
            updatePostDto.postId = mockPostId;
            updatePostDto.userId = mockUserId;
            const result = await BlogPostService.update(updatePostDto);
            expect(result).toBeDefined();
            expect(result.title).toEqual(updatePostDto.title);
            expect(result.content).toEqual(updatePostDto.content);
        });
    });
    describe('readAllPosts', () => {
        it('should return all post with filter', async () => {
            postFilterDto.page = 1;
            postFilterDto.limit = 1;
            const result = await BlogPostService.getAllPosts(postFilterDto);
            expect(result).toBeDefined();
            expect(result.length).toEqual(1)
        });
    });

    describe('deleteByPostId', () => {
        it('delete a post', async () => {
            postFilterDto.page = 1;
            postFilterDto.limit = 2;
            const result = await BlogPostService.deleteByPostId(mockPostId, {userId : 'TEST_USER_ID'});
            expect(result).toBeDefined();
            expect(result[0]['affectedRows']).toEqual(1);
        });
        it('should throw NotFoundException if post not found', async () => {
            await expect(BlogPostService.getByPostId("xxxxxx")).rejects.toThrowError(NotFoundException);
        });
    });
});