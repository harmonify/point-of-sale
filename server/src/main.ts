import '@total-typescript/ts-reset';

import { AppModule } from '@/app.module';
import { AppUtil } from '@/common/utils';
import { NestConfigService } from '@/libs/config/config.service';
import {
  Logger as BaseLogger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import compression from 'compression';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import type { NestExpressApplication } from '@nestjs/platform-express';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
declare const module: NodeModule & {
  hot: {
    accept: () => void;
    dispose: (argument0: () => Promise<void>) => void;
  };
};

const logger = new BaseLogger('Bootstrap');

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      snapshot: true,
      bufferLogs: true,
    },
  );

  const pinoLogger = app.get(Logger);
  app.useLogger(pinoLogger);
  app.flushLogs();

  const configService = app.get(NestConfigService);

  // =========================================================
  // configure swagger
  // =========================================================

  if (!configService.isProd()) AppUtil.setupSwagger(app, configService);

  // ======================================================
  // security and middlewares
  // ======================================================

  app.enable('trust proxy');
  app.set('etag', 'strong');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    maxAge: 3600,
    origin: configService.get('app.allowedOrigins', { infer: true }),
  });

  // =====================================================
  // configure global pipes, filters, interceptors
  // =====================================================
  const globalPrefix = configService.get('app.prefix', { infer: true });
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      // https://docs.nestjs.com/techniques/validation#stripping-properties
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      enableDebugMessages: configService.isDev(),
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const port = configService.get('app.port', 3000, { infer: true });

  // =========================================================
  // configure shutdown hooks
  // =========================================================

  app.enableShutdownHooks();

  AppUtil.killAppWithGrace(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (module && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);

  logger.log(
    `🚀 Application is running on:http://localhost:${port}/${globalPrefix}`,
  );
  logger.log(
    `🚦 Accepting request only from: ${configService
      .get('app.allowedOrigins', { infer: true })
      .toString()}`,
  );

  !configService.isProd() &&
    logger.log(`📑 Swagger is running on: http://localhost:${port}/doc`);
  logger.log(`Server is up. +${Math.trunc(performance.now())}ms`);

  return app;
}

if (require.main === module) {
  bootstrap().catch((error) => {
    logger.error(error);
  });
}
