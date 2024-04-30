import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/app.service';
import { AppController } from './app.controller';



describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return status true, message "success", and data with message "I am alive!"', () => {
      const result = appController.checkHealth();
      expect(result).toEqual({
        status: true,
        message: 'success',
        data: { message: 'I am alive!' },
      });
    });

    //Test getUser
    it('should return status true, message "success", and data with non-empty fields  {name:"xxxx", mobile: "xxxxxx", email: "xxxxx"}', () => {
        const usersResponse = appController.getUserTest();
        expect(usersResponse.status).toBe(true);
        expect(usersResponse.message).toBe('success');
        expect(usersResponse.data).toBeDefined();

        const userData = usersResponse.data;
        expect(userData.name).toBeTruthy();
        expect(userData.mobile).toBeTruthy();
        expect(userData.email).toBeTruthy();
      });

  });
});
