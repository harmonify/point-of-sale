import 'tsconfig-paths/register';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

module.exports = async (globalConfig: any, projectConfig: any) => {
  // @ts-ignore
  const app = globalThis._app as INestApplication;
  if (!app) return;
  app.get(PrismaService).$disconnect();
  app.close();
};
