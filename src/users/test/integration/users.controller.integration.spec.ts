import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { userStub } from '../stubs/user.stub';
import * as request from 'supertest';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { ProgrammingLanguage } from '../../../enum/programming.language.enum';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();

    httpServer = app.getHttpServer();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  });

  describe('getUser', () => {
    it('should return a of user', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer).get(
        `/users/${userStub().userId}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(userStub());
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userStub()]);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserRequest: CreateUserDto = {
        email: userStub().email,
        programmingLanguages: userStub().programmingLanguages,
        age: userStub().age,
      };
      const response = await request(httpServer)
        .post('/users')
        .send(createUserRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserRequest);

      const user = await dbConnection
        .collection('users')
        .findOne({ email: createUserRequest.email });
      expect(user).toMatchObject(createUserRequest);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      await dbConnection.collection('users').insertOne(userStub());

      const updateUserRequest: UpdateUserDto = {
        programmingLanguages: [ProgrammingLanguage.JAVASCRIPT],
        age: userStub().age,
      };

      const response = await request(httpServer)
        .patch(`/users/${userStub().userId}`)
        .send(updateUserRequest);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updateUserRequest);
    });
  });
});
