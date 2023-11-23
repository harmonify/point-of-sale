import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards';
import { JwtStrategy } from './jwt.strategy';
import { AuthService, TokenService } from './services';

@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<IConfig, true>) => ({
        isGlobal: true,
        secret: config.get('jwt.secret', { infer: true }),
        signOptions: {
          algorithm: 'HS256',
          expiresIn: config.get('jwt.accessExpiry', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [JwtStrategy, PassportModule, TokenService, AuthService, JwtModule],
})
export class AuthModule {}
