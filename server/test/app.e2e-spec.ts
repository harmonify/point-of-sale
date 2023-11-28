import request from 'supertest';
import { appUrl } from './fixtures';
import { ResponseBodyDto } from '@/libs/http';

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
        expect(body.statusCode).toBeDefined();
        expect(body.statusCode).toBeNumber();
        expect(body.message).toBeDefined();
        expect(body.message).toBeString();
        expect(body.data).toBeUndefined();
        expect(body.requestId).toBeDefined();
        expect(body.requestId).toBeString();
        expect(body.timestamp).toBeDefined();
        expect(body.timestamp).toBeNumber();
      });
  });
});
