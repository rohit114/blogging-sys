import { UserDto } from 'src/dto/requests/UserDto';
import { UserService } from './user.service';
import { IUser } from '@core/backend-model';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RandomGenerator } from '../utils';

let mockUser: IUser = {
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

let request: UserDto = {
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
      request.email = RandomGenerator.generateRandomEmail(8);
      request.mobile = RandomGenerator.generateRandomNumber(10);
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