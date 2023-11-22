import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import {
  app,
  appConfigValidationSchema,
  jwt,
  jwtConfigValidationSchema,
  mongoose,
  mongooseConfigValidationSchema,
  throttle,
  throttleConfigValidationSchema,
  whatsapp,
  whatsappConfigValidationSchema,
} from './configs';

import { HelperService } from '@common/helpers';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      load: [app, jwt, mongoose, throttle, whatsapp],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema,
        ...jwtConfigValidationSchema,
        ...mongooseConfigValidationSchema,
        ...throttleConfigValidationSchema,
        ...whatsappConfigValidationSchema,
      }),
      validationOptions: {
        abortEarly: true,
        cache: !HelperService.isProd(),
        debug: !HelperService.isProd(),
        stack: !HelperService.isProd(),
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
