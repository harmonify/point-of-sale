import { RefreshToken, User } from '@prisma/client';

export interface JwtPayload {
  jti?: RefreshToken['id'];
  sub: User['id'];
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
