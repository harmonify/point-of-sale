import { ResponseBodyDto } from '@/libs/http';
import { ProductResponseDto } from '@/modules/product';
import { Gender } from '@prisma/client';
import { appUrl, createProductDto, product } from '@test/fixtures';
import {
  buildResponseBodySchema,
  productJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/utils';
import request from 'supertest';

describe('Product (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const productListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: productJSONSchema,
  });

  const productResponseJSONSchema = buildResponseBodySchema(productJSONSchema);

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
    describe('POST /v1/products', () => {
      describe('201', () => {
        it('Should return the product information', () => {
          return request(appUrl)
            .post('/v1/products')
            .auth(accessToken, { type: 'bearer' })
            .send(createProductDto)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/products', () => {
      describe('200', () => {
        it('Should return list of product information', () => {
          return request(appUrl)
            .get('/v1/products')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/products/:id', () => {
      describe('200', () => {
        it('Should return product information', () => {
          return request(appUrl)
            .get(`/v1/products/${product.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/products/:id', () => {
      describe('200', () => {
        it('Should return product information', () => {
          return request(appUrl)
            .put(`/v1/products/${product.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send(createProductDto)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/products/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/products/${product.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductResponseDto> = res.body;
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
