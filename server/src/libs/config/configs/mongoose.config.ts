import { registerAs } from '@nestjs/config';
import Joi from 'joi';

// validation schema

export const mongooseConfigValidationSchema = {
  MONGOOSE_URI: Joi.string().required(),
  MONGOOSE_DATABASE: Joi.string().required(),
  MONGOOSE_USERNAME: Joi.string().required(),
  MONGOOSE_PASSWORD: Joi.string().required(),
};

// config
export const mongoose = registerAs('mongoose', () => ({
  uri: process.env.MONGOOSE_URI,
  database: process.env.MONGOOSE_DATABASE,
  username: process.env.MONGOOSE_USERNAME,
  password: process.env.MONGOOSE_PASSWORD,
}));
