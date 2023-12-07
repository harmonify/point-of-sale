import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import {
  app,
  appConfigValidationSchema,
  jwt,
  jwtConfigValidationSchema,
  throttle,
  throttleConfigValidationSchema,
} from './configs';
import { NestConfigService } from './config.service';

const env = process.env.NODE_ENV;
const isProd = env?.startsWith('prod');

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [NestConfigService.getEnvFilePath()],
      load: [app, jwt, throttle],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema,
        ...jwtConfigValidationSchema,
        ...throttleConfigValidationSchema,
      }),
      validationOptions: {
        abortEarly: true,
        cache: !isProd,
        debug: !isProd,
        stack: !isProd,
      },
    }),
  ],
  providers: [NestConfigService],
  exports: [NestConfigService],
})
export class NestConfigModule {}
