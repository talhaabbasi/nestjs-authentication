import { Test } from '@nestjs/testing';
import { ProgrammingLanguage } from '../../enum/programming.language.enum';
import { UserRole } from '../../enum/user.role.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub().userId);
      });

      test('then it should call usersService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().userId);
      });

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      test('then it should call usersService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          age: userStub().age,
          programmingLanguages: [
            ProgrammingLanguage.JAVASCRIPT,
            ProgrammingLanguage.PYTHON,
          ],
          role: UserRole.STUDENT,
        };
        user = await usersController.createUser(createUserDto);
      });

      test('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          age: 98,
          programmingLanguages: [ProgrammingLanguage.JAVASCRIPT],
        };
        user = await usersController.updateUser(
          userStub().userId,
          updateUserDto,
        );
      });

      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          userStub().userId,
          updateUserDto,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
