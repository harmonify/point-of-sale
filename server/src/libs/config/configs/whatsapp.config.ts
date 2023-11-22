import { registerAs } from '@nestjs/config';
import Joi from 'joi';

// validation schema
export const whatsappConfigValidationSchema = {
  WHATSAPP_DATA_PATH: Joi.string().required(),
  WHATSAPP_GROUP_CHAT_ENABLED: Joi.boolean().required(),
  WHATSAPP_WHITELISTED_ENABLED: Joi.boolean().required(),
  WHATSAPP_WHITELISTED_PHONE_NUMBERS: Joi.optional(),
};

// config
export const whatsapp = registerAs('whatsapp', () => ({
  dataPath: process.env.WHATSAPP_DATA_PATH,
  groupChatEnabled: process.env.WHATSAPP_GROUP_CHAT_ENABLED === 'true',
  whitelistedEnabled: process.env.WHATSAPP_WHITELISTED_ENABLED === 'true',
  whitelistedPhoneNumbers: process.env.WHATSAPP_WHITELISTED_PHONE_NUMBERS
    ? process.env.WHATSAPP_WHITELISTED_PHONE_NUMBERS.split(',')
    : [],
}));
