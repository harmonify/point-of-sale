import type { ConfigType } from '@nestjs/config';
import type { app, jwt, throttle } from './configs';

export interface Config {
  app: ConfigType<typeof app>;
  jwt: ConfigType<typeof jwt>;
  throttle: ConfigType<typeof throttle>;
}
