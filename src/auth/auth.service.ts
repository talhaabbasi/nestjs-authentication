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
    if (!user) return null;

    const isPasswordCorrect = await argon2.verify(user?.password, password);
    if (isPasswordCorrect) return user;

    return null;
  }

  login(user) {
    const payload: JwtPayload = { sub: user?.userId };
    const access_token: string = this.jwtService.sign(payload);
    return { access_token, user };
  }
}
