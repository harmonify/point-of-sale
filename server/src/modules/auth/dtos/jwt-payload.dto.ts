export interface JwtPayload {
  jti: string; // refresh token id
  sub: string; // user id
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
