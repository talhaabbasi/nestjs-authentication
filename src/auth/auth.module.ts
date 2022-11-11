import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { SessionSerializer } from '../utils/serializers/session.serializer';
import { AuthService } from './auth.service';
import { PassportLocalStrategy } from './passport.local.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, PassportLocalStrategy, SessionSerializer],
})
export class AuthModule {}
