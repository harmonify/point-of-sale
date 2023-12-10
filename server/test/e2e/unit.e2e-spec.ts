import { ResponseBodyDto } from '@/libs/http';
import { UnitResponseDto } from '@/modules/unit';
import { appUrl, mockUnit, pieceUnit } from '@test/fixtures';
import {
  buildResponseBodySchema,
  responseBodyJSONSchema,
  unitJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/utils';
import request from 'supertest';

describe('Unit (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const unitListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: unitJSONSchema,
  });

  const unitResponseJSONSchema = buildResponseBodySchema(unitJSONSchema);

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
    describe('POST /v1/units', () => {
      describe('201', () => {
        it('Should return the unit information', () => {
          return request(appUrl)
            .post('/v1/units')
            .auth(accessToken, { type: 'bearer' })
            .send(mockUnit)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UnitResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(unitResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/units', () => {
      describe('200', () => {
        it('Should return list of unit information', () => {
          return request(appUrl)
            .get('/v1/units')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UnitResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(unitListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/units/:id', () => {
      describe('200', () => {
        it('Should return unit information', () => {
          return request(appUrl)
            .get(`/v1/units/${pieceUnit.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UnitResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(unitResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/units/:id', () => {
      describe('200', () => {
        it('Should return unit information', () => {
          return request(appUrl)
            .put(`/v1/units/${mockUnit.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send(mockUnit)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UnitResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(unitResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/units/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/units/${mockUnit.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<UnitResponseDto> = res.body;
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
