import {
  BlockedUserException,
  InactiveUserException,
  InvalidCredentialsException,
} from '@/libs/http/exceptions';
import { PrismaService } from '@/libs/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<IConfig, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret', { infer: true }),
      ignoreExpiration: false,
    });
  }

  async validate({ sub }: JwtPayload): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: sub },
    });
    if (!user) {
      throw new InvalidCredentialsException();
    }
    if (!user.isActive) {
      throw new InactiveUserException(user.blockReason);
    }
    return user;
  }
}
