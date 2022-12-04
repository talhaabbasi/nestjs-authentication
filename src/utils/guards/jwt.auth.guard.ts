import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PassportJwtStrategy } from '../../auth/passport.jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtStrategy: PassportJwtStrategy,
  ) {
    super(reflector);
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.rawHeaders[1].split(' ')[1];
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      'public route',
      context.getHandler(),
    );
    return allowUnauthorizedRequest || this.jwtStrategy.isValidToken(token);
  }
}
