import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async userExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ email });
    return user ? true : false;
  }

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneWithFields(
      { username },
      {
        username: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        role: 1,
        age: 1,
        programmingLanguages: 1,
        userId: 1,
        password: 1,
      },
    );
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const password = await argon2.hash(user.password);
    return this.usersRepository.create({
      userId: uuidv4(),
      ...user,
      password,
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }
}
