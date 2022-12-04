import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportLocalStrategy } from './passport.local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportJwtStrategy } from './passport.jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn:
            configService.get('JWT_SECRET') === 'release' ? '60s' : '60 days',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, PassportLocalStrategy, PassportJwtStrategy],
  exports: [AuthService, PassportJwtStrategy],
})
export class AuthModule {}
