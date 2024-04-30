import { BlogPostService } from './post.service';
import { IBlogPost, IUser } from '@core/backend-model';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from 'src/dto/requests/PostDto';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/requests/UserDto';
import { NotFoundException } from '@nestjs/common';


let mockUser: IUser = {
    userId: '1',
    firstName: 'John',
    lastName: 'Doe',
    mobile: '1234567890',
    email: 'john@example.com',
    isActive: true,
    isBlocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const userRequest: UserDto = {
    firstName: 'John',
    lastName: 'Doe',
    mobile: '1234567890',
    email: 'john@example.com',
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

            mockRepoManager.userRepo.createOne.mockResolvedValue('1');
            mockRepoManager.userRepo.readById.mockResolvedValue(mockUser);

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

            mockRepoManager.postRepo.createPost.mockResolvedValue('1');
            mockRepoManager.postRepo.readById.mockResolvedValue(mockPost);
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
            jest.spyOn(mockRepoManager.postRepo, 'readByPostId').mockResolvedValue(mockPost);
            const result = await BlogPostService.getByPostId(mockPostId);
            expect(result).toBeDefined();
        });

        it('should throw NotFoundException if post not found', async () => {
            const mockPostId = '0';
            mockRepoManager.postRepo.readByPostId.mockResolvedValue(null);
            await expect(BlogPostService.getByPostId(mockPostId)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('updateByPostId', () => {
        it('should return updated post', async () => {
            jest.spyOn(mockRepoManager.postRepo, 'updatePost').mockResolvedValue(mockPost);
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
            postFilterDto.limit = 2;
            const result = await BlogPostService.getAllPosts(postFilterDto);
            expect(result).toBeDefined();
            expect(result.length).toEqual(2)
        });

    });
});