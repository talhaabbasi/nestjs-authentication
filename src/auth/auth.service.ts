import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if (user && user.password === password) {
      const { username } = user;
      return username;
    }

    return null;
  }

  login(user: User): { access_token: string } {
    const payload = { name: user.firstName, sub: user.userId };
    const access_token: string = this.jwtService.sign(payload);
    return { access_token };
  }
}
