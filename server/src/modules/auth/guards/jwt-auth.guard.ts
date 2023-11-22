import { InvalidTokenException } from '@common/http/exceptions';
import { UserEntity } from '@database/entities/user.entity';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

import { SKIP_AUTH } from '../constants';
import { TokenType } from '../enums';
import { TokenService } from '../services';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger('JwtAuthGuard');

  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  /**
   * Verify the token is valid
   * @param context {ExecutionContext}
   * @returns super.canActivate(context)
   */
  canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) {
      return true;
    }

    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest(),
    );
    if (!accessToken) {
      throw new InvalidTokenException();
    }

    const payload = this.tokenService.verifyToken(
      accessToken,
      TokenType.AccessToken,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    return super.canActivate(context);
  }

  /**
   * Handle request and verify if exist an error or there's not user
   */
  handleRequest<UserEntity>(error: Error, user: UserEntity) {
    if (error) {
      this.logger.error(error);
      throw error;
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
