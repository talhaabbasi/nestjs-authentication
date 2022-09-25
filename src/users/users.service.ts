import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Talha Abbasi',
      username: 'talhaabbasi',
      password: 'sosecure',
    },
    {
      id: 2,
      name: 'Talha Abbasi',
      username: 'talhaabbasii',
      password: 'sosecure1',
    },
    {
      id: 3,
      name: 'Talha Abbasi',
      username: 'talhaabbasii',
      password: 'sosecure2',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
