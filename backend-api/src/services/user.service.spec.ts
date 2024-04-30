import { UserDto } from 'src/dto/requests/UserDto';
import { UserService } from './user.service';
import { IUser } from '@core/backend-model';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockUser: IUser = {
  userId: '1',
  firstName: 'John',
  lastName: 'Doe',
  mobile: '1234567890',
  email: 'john@example.com',
  isActive: true,
  isBlocked: false,
  accessToken: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const request: UserDto = {
  firstName: 'John',
  lastName: 'Doe',
  mobile: '1234567890',
  email: 'john@example.com',
};
let mockUserId = '1';
describe('UserService', () => {

  // Mock RepoManager
  const mockRepoManager = {
    userRepo: {
      createOne: jest.fn(),
      readById: jest.fn(),
      readByUserId: jest.fn(),
    },
  };

  describe('createUser', () => {
    it('should create a new user', async () => {

      mockRepoManager.userRepo.createOne.mockResolvedValue('1');
      mockRepoManager.userRepo.readById.mockResolvedValue(mockUser);

      const result = await UserService.createUser(request);
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

    // it('should throw an error if user creation fails', async () => {
    //   const mockedRejectedPromise = Promise.reject(new Error('Something went wrong'));
    //   mockRepoManager.userRepo.createOne.mockRejectedValue(mockedRejectedPromise);
    //   mockRepoManager.userRepo.readById.mockRejectedValue(mockedRejectedPromise);
    //   const result = await UserService.createUser(request);
    //   await expect(UserService.createUser(request)).rejects.toThrowError(BadRequestException);
    // });
  });

  describe('getByUserId', () => {
    it('should return user details', async () => {
      jest.spyOn(mockRepoManager.userRepo, 'readByUserId').mockResolvedValue(mockUser);
      const result = await UserService.getByUserId(mockUserId);
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      const mockUserId = '1';
      mockRepoManager.userRepo.readByUserId.mockResolvedValue(null);
      await expect(UserService.getByUserId(mockUserId)).rejects.toThrowError(NotFoundException);
    });
  });
});