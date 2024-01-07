import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import path from 'path';

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

  static isProd(): boolean {
    const env = process.env.NODE_ENV;
    return env && env.startsWith('prod');
  }

  static getEnvFilePath(): string {
    const relativeEnvFilePath =
      process.env.ENV_FILE || `.env.${process.env.NODE_ENV}`;
    const candidateFilePath = path.join(process.cwd(), relativeEnvFilePath);
    if (existsSync(candidateFilePath)) {
      return candidateFilePath;
    } else {
      return path.join(process.cwd(), '.env');
    }
  }
}
