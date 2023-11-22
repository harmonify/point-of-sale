import {
  IS_PUBLIC_KEY_META,
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_ENDPOINT,
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
} from '@/common/constant';
import { swaggerOptions } from '@/common/swagger/swagger.plugin';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getMiddleware } from 'swagger-stats';

import type { INestApplication } from '@nestjs/common';
import { NestConfigService } from '@/libs/config/config.service';

const logger = new Logger('App:Utils');

export class AppUtils {
  static gracefulShutdown(app: INestApplication, code: string): void {
    setTimeout(() => process.exit(1), 5000);
    logger.verbose(`Signal received with code ${code} ⚡.`);
    logger.log('❗Closing http server with grace.');
    app &&
      app.close &&
      app
        .close()
        .then(() => {
          logger.log('✅ Http server closed.');
          process.exit(0);
        })
        .catch((error) => {
          logger.error(`❌ Http server closed with error: ${error}`);
          process.exit(1);
        });
  }

  static killAppWithGrace(app: INestApplication): void {
    process.on('SIGINT', () => {
      AppUtils.gracefulShutdown(app, 'SIGINT');
    });
    process.on('SIGTERM', () => {
      AppUtils.gracefulShutdown(app, 'SIGTERM');
    });
  }

  static setupSwagger(
    app: INestApplication,
    configService: NestConfigService,
  ): void {
    try {
      const userName = configService.get('app.swaggerUser', { infer: true });
      const passWord = configService.get('app.swaggerPass', { infer: true });
      const appName = configService.get('app.name', { infer: true });

      const config = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .setDescription(SWAGGER_DESCRIPTION || '')
        .setVersion(SWAGGER_API_CURRENT_VERSION)
        .addBearerAuth({
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        })
        .build();

      const document = SwaggerModule.createDocument(app, config, {});

      const paths = Object.values(document.paths);

      for (const path of paths) {
        const methods = Object.values(path);

        for (const method of methods) {
          if (
            Array.isArray(method.security) &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            method.security.includes(IS_PUBLIC_KEY_META)
          )
            method.security = [];
        }
      }

      app.use(
        getMiddleware({
          swaggerSpec: document,
          authentication: true,
          hostname: appName,
          uriPath: '/stats',
          onAuthenticate: (
            _request: any,
            username: string,
            password: string,
          ) => {
            return username === userName && password === passWord;
          },
        }),
      );

      SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, document, {
        explorer: true,
        swaggerOptions,
      });
    } catch (error) {
      logger.error('Failed to setup swagger', error);
    }
  }
}
