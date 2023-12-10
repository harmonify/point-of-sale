import { ResponseBodyDto } from '@/libs/http';
import { SaleResponseDto } from '@/modules/sale';
import { appUrl, createSaleDto, sale } from '@test/fixtures';
import {
  buildResponseBodySchema,
  saleJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/test.service';
import request from 'supertest';

describe('Sale (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const saleListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: saleJSONSchema,
  });

  const saleResponseJSONSchema = buildResponseBodySchema(saleJSONSchema);

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
    describe('POST /v1/sales', () => {
      describe('201', () => {
        it('Should return the sale information', () => {
          return request(appUrl)
            .post('/v1/sales')
            .auth(accessToken, { type: 'bearer' })
            .send(createSaleDto)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SaleResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(saleResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/sales', () => {
      describe('200', () => {
        it('Should return list of sale information', () => {
          return request(appUrl)
            .get('/v1/sales')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SaleResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(saleListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/sales/:id', () => {
      describe('200', () => {
        it('Should return sale information', () => {
          return request(appUrl)
            .get(`/v1/sales/${sale.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SaleResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(saleResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/sales/:id', () => {
      describe('200', () => {
        it('Should return sale information', () => {
          return request(appUrl)
            .put(`/v1/sales/${sale.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send(createSaleDto)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SaleResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(saleResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/sales/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/sales/${sale.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SaleResponseDto> = res.body;
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
