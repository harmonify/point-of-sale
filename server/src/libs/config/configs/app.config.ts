import { registerAs } from '@nestjs/config';
import Joi from 'joi';
import { APP_ENVIRONMENTS } from '@/common/constants';

// validation schema

export const appConfigValidationSchema = {
  NODE_ENV: Joi.string()
    .valid(...APP_ENVIRONMENTS)
    .required(),
  APP_PORT: Joi.number().port().required(),
  API_URL: Joi.string().uri().required(),
  APP_PREFIX: Joi.optional(),
  ALLOWED_ORIGINS: Joi.optional(),
  APP_NAME: Joi.string().required(),
  SWAGGER_USER: Joi.string().required(),
  SWAGGER_PASSWORD: Joi.string().required(),
};

// config
export const app = registerAs('app', () => ({
  env: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  url: process.env.API_URL,
  prefix: process.env.APP_PREFIX,
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : '*',
  name: process.env.APP_NAME,
  swaggerUser: process.env.SWAGGER_USER,
  swaggerPass: process.env.SWAGGER_PASSWORD,
}));
