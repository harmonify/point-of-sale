import { ResponseBodyDto } from '@/libs/http';
import { CustomerResponseDto } from '@/modules/customer/dtos/customer-response.dto';
import { Gender } from '@prisma/client';
import { appUrl, customer } from '@test/fixtures';
import {
  buildResponseBodySchema,
  customerJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/test.service';
import request from 'supertest';

describe('Customer (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const customerListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: customerJSONSchema,
  });

  const customerResponseJSONSchema =
    buildResponseBodySchema(customerJSONSchema);

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
    describe('POST /v1/customers', () => {
      describe('201', () => {
        it('Should return the customer information', () => {
          return request(appUrl)
            .post('/v1/customers')
            .auth(accessToken, { type: 'bearer' })
            .send(customer)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CustomerResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(customerResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/customers', () => {
      describe('200', () => {
        it('Should return list of customer information', () => {
          return request(appUrl)
            .get('/v1/customers')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CustomerResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(customerListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/customers/:id', () => {
      describe('200', () => {
        it('Should return customer information', () => {
          return request(appUrl)
            .get(`/v1/customers/${customer.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CustomerResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(customerResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/customers/:id', () => {
      describe('200', () => {
        it('Should return customer information', () => {
          return request(appUrl)
            .put(`/v1/customers/${customer.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send({
              isActive: false,
              name: 'Customer 2',
              gender: Gender.NOT_DEFINED,
              phoneNumber: '1234558',
              description: 'updated customer',
              address: 'Mars',
            })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CustomerResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(customerResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/customers/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/customers/${customer.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CustomerResponseDto> = res.body;
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
