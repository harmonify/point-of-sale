import { UserEntity } from '@database/entities/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './dtos';
import {
  DisabledUserException,
  InvalidCredentialsException,
} from '@/libs/http/exceptions';
import { ErrorType } from '@/common/enums';
import { BaseRepository } from '@/libs/crud';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: BaseRepository<UserEntity>,
    private readonly configService: ConfigService<IConfig, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret', { infer: true }),
      ignoreExpiration: false,
    });
  }

  async validate({ sub }: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: sub });
    if (!user) {
      throw new InvalidCredentialsException();
    }
    if (!user.isActive) {
      throw new DisabledUserException(ErrorType.InactiveUser);
    }
    if (user.isBlocked) {
      throw new DisabledUserException(ErrorType.BlockedUser);
    }
    return user;
  }
}
