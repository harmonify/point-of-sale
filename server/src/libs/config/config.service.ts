import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NestConfigService extends ConfigService<IConfig, true> {
  get env(): NodeJS.ProcessEnv['NODE_ENV'] {
    return this.getOrThrow('app.env', { infer: true });
  }

  isTest(): boolean {
    return this.env === 'test';
  }

  isDev(): boolean {
    return this.env === 'development';
  }

  isStaging(): boolean {
    return this.env === 'staging';
  }

  isProd(): boolean {
    return this.env.startsWith('prod');
  }
}
