import {
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
import { StringUtil } from '@/common/utils';

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
    let subId;
    try {
      subId = StringUtil.toNumber({ value: sub, throwIfFailed: true });
    } catch (error) {
      throw new InvalidCredentialsException();
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: subId },
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
