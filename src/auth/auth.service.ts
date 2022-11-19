import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { JwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if (user && user.password === password) {
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
