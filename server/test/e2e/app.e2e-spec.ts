import { ResponseBodyDto } from '@/libs/http';
import { appUrl } from '@test/fixtures';
import { responseBodyJSONSchema } from '@test/schemas';
import request from 'supertest';

describe('App (e2e)', () => {
  it('GET /', () => {
    return request(appUrl)
      .get('/')
      .then((res) => {
        const statusCode = res.statusCode;
        const body: ResponseBodyDto = res.body;

        expect(
          statusCode,
          `expected statusCode to be 200. ${JSON.stringify(body)}`,
        ).toBe(200);
        expect(body).toBeDefined();
        expect(body).toMatchSchema(responseBodyJSONSchema);
      });
  });
});
