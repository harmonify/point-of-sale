import 'jest-expect-message';
import 'jest-extended';
import 'jest-json-schema';
import { Config } from '@/libs/config';
import { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    export interface User extends PrismaUser {}

    export interface Request {
      user?: PrismaUser;
      realIp: string;
      body: Record<string, any>;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'staging' | 'production';
      APP_PORT: number;
      APP_PREFIX: string;
      APP_NAME: string;
      API_URL: string;
      CLIENT_URL: string;
      ALLOWED_ORIGINS?: string;

      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_LOGGING: 'true' | 'false' | undefined;

      SWAGGER_USER: string;
      SWAGGER_PASSWORD: string;

      DEFAULT_USER_PASSWORD: string;

      JWT_ACCESS_EXPIRY: string;
      JWT_REFRESH_EXPIRY: string;
      JWT_SECRET: string;
      TOKEN_TYPE: string;

      THROTTLE_LIMIT: number;
      THROTTLE_TTL: number;
    }
  }
  export type IConfig = Config;
}
