import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { userStub } from '../stubs/user.stub';

describe('UsersController', () => {
  let dbConnection: Connection;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();

    const app: INestApplication = moduleRef.createNestApplication();
    await app.init();
  });

  describe('getUsers', async () => {
    await dbConnection.collection('users').insertOne(userStub());
  });
});
