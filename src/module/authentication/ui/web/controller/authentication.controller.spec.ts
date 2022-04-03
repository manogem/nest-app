import { Test } from '@nestjs/testing';
import { UserEntity } from '../../../infrastructure/model/user.entity';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from '../../../application/service/authentication.service';
import { AuthenticationWriteRepository } from '../../../infrastructure/repository/authentication.write.repository';
import { CreateUserDto } from '../request/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEmailAlreadyExistsException } from '../../../domain/exception/user-email-already-exists.exception';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;
  let getOneByEmail: jest.Mock;
  let persist: jest.Mock;
  let sign: jest.Mock;

  beforeEach(async () => {
    getOneByEmail = jest.fn();
    persist = jest.fn();
    sign = jest.fn();

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        AuthenticationService,
        {
          provide: JwtService,
          useValue: {
            sign,
          },
        },
        {
          provide: AuthenticationWriteRepository,
          useValue: {
            getOneByEmail,
            persist,
          },
        },
      ],
    }).compile();

    authenticationController = await moduleRef.get<AuthenticationController>(
      AuthenticationController,
    );
    authenticationService = await moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('when signing up', () => {
    describe('and there there is sign up success', () => {
      let user: UserEntity;

      beforeEach(() => {
        user = new UserEntity();
        user.password = 'test';

        getOneByEmail.mockReturnValue(Promise.resolve(null));
        persist.mockReturnValue(Promise.resolve(user));
      });

      it('should return registered user', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.password = 'test';

        const fetchedUser = await authenticationController.signUp(
          createUserDto,
        );

        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and user with the same email exists', () => {
      let user: UserEntity;

      beforeEach(() => {
        user = new UserEntity();
        user.password = 'test';

        getOneByEmail.mockReturnValue(Promise.resolve(user));
      });

      it('should throw exception', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.password = 'test';

        try {
          await authenticationController.signUp(
            createUserDto,
          );
        } catch (e) {
          expect(e).toBeInstanceOf(UserEmailAlreadyExistsException);
        }
      });
    });
  });
});
