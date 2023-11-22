import { RefreshTokenEntity, UserEntity } from '@database/entities';

export interface JwtPayload {
  jti?: RefreshTokenEntity['id'];
  sub: UserEntity['id'];
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
