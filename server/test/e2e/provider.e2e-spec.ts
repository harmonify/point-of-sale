import { ResponseBodyDto } from '@/libs/http';
import { ProviderResponseDto } from '@/modules/provider/dtos';
import request from 'supertest';

import { appUrl, provider } from '@test/fixtures';
import {
  buildResponseBodySchema,
  providerJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/utils';

describe('Provider (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const providerListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: providerJSONSchema,
  });

  const providerResponseJSONSchema =
    buildResponseBodySchema(providerJSONSchema);

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
    describe('POST /v1/providers', () => {
      describe('201', () => {
        it('Should return the provider information', () => {
          return request(appUrl)
            .post('/v1/providers')
            .auth(accessToken, { type: 'bearer' })
            .send(provider)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProviderResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(providerResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/providers', () => {
      describe('200', () => {
        it('Should return list of provider information', () => {
          return request(appUrl)
            .get('/v1/providers')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProviderResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(providerListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/providers/:id', () => {
      describe('200', () => {
        it('Should return provider information', () => {
          return request(appUrl)
            .get(`/v1/providers/${provider.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProviderResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(providerResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/providers/:id', () => {
      describe('200', () => {
        it('Should return provider information', () => {
          return request(appUrl)
            .put(`/v1/providers/${provider.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send({
              isActive: false,
              name: 'Provider 2',
              phoneNumber: '1234558',
              description: 'updated provider',
              address: 'Mars',
            })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProviderResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(providerResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/providers/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/providers/${provider.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProviderResponseDto> = res.body;
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
