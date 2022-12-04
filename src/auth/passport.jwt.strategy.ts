import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PassportJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async isValidToken(token: string) {
    try {
      const validToken = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      );
      return validToken ? true : false;
    } catch (err) {
      return false;
    }
  }
}
