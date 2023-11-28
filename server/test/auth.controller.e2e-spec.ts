import request from 'supertest';

import { appUrl, testUser } from './fixtures';
import { LoginResponseDto, RefreshTokenResponseDto } from '@/modules/auth/dtos';
import { expectUser } from './matchers/user';
import { ResponseBodyDto } from '@/libs/http';
import { getToken } from './utils/get-token.util';

describe('Auth (e2e)', () => {
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    const response = await getToken();
    accessToken = response.accessToken;
    refreshToken = response.refreshToken;
  });

  describe('v1', () => {
    describe('POST /v1/auth/login', () => {
      describe('200', () => {
        it('Should return the user information, access token, and refresh token', () => {
          return request(appUrl)
            .post('/v1/auth/login')
            .send({ email: testUser.email, password: testUser.password })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<LoginResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data.accessToken).toBeDefined();
              expect(body.data.accessToken).toBeString();
              expect(body.data.refreshToken).toBeDefined();
              expect(body.data.refreshToken).toBeString();
              expectUser.bind(this)(body.data.user);
            });
        });
      });
    });

    describe('PUT /v1/auth/password', () => {
      describe('200', () => {
        it('Should return the user information', () => {
          return request(appUrl)
            .put('/v1/auth/password')
            .auth(accessToken, { type: 'bearer' })
            .send({
              currentPassword: testUser.password,
              newPassword: testUser.password,
            })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
            });
        });
      });
    });

    describe('POST /v1/auth/refresh-token', () => {
      describe('200', () => {
        it('Should return the user information and access token', () => {
          return request(appUrl)
            .post('/v1/auth/refresh-token')
            .send({
              refreshToken: refreshToken,
            })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<RefreshTokenResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data.accessToken).toBeDefined();
              expect(body.data.accessToken).toBeString();
              expectUser.bind(this)(body.data.user);
            });
        });
      });
    });

    describe('PUT /v1/auth/password', () => {});

    describe('POST /v1/auth/logout', () => {});
  });
});
