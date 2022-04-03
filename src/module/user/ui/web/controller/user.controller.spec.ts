import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../application/service/user.service';
import { UserEntity } from '../../../infrastructure/model/user.entity';
import { UserReadRepository } from '../../../infrastructure/repository/user.read.repository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let getAll: jest.Mock;

  beforeEach(async () => {
    getAll = jest.fn();

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserReadRepository,
          useValue: {
            getAll,
          },
        },
      ],
    }).compile();

    userController = await moduleRef.get<UserController>(UserController);
    userService = await moduleRef.get<UserService>(UserService);
  });

  describe('when getting all users', () => {
    describe('and there are existing users', () => {
      let users: UserEntity[];
      beforeEach(() => {
        users = [new UserEntity()];

        getAll.mockReturnValue(Promise.resolve(users));
      });

      it('should return the array of users', async () => {
        const fetchedUser = await userController.getAll();

        expect(fetchedUser).toEqual(users);
      });
    });

    describe('and there are no existing users', () => {
      beforeEach(() => {
        getAll.mockReturnValue(Promise.resolve([]));
      });

      it('should return the empty array', async () => {
        const fetchedUser = await userController.getAll();

        expect(fetchedUser).toEqual([]);
      });
    });
  });
});
