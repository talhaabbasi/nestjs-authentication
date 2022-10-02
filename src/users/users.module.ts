import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsEmailUserAlreadyExistConstraint } from '../utils/validators/is.email.exist.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersRepository, IsEmailUserAlreadyExistConstraint],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
