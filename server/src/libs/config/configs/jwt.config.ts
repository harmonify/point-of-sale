import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const jwtConfigValidationSchema = {
  JWT_SECRET: Joi.string().required().min(8),
  JWT_REFRESH_EXPIRY: Joi.number().required().min(1),
  JWT_ACCESS_EXPIRY: Joi.number().required().min(1),
  TOKEN_TYPE: Joi.string().required(),
};

export const jwt = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessExpiry: +process.env.JWT_ACCESS_EXPIRY,
  refreshExpiry: +process.env.JWT_REFRESH_EXPIRY,
  tokenType: process.env.JWT_SECRET,
}));
