import { ResponseBodyDto } from '@/libs/http';
import { ProcurementResponseDto } from '@/modules/procurement';
import { appUrl, createProcurementDto, procurement } from '@test/fixtures';
import {
  buildResponseBodySchema,
  procurementJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/utils';
import request from 'supertest';

describe('Procurement (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const procurementListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: procurementJSONSchema,
  });

  const procurementResponseJSONSchema = buildResponseBodySchema(
    procurementJSONSchema,
  );

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
    describe('POST /v1/procurements', () => {
      describe('201', () => {
        it('Should return the procurement information', () => {
          return request(appUrl)
            .post('/v1/procurements')
            .auth(accessToken, { type: 'bearer' })
            .send(createProcurementDto)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProcurementResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(procurementResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/procurements', () => {
      describe('200', () => {
        it('Should return list of procurement information', () => {
          return request(appUrl)
            .get('/v1/procurements')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProcurementResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(procurementListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/procurements/:id', () => {
      describe('200', () => {
        it('Should return procurement information', () => {
          return request(appUrl)
            .get(`/v1/procurements/${procurement.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProcurementResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(procurementResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/procurements/:id', () => {
      describe('200', () => {
        it('Should return procurement information', () => {
          return request(appUrl)
            .put(`/v1/procurements/${procurement.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send(createProcurementDto)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProcurementResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(procurementResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/procurements/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/procurements/${procurement.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProcurementResponseDto> = res.body;
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
