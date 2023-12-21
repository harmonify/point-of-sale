import { ResponseBodyDto } from '@/libs/http';
import { SupplierResponseDto } from '@/modules/supplier/dtos';
import { appUrl, supplier } from '@test/fixtures';
import {
  buildResponseBodySchema,
  supplierJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/test.service';
import request from 'supertest';

describe('supplier (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const supplierListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: supplierJSONSchema,
  });

  const supplierResponseJSONSchema =
    buildResponseBodySchema(supplierJSONSchema);

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
    describe('POST /v1/suppliers', () => {
      describe('201', () => {
        it('Should return the supplier information', () => {
          return request(appUrl)
            .post('/v1/suppliers')
            .auth(accessToken, { type: 'bearer' })
            .send(supplier)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SupplierResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(supplierResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/suppliers', () => {
      describe('200', () => {
        it('Should return list of supplier information', () => {
          return request(appUrl)
            .get('/v1/suppliers')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SupplierResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(supplierListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/suppliers/:id', () => {
      describe('200', () => {
        it('Should return supplier information', () => {
          return request(appUrl)
            .get(`/v1/suppliers/${supplier.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SupplierResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(supplierResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/suppliers/:id', () => {
      describe('200', () => {
        it('Should return supplier information', () => {
          return request(appUrl)
            .put(`/v1/suppliers/${supplier.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send({
              isActive: false,
              name: 'supplier 2',
              phoneNumber: '1234558',
              description: 'updated supplier',
              address: 'Mars',
            })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SupplierResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(supplierResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/suppliers/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/suppliers/${supplier.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<SupplierResponseDto> = res.body;
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
