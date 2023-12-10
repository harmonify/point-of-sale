import { ResponseBodyDto } from '@/libs/http';
import { NotificationResponseDto } from '@/modules/notification/dtos/notification-response.dto';
import { appUrl, notification } from '@test/fixtures';
import {
  buildResponseBodySchema,
  notificationJSONSchema,
  responseBodyJSONSchema,
} from '@test/schemas';
import { TestUtil } from '@test/test.service';
import request from 'supertest';

describe('Notification (e2e)', () => {
  let testUtil: TestUtil;
  let accessToken: string;

  const notificationListResponseJSONSchema = buildResponseBodySchema({
    type: 'array',
    items: notificationJSONSchema,
  });

  const notificationResponseJSONSchema = buildResponseBodySchema(
    notificationJSONSchema,
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
    describe('GET /v1/notifications', () => {
      describe('200', () => {
        it('Should return list of notification information', () => {
          return request(appUrl)
            .get('/v1/notifications')
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<NotificationResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(notificationListResponseJSONSchema);
            });
        });
      });
    });

    describe('GET /v1/notifications/:id', () => {
      describe('200', () => {
        it('Should return notification information', () => {
          return request(appUrl)
            .get(`/v1/notifications/${notification.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<NotificationResponseDto> = res.body;
              expect(
                statusCode,
                `expected statusCode to be 200. ${JSON.stringify(body)}`,
              ).toBe(200);
              expect(body).toBeDefined();
              expect(body.data).toBeDefined();
              expect(body).toMatchSchema(notificationResponseJSONSchema);
            });
        });
      });
    });

    describe('DELETE /v1/notifications/:id', () => {
      describe('200', () => {
        it('Should return a response', () => {
          return request(appUrl)
            .delete(`/v1/notifications/${notification.id}`)
            .auth(accessToken, { type: 'bearer' })
            .then((res) => {
              const statusCode = res.statusCode;
              const body: ResponseBodyDto<NotificationResponseDto> = res.body;
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
