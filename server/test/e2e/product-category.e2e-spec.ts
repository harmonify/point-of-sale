import { ResponseBodyDto } from '@/libs/http';
import { ProductCategoryResponseDto } from '@/modules/product-category';
import { Gender } from '@prisma/client';
import request from 'supertest';

import { appUrl, mockProductCategory, productCategory } from '@test/fixtures';
import {
  buildResponseBodySchema,
  productCategoryJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/utils';

describe('ProductCategory (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const productCategoryListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: productCategoryJSONSchema,
  });

  const productCategoryResponseJSONSchema = buildResponseBodySchema(
    productCategoryJSONSchema,
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
    describe('POST /v1/product-categories', () => {
      describe('201', () => {
        it('Should return the product category information', () => {
          return request(appUrl)
            .post('/v1/product-categories')
            .auth(accessToken, { type: 'bearer' })
            .send(mockProductCategory)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductCategoryResponseDto> =
                res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productCategoryResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/product-categories', () => {
      describe('200', () => {
        it('Should return list of product category information', () => {
          return request(appUrl)
            .get('/v1/product-categories')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductCategoryResponseDto> =
                res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productCategoryListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/product-categories/:id', () => {
      describe('200', () => {
        it('Should return product category information', () => {
          return request(appUrl)
            .get(`/v1/product-categories/1`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductCategoryResponseDto> =
                res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productCategoryResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/product-categories/:id', () => {
      describe('200', () => {
        it('Should return product category information', () => {
          return request(appUrl)
            .put(`/v1/product-categories/${productCategory.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send({
              isActive: false,
              name: 'ProductCategory 2',
              gender: Gender.NOT_DEFINED,
              phoneNumber: '1234558',
              description: 'updated productCategory',
              address: 'Mars',
            })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductCategoryResponseDto> =
                res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(productCategoryResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/product-categories/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/product-categories/${productCategory.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<ProductCategoryResponseDto> =
                res.body;
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
