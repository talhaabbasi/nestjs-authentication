import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if (user && argon2.verify(user.password, password)) {
      const { userId } = user;
      return userId;
    }

    return null;
  }

  login(userId: string): { access_token: string } {
    const payload: JwtPayload = { sub: userId };
    const access_token: string = this.jwtService.sign(payload);
    return { access_token };
  }
}
