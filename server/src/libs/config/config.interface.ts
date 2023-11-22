import type { ConfigType } from '@nestjs/config';
import type { app, jwt, mongoose, throttle, whatsapp } from './configs';

export interface Config {
  app: ConfigType<typeof app>;
  jwt: ConfigType<typeof jwt>;
  mongoose: ConfigType<typeof mongoose>;
  throttle: ConfigType<typeof throttle>;
  whatsapp: ConfigType<typeof whatsapp>;
}
