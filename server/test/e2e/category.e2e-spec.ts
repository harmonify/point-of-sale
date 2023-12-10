import { ResponseBodyDto } from '@/libs/http';
import { CategoryResponseDto } from '@/modules/category';
import { appUrl, category, mockCreateCategory } from '@test/fixtures';
import {
  buildResponseBodySchema,
  categoryJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/test.service';
import request from 'supertest';

describe('Category (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const categoryListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: categoryJSONSchema,
  });

  const categoryResponseJSONSchema =
    buildResponseBodySchema(categoryJSONSchema);

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
    describe('POST /v1/categories', () => {
      describe('201', () => {
        it('Should return the category information', () => {
          return request(appUrl)
            .post('/v1/categories')
            .auth(accessToken, { type: 'bearer' })
            .send(mockCreateCategory)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CategoryResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 201. ${JSON.stringify(body)}`,
              ).toBe(201);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(categoryResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/categories', () => {
      describe('200', () => {
        it('Should return list of category information', () => {
          return request(appUrl)
            .get('/v1/categories')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CategoryResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(
                body,
                `expected body to match the category JSON schema. ${JSON.stringify(
                  body,
                )}`,
              ).toMatchSchema(categoryListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/categories/:id', () => {
      describe('200', () => {
        it('Should return category information', () => {
          return request(appUrl)
            .get(`/v1/categories/${category.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CategoryResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(categoryResponseJSONSchema);
            });
        });
      });
    });

    describe('PUT /v1/categories/:id', () => {
      describe('200', () => {
        it('Should return category information', () => {
          return request(appUrl)
            .put(`/v1/categories/${category.id}`)
            .auth(accessToken, { type: 'bearer' })
            .send(category)
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CategoryResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(categoryResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/categories/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/categories/${category.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<CategoryResponseDto> = res.body;
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
