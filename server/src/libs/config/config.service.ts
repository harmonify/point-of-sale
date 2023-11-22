import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NestConfigService extends ConfigService<IConfig, true> {
  get env(): string {
    return this.getOrThrow('app.env', { infer: true });
  }

  isDev(): boolean {
    return this.env.startsWith('dev');
  }

  isProd(): boolean {
    return this.env.startsWith('prod');
  }
}
