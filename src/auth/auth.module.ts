import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportLocalStrategy } from './passport.local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, PassportLocalStrategy],
})
export class AuthModule {}
