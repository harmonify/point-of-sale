import { ResponseBodyDto } from '@/libs/http';
import { UserResponseDto } from '@/modules/user/dtos/user-response.dto';
import { Gender } from '@prisma/client';
import { appUrl, mockUser, testUser } from '@test/fixtures';
import {
  buildResponseBodySchema,
  responseBodyJSONSchema,
  userJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/test.service';
import request from 'supertest';

describe('User (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const userListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: userJSONSchema,
  });

  const userResponseJSONSchema = buildResponseBodySchema(userJSONSchema);

  beforeAll(async () => {
    testUtil = new TestUtil();
    await testUtil.setup();
    const authToken = await testUtil.getAuthToken();
    accessToken = authToken.accessToken;
  });

  afterAll(async () => {
    await testUtil.teardown();
  });

  describe('v1', () => {
    describe('POST /v1/users', () => {
      describe('201', () => {
        it('Should return the user information', () => {
          return request(appUrl)
            .post('/v1/users')
            .auth(accessToken, { type: 'bearer' })
            .send(mockUser)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UserResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(userResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/users', () => {
      describe('200', () => {
        it('Should return list of user information', () => {
          return request(appUrl)
            .get('/v1/users')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UserResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(userListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/users/:id', () => {
      describe('200', () => {
        it('Should return user information', () => {
          return request(appUrl)
            .get(`/v1/users/${testUser.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UserResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(userResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/users/:id', () => {
      describe('200', () => {
        it('Should return user information', () => {
          return request(appUrl)
            .put(`/v1/users/${mockUser.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send({
              isActive: false,
              name: 'User 2',
              gender: Gender.NOT_DEFINED,
              phoneNumber: '1234558',
              description: 'updated user',
              address: 'Mars',
            })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UserResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(userResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/users/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/users/${mockUser.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UserResponseDto> = res.body;
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
