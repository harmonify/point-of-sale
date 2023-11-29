import { ResponseBodyDto } from '@/libs/http';
import { LoginResponseDto, RefreshTokenResponseDto } from '@/modules/auth/dtos';
import request from 'supertest';

import { appUrl, testUser } from '@test/fixtures';
import {
  buildResponseBodySchema,
  responseBodyJSONSchema,
  userJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/utils';

describe('Auth (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    testUtil = new TestUtil();
    await testUtil.setup();
    const authToken = await testUtil.getAuthToken();
    accessToken = authToken.accessToken;
    refreshToken = authToken.refreshToken;
  });

  afterAll(async () => {
    await testUtil.teardown();
  });

  describe('v1', () => {
    describe('POST /v1/auth/login', () => {
      describe('200', () => {
        const loginResponseSchema = buildResponseBodySchema({
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
            },
            refreshToken: {
              type: 'string',
            },
            user: userJSONSchema,
          },
        });

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
              expect(body).toMatchSchema(loginResponseSchema);
            });
        });
      });
    });

    describe('PUT /v1/auth/password', () => {
      describe('200', () => {
        it('Should return a response', () => {
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
              expect(body).toMatchSchema(responseBodyJSONSchema);
            });
        });
      });
    });

    describe('POST /v1/auth/refresh-token', () => {
      describe('200', () => {
        const refreshTokenResponseSchema = buildResponseBodySchema({
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
            },
            user: userJSONSchema,
          },
        });

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
              expect(body).toMatchSchema(refreshTokenResponseSchema);
            });
        });
      });
    });

    describe('POST /v1/auth/logout', () => {
      describe('Logout from specific session', () => {
        describe('200', () => {
          it('Should return a response', () => {
            return request(appUrl)
              .post('/v1/auth/logout')
              .auth(accessToken, { type: 'bearer' })
              .send({
                fromAll: false,
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
                expect(body).toMatchSchema(responseBodyJSONSchema);
              });
          });
        });
      });

      describe('Logout from all sessions', () => {
        describe('200', () => {
          it('Should return a response', () => {
            return request(appUrl)
              .post('/v1/auth/logout')
              .auth(accessToken, { type: 'bearer' })
              .send({
                fromAll: true,
              })
              .then((res) => {
                const statusCode = res.statusCode;
                const body: ResponseBodyDto<RefreshTokenResponseDto> = res.body;
                expect(
                  statusCode,
                  `expected statusCode to be 200. ${JSON.stringify(body)}`,
                ).toBe(200);
                expect(body).toBeDefined();
                expect(body).toMatchSchema(responseBodyJSONSchema);
              });
          });
        });
      });
    });
  });
});
